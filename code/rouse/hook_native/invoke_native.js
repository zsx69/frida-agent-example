function f() {
    var method1_addr = Module.findExportByName("libheyhu.so", "Java_com_heyhu_openso_MainActivity_method01")
    console.log("method1_addr:", method1_addr)
    var method1 = new NativeFunction(method1_addr, 'pointer', ['pointer', 'pointer', 'pointer']);
    // args[1]:JNIEnv，args[2]:jclass/jobject, args[3]:jstring
    Java.perform(function () {
        var jstring = Java.vm.getEnv().newStringUtf("heyhu")
        var result = method1(Java.vm.getEnv(), jstring, jstring)
        console.log("result:", Java.vm.getEnv().getStringUtfChars(result, null).readCString())
    })

}

/*
 so加载和类的绑定流程中关键函数 dlopen
 不管动静态注册都可以在dlopen结束后去找，可以直接找到地址去hook，适合app刚启动只调用一次的算法
 */
var is_hook_libart = false;

function hook_dlopen() {
    Interceptor.attach(Module.findExportByName(null, "dlopen"), {
        onEnter: function (args) {
            var pathptr = args[0];
            if (pathptr !== undefined && pathptr != null) {
                var path = ptr(pathptr).readCString();
                console.log("dlopen:", path);
                if (path.indexOf("libnative-lib") >= 0) {
                    this.can_hook_libart = true;
                    console.log("[dlopen:]", path);
                }
            }
        },
        onLeave: function (retval) {
            if (this.can_hook_libart && !is_hook_libart) {
                is_hook_libart = true;
            }
        }
    })

    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            var pathptr = args[0];
            if (pathptr !== undefined && pathptr != null) {
                var path = ptr(pathptr).readCString();
                console.log("android_dlopen_ext:", path);
                if (path.indexOf("libnative-lib") >= 0) {
                    this.can_hook_libart = true;

                    console.log("[android_dlopen_ext:]", path);
                }
            }
        },
        onLeave: function (retval) {
            if (this.can_hook_libart && !is_hook_libart) {
                is_hook_libart = true;
                // 在加载完so时hook
                var method01 = Module.findExportByName("libnative-lib.so", "_Z8method01P7_JNIEnvP7_jclassP8_jstring")
                var method02 = Module.findExportByName("libnative-lib.so", "_Z8method02P7_JNIEnvP8_jobjectP8_jstring")
                console.log("method01 addr", method01)
                console.log("method02 addr", method02)
                Interceptor.attach(method01, {
                    onEnter: function (args) {
                        console.log('args3:', Java.vm.getEnv().getStringUtfChars(args[2], null).readCString())
                    },
                    onLeave: function (retval) {
                        console.log('retval:', Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
                    }
                })

                Interceptor.attach(method02, {
                    onEnter: function (args) {
                        console.log('args3:', Java.vm.getEnv().getStringUtfChars(args[2], null).readCString())
                    },
                    onLeave: function (retval) {
                        console.log('retval:', Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
                    }
                })
            }
        }
    });
}





setImmediate(hook_dlopen);