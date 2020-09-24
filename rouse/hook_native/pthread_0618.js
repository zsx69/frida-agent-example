/*
主动调用过反调试
 */

function hook_java() {
    Java.perform(function x() {
        Java.choose('com.example.demoso1.MainActivity', {
            onMatch: function (instance) {
                instance.init();
            },
            onComplete() {
            }
        })
    })
}

function hook_pthread_replace() {
    // 函数名就是原有的，不会混淆
    var Symbols = Process.findModuleByName("libc.so").enumerateSymbols();
    var pthread_addr = null;
    for (var i = 0; i < Symbols.length; i++) {
        var symbol = Symbols[i].name;
        if (symbol.indexOf('pthread_create') >= 0) {
            pthread_addr = Symbols[i].address;
        }
    }
    console.log("pthread", pthread_addr)

    var pthread = new NativeFunction(pthread_addr, 'int', ['pointer', 'pointer', 'pointer', 'pointer']);
    Interceptor.replace(pthread, new NativeCallback(function (args0, args1, frida_loop, args3) {
        console.log("args",args0, args1, frida_loop, args3);
        // frida_loop地址为0x721390fdb0，强转String判断是否db0结尾
        var retval = null;
        if(String(frida_loop).endsWith('db0')){
            // 如果以db0结尾，不调用pthread_create函数
            console.log('anti-debug sequence')
        }else {
            // 如果不以db0结尾，主动调用
            var retval = pthread(args0, args1, frida_loop, args3);
        }
        // console.log('retval: ' + Java.vm.getEnv().getStringUtfChars(retval, null).readCString());

        return retval;
    }, 'int', ['pointer', 'pointer', 'pointer', 'pointer']));

}


function main() {
    hook_java()
    hook_pthread_replace()
}

setImmediate(main)