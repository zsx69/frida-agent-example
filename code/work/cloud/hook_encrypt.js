function hook_native() {
    var JNI_address = Module.findExportByName('libpoison.so', 'AES_encrypt');
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

setImmediate(hook_native)