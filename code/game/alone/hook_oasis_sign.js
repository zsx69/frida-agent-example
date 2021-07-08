// version 3.5.8
function hook_8AB2() {
    var oasis_addr = Module.findBaseAddress('liboasiscore.so');
    console.log("so base address ->", oasis_addr)
    var addr_0x8AB2 = oasis_addr.add(0x8AB2 + 1);
    console.log("addr_0x8AB2 ->", addr_0x8AB2)

    var arg_address = null;

    Interceptor.attach(addr_0x8AB2, {
        onEnter: function (args) {
            arg_address = args[0];
            console.log(args[2]);
            console.log("args[1]", hexdump(args[1], {length: args[2].toInt32()}))
        },
        onLeave: function (retval) {
        }
    })
}

function hookSign() {
    Java.perform(function () {
        var NativeApi = Java.use('com.weibo.xvideo.NativeApi');
        // 使用系统工具类将byte数组转成hex、utf8.
        var ByteString = Java.use("com.android.okhttp.okio.ByteString");
        NativeApi.s.implementation = function (str1, str2) {
            var result = this.s(str1, str2);
            console.log("str:" + ByteString.of(str1).utf8())
            console.log("hex:" + ByteString.of(str1).hex())
            console.log(result);
            return result;
        }
    });
}

// str:aid=01A-khBWIm48A079Pz_DMW6PyZR8uyTumcCNm4e8awxyC2ANU.&cfrom=28B5295010&cuid=5999578300&noncestr=46274W9279Hr1X49A5X058z7ZVz024&platform=ANDROID&timestamp=1621437643609&ua=Xiaomi-MIX2S__oasis__3.5.8__Android__Android10&version=3.5.8&vid=1019013594003&wm=20004_90024
// result:3882b522d0c62171d51094914032d5ea

setImmediate(hookSign)
