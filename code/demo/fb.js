var is_hook_libart = false;
var so_name = "libcoldstart.so"
var verify_name = "_ZN8proxygen15SSLVerification17verifyWithMetricsEbP17x509_store_ctx_stRKSsPNS0_31SSLFailureVerificationCallbacksEPNS0_31SSLSuccessVerificationCallbacksERKNS_15TimeUtilGenericINSt6chrono3_V212steady_clockEEERNS_10TraceEventE"
var ssl_name = "SSL_set_verify"

function hook_dlopen() {
    Interceptor.attach(Module.findExportByName(null, "dlopen"), {
        onEnter: function (args) {
            var pathptr = args[0];
            if (pathptr !== undefined && pathptr != null) {
                var path = ptr(pathptr).readCString();
                if (path.indexOf(so_name) >= 0) {
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
                if (path.indexOf(so_name) >= 0) {
                    this.can_hook_libart = true;
                    console.log("[android_dlopen_ext:]", path);
                }
            }
        },
        onLeave: function (retval) {
            if (this.can_hook_libart && !is_hook_libart) {
                is_hook_libart = true;
                // 在加载完so时hook
                /*
                var is_first = true;
                var method01 = Module.findExportByName(so_name, "_ZN8proxygen15SSLVerification17verifyWithMetricsEbP17x509_store_ctx_stRKSsPNS0_31SSLFailureVerificationCallbacksEPNS0_31SSLSuccessVerificationCallbacksERKNS_15TimeUtilGenericINSt6chrono3_V212steady_clockEEERNS_10TraceEventE")
                var method02 = Module.findExportByName(so_name, "SSL_set_verify")
                console.log("method01 addr", method01)
                console.log("method02 addr", method02)
                Interceptor.attach(method01, {
                    onEnter: function (args) {
                        console.log('method01,args0:', args[0])
                        console.log('method01,args1:', args[1])
                        console.log('method01,args2:', args[2])
                        console.log('method01,args3:', args[3])
                    },
                    onLeave: function (retval) {
                        console.log('method01,retval:', retval)
                        return retval.replace(ptr(0x1));
                    }
                })

                Interceptor.attach(method02, {
                    onEnter: function (args) {
                        console.log('method02,args0:', args[0])
                        console.log('method02,args1:', args[1])
                        console.log('method02,args2:', args[2])
                    },
                    onLeave: function (retval) {
                        console.log('method02, retval:', retval)

                    }
                })
                var verify_method = new NativeFunction(Module.findExportByName(so_name, verify_name), 'int', ['int', 'pointer', 'pointer', 'int', 'pointer', 'pointer', 'pointer']);
                console.log("verify_method:", verify_method)
                Interceptor.replace(verify_method, new NativeCallback(function (a1, a2, a3, a4, a5, a6, a7) {
                    console.log("is_first", is_first)
                    retval = verify_method(0x1, a2, a3, a4, a5, a6, a7)
                    console.log("retval", retval)
                    if (is_first == true) {
                        console.log("invoke inner function")
                        // hook_sub_212338()
                        hook_sub_28C478()
                        // hook_sub_212470()
                        is_first = false
                    }
                    return 1
                }, 'int', ['int', 'pointer', 'pointer', 'int', 'pointer', 'pointer', 'pointer']));
                 */
                var sub_20ADDC = Module.findBaseAddress(so_name).add(0x206770)
                console.log("sub_20ADDC", sub_20ADDC)
                var func_20ADDC = new NativeFunction(sub_20ADDC, 'int', ['pointer', 'pointer', 'pointer', 'pointer']);
                Interceptor.replace(func_20ADDC, new NativeCallback(function (a, b, c, d) {
                    return 0x1
                }, 'int', ['pointer', 'pointer', 'int', 'int']));

                var sub_218D88 = Module.findBaseAddress(so_name).add(0x218D88)
                console.log("sub_218D88", sub_218D88)
                var func_218D88 = new NativeFunction(sub_218D88, 'int', ['pointer', 'pointer']);
                Interceptor.replace(func_218D88, new NativeCallback(function (a, b) {
                    return 0x1
                }, 'int', ['pointer', 'pointer']));
            }
        }
    });
}


setImmediate(hook_dlopen)