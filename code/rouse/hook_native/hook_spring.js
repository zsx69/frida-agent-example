/*
异或还原
明文 ^ 密钥 = 密文
密文 ^ 密钥 = 明文

明文16进制 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31

秘文进制 e0 6b 37 a1 75 d7 f6 d4 ef 19 c6 c3 57 a0 f9 b4 73 ee c8 d1 b3 30 1a 0a 09 52 06 8c 1f 7c

密钥 0x31 ^ 0xe0 以此类推

from base64 import b64decode
a = b64decode("5Gh2/y6Poq2/WIeLJfmh6yesnK7ndnJeWREFjRx8".encode()) -> 密文
print(a)

密文 ^ 密钥 = 明文
 */


// 指针 参数程序内改变，需要函数离开时在打印下这个指针
function hook_B90() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xB90 = libnative_addr.add(0xB90);
    console.log("addr_0xB90 ->", addr_0xB90)

    Interceptor.attach(addr_0xB90, {
        onEnter: function (args) {
            this.args0 = args[0]
            this.args1 = args[1]
            this.args2 = args[2]

            console.log("calling addr_0xB90")
            console.log("args1:", hexdump(args[0]))
            console.log("args2:", args[1])
            console.log("args3:", Memory.readCString(args[2]))

        },
        onLeave: function (retval) {
            console.log("now is retval")
            // 原文 30个1 16进制31 31 31 31 31 31 31-> 秘文 e0 6b 37 a1 75 d7 f6 d4 ef 19 c
            console.log("args1:", hexdump(this.args0))
            console.log("args2:", this.args1)
            console.log("args3:", Memory.readCString(this.args2))
        }
    })
}


function hook_D90() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xD90 = libnative_addr.add(0xD90);
    console.log("addr_0xD90 ->", addr_0xD90)

    Interceptor.attach(addr_0xD90, {
        onEnter: function (args) {
            this.args0 = args[0]
            this.args1 = args[1]

            console.log("calling addr_0xD90")
            console.log("args0:", Memory.readByteArray(args[0], 30))
            console.log("args1:", args[1].toInt32())

        },
        onLeave: function (retval) {
            console.log("now is retval", Memory.readCString(retval))
        }
    })
}


function hook_x9() {
    // hook寄存器地址，得到对比的正确的base64
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xB30 = libnative_addr.add(0xB30);
    console.log("addr_0xB30 ->", addr_0xB30)
    Interceptor.attach(addr_0xB30, {
        onEnter: function (args) {
            console.log(Memory.readCString(this.context.x9));
            // console.log(Memory.readByteArray(this.context.x9, 50));
            // console.log(hexdump(this.context.x9));
        },
        onLeave: function (retval) {
        }
    })


}


function hook_D5C() {
    Java.perform(function () {
        var libnative = Module.findBaseAddress("libnative-lib.so");
        console.log("libnative: " + libnative);
        // 获取异或的字节，开了会报错，但是可以获取
        var ishook = true;
        var EOR = libnative.add(0xD5C);
        var eor = [];
        var eorlen = 0;
        send("EOR: " + EOR);
        Interceptor.attach(EOR, {
            onEnter: function (args) {
                if (ishook) {
                    if (eorlen < 30) {
                        eor.push(this.context.x12);
                        eorlen += 1;
                    } else {
                        ishook = false;
                        console.log(eor);
                    }
                }
            }
        })
    })
}


setImmediate(hook_D90)