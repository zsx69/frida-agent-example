function hook_native() {
    var JNI_address = Module.findExportByName('libkeyinfo.so', 'getByteHash');
    // 偏移量 = 符号地址 - so地址 = start（ida 最左边function_name 右拉 ）
    console.log("JNI_address", JNI_address)

     var libnative_addr = Module.findBaseAddress('libkeyinfo.so');
     var hashAddress = libnative_addr.add(0x69954 + 1);
     console.log("hashAddress", hashAddress);

    Interceptor.attach(JNI_address, {
        onEnter: function (args) {
            var content = Memory.readCString(args[2]);
            console.log("content", content)
        },
        onLeave: function (retval) {
            // 只能在native层使用
            console.log("retval", Memory.readCString(retval));
        }
    }
    )
}

setImmediate(hook_native)