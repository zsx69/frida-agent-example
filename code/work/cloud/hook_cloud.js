// version 7.2.0
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
                var content = Memory.readCString(args[0]);
                console.log("content", content)
            },
            onLeave: function (retval) {
                // 只能在native层使用
                // console.log("retval", Java.vm.getEnv().getStringUtfChars(retval, null).readCString());
            }
        }
    )
}

/*
sub_44764  args[1] 为url
sub_43FFC  args[0] 已加盐
sub_440A2  获取返回值
 */

function hook_salt() {
    var libnative_addr = Module.findBaseAddress('libpoison.so');
    var hashAddress = libnative_addr.add(0x00043FFC + 1);
    console.log("hashAddress", hashAddress);


    Interceptor.attach(hashAddress, {
            onEnter: function (args) {
                var content = Memory.readCString(args[0]);
                console.log("content", content)
            },
            onLeave: function (retval) {
                // 只能在native层使用
            }
        }
    )
}

function hook_salt_result() {
    var libnative_addr = Module.findBaseAddress('libpoison.so');
    var hashAddress = libnative_addr.add(0x000440A2 + 1);
    console.log("hashAddress", hashAddress);

    var arg_address = null;

    Interceptor.attach(hashAddress, {
            onEnter: function (args) {
                arg_address = args[0];
                var content = Memory.readCString(arg_address);
                console.log("content", content)
            },
            onLeave: function (retval) {
                // c 语言可能不把结果直接返回而是重赋值给参数
                console.log("retval1", Memory.readCString(arg_address));
                console.log("retval2", Memory.readCString(retval));
            }
        }
    )
}


function main() {
    // hook_new()
    // hook_serialdata()
    // hook_native()
    // hook_salt()
    // hook_salt_result()
}


setImmediate(main)