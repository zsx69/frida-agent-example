function hook_new() {
    Java.perform(function () {
        console.log("hook starting....")
        var nameClass = Java.use("com.netease.cloudmusic.utils.NeteaseMusicUtils")
        nameClass.serialdatanew.implementation = function (v1, v2, v3) {
            console.log("v1:->", v1)
            console.log("v2:->", v2)
            console.log("v3:->", v3)
            var result = this.serialdatanew(v1, v2, v3);
            console.log("result:->", result)
            return result
        }
    })
}


function hook_serialdata() {
    Java.perform(function () {
        console.log("hook starting....")
        var nameClass = Java.use("com.netease.cloudmusic.utils.NeteaseMusicUtils")
        nameClass.serialdata.implementation = function (v1, v2) {
            console.log("v1:->", v1)
            console.log("v2:->", v2)
            var result = this.serialdata(v1, v2);
            console.log("result:->", result)
            return result
        }
    })
}


function hook_native() {
    var JNI_address = Module.findExportByName('libpoison.so', 'AES_set_encrypt_key');
    // 偏移量 = 符号地址 - so地址 = start（ida 最左边function_name 右拉 ）
    console.log("JNI_address", JNI_address)

     // var libnative_addr = Module.findBaseAddress('libpoison.so');
     // var hashAddress = libnative_addr.add(0x00044E60);
     // console.log("hashAddress", hashAddress);

    Interceptor.attach(JNI_address, {
        onEnter: function (args) {
            var content =  Memory.readCString(args[0]);
            console.log("content", content)
        },
        onLeave: function (retval) {
            // 只能在native层使用
            // console.log("retval", Java.vm.getEnv().getStringUtfChars(retval, null).readCString());
        }
    }
    )
}

function main() {
    hook_new()
    hook_serialdata()
    hook_native()
}


setImmediate(main)