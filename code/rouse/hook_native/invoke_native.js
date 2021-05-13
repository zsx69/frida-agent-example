function f() {
    var method1_addr = Module.findExportByName("libheyhu.so", "Java_com_heyhu_openso_MainActivity_method01")
    console.log("method1_addr:", method1_addr)
    var method1 = new NativeFunction(method1_addr,'pointer', ['pointer', 'pointer', 'pointer']);
    // args[1]:jnienv，args[2]:jclass/jobject, args[3]:jstring
    Java.perform(function () {
        var jstring = Java.vm.getEnv().newStringUtf("heyhu")
        var result = method1(Java.vm.getEnv(), jstring, jstring)
        console.log("result:", Java.vm.getEnv().getStringUtfChars(result, null).readCString())
    })

}

setImmediate(f);