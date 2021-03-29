function hook_java() {
    Java.perform(function x() {
        // Java.use('com.example.demoso1.MainActivity').myfirstjniJNI.implementation = function (x) {
        //     var result = this.myfirstjniJNI('from hook java function');
        //     console.log('result', x, result);
        //     return result;
        // };
        Java.choose('com.example.demoso1.MainActivity', {
            onMatch: function (instance) {
                instance.init();
            },
            onComplete() {
            }
        })
    })
}

function hook_native() {
    // module: Process.enumerateModules() 枚举立即加载的模块，并返回一个Module对象数组。
    // JSON.stringify 打印object对象
    var modules = JSON.stringify(Process.enumerateModules());
    // 打印so库基地址
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("libnative", libnative_addr);
    // 找到符号地址
    if (libnative_addr) {
        var JNI_address = Module.findExportByName('libnative-lib.so', 'Java_com_example_demoso1_MainActivity_myfirstjniJNI');
        // 偏移量 = 符号地址 - so地址 = start（ida 最左边function_name 右拉 ）
        console.log("JNI_address", JNI_address)
    }

    // 符号 hook  Interceptor:拦截器
    Interceptor.attach(JNI_address, {
        onEnter: function (args) {
            // GetStringUTFChars: java.lang.String对应的JNI类型是jstring，但本地代码只能通过GetStringUTFChars这样的JNI函数来访问字符串的内容
            // newStringUtf、GetStringUTFChars 需要和api对应 （星球）https://github.com/frida/frida-java-bridge/blob/master/lib/env.js
            // 如果api中有才能使用JNI API
            var content = Java.vm.getEnv().getStringUtfChars(args[2], null).readCString();
            console.log("content", content)
        },
        onLeave: function (retval) {
            // 只能在native中使用
            console.log("retval", Java.vm.getEnv().getStringUtfChars(retval, null).readCString());
            // 新建返回值
            var new_retval = Java.vm.getEnv().newStringUtf("new retval from hook");
            // ptr: 从包含以十进制或十六进制（如果以'0x'为前缀）内存地址的字符串创建一个新的NativePointers。
            // so 操作的都是指针
            return retval.replace(ptr(new_retval));
        }
    })
}

function hook_art() {
    // hook GetStringUTFChars、NewStringUTF等
    // 寻找libart.so在不在
    var modules = JSON.stringify(Process.enumerateModules());
    // 因为name mangling的原因我们无法找到它的符号，拿到模块枚举所有的符号，然后过滤。
    var Symbols = Process.findModuleByName("libart.so").enumerateSymbols();
    // console.log(JSON.stringify(Symbols));
    var GetString_ADD;
    for (var i = 0; i < Symbols.length; i++) {
        var symbol = Symbols[i].name;
        if ((symbol.indexOf('CheckJNI') == -1) && symbol.indexOf('JNI') >= 0) {
            if (symbol.indexOf('GetStringUTFChars') >= 0) {
                // 搜索的哪个库，就在哪个库找
                // 打印符号名 // _ZN3art3JNI17GetStringUTFCharsEP7_JNIEnvP8_jstringPh 和ida显示的一样
                console.log("Symbols[i].name:", Symbols[i].name);
                // 打印符号地址
                console.log("Symbols[i].address:", Symbols[i].address);
                GetString_ADD = Symbols[i].address;
            }
        }
    }
    console.log("GetString Address:", GetString_ADD);
    Interceptor.attach(GetString_ADD, {
        onEnter: function (args) {
            var content = Java.vm.getEnv().getStringUtfChars(args[1], null).readCString();
            console.log("content", content);
            // console.log("args[0]",hexdump(args[0].readPointer())); 打印的是编码// 比如电话通信就是hex
        },
        onLeave: function (retval) {
            console.log("retval", ptr(retval).readCString())
            // console.log("retval", Memory.readCString(retval))
        }
    })
}

function hook_libc() {
    // 函数名就是原有的，不会混淆
    var Symbols = Process.findModuleByName("libc.so").enumerateSymbols();
    var pthread = null;
    for (var i = 0; i < Symbols.length; i++) {
        var symbol = Symbols[i].name;
        if (symbol.indexOf('pthread_create') >= 0) {
            //console.log("Symbols[i].name:", Symbols[i].name);
            //console.log("Symbols[i].address:", Symbols[i].address);
            pthread = Symbols[i].address;
        }
    }
    // hook pthread 需要主动调用hook_java()，主动调用init(), 才能找到pthread
    console.log("pthread_address",pthread);
    Interceptor.attach(pthread, {
        onEnter: function(args) {
            console.log("pthread args", args[0], args[1], args[2], args[3])
        },
        onLeave: function(retval) {
            console.log("ret", retval)
        }
    });
}

function main() {
    hook_java();
    hook_native();
    hook_art();
    hook_libc()
}

setImmediate(main);