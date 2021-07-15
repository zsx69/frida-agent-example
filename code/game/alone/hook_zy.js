function callSign(){
    Java.perform(function () {
        var NetCrypto = Java.use("com.izuiyou.network.NetCrypto");
        var JavaString = Java.use("java.lang.String");

        var plainText = "r0ysue";
        var plainTextBytes = JavaString.$new(plainText).getBytes("UTF-8");

        var result = NetCrypto.a("12345", plainTextBytes);
        console.log(result);
    });
}

function call_65540(){
    var base_addr = Module.findBaseAddress("libnet_crypto.so");
    // 函数在内存中的地址
    var real_addr = base_addr.add(0x65541)
    var md5_function = new NativeFunction(real_addr, "int", ["pointer", "int", "pointer"])
    // 参数1 明文字符串的指针
    var input = "r0ysue";
    var arg1 = Memory.allocUtf8String(input);
    // 参数2 明文长度
    var arg2 = input.length;
    // 参数3，存放结果的buffer
    var arg3 = Memory.alloc(16);
    md5_function(arg1, arg2, arg3);
    console.log(hexdump(arg3,{length:0x10}));
}


function main(){
    // callSign()
    call_65540()
}

setImmediate(main)