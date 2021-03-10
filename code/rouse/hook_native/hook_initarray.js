//应用以32位在64位终端环境下运行
//adb install --abi armeabi-v7a <path to apk>

function get_call_function() {
    var call_function_addr = null;
    var symbols = Process.getModuleByName("linker").enumerateSymbols();
    for (var m = 0; m < symbols.length; m++) {
        if (symbols[m].name == "__dl__ZL13call_functionPKcPFviPPcS2_ES0_") {
            call_function_addr = symbols[m].address;
            console.log("found call_function_addr => ", call_function_addr)
            hook_call_function(call_function_addr)
        }
    }
}

function hook_call_function(_call_function_addr){
    console.log("hook call function begin!hooking address :=>",_call_function_addr)
    Interceptor.attach(_call_function_addr,{
        onEnter:function(args){
            if(args[2].readCString().indexOf("base.odex")<0){
                console.log("============================")
                console.log("function_name =>",args[0].readCString())
                var soPath = args[2].readCString()
                console.log("so path : =>",soPath)
                var soName = soPath.split("/").pop();
                console.log("function offset =>","0x"+(args[1]-Module.findBaseAddress(soName)).toString(16))
                console.log("============================")
            }
        },onLeave:function(retval){
        }
    })
}

setImmediate(get_call_function)