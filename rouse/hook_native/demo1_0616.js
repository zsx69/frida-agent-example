function hook_java() {
    Java.perform(function x() {
        Java.use('com.example.demoso1.MainActivity').myfirstjniJNI.implementation = function (x) {
            var result = this.myfirstjniJNI('from hook java function');
            console.log('result', x, result);
            return result;
        }
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

}

function main() {
    hook_java();
    hook_native();
    hook_art();
}

setImmediate(main);