// 32位寄存器位R 64位寄存器为X

function hook_r3() {
    // hook寄存器地址，得到对比的正确的base64
    var libcrackme_addr = Module.findBaseAddress('libcrackme.so');
    console.log("so base address ->", libcrackme_addr)
    var addr_0x12A8 = libcrackme_addr.add(0x12A8);
    console.log("addr_0x12A8 ->", addr_0x12A8)
    Interceptor.attach(addr_0x12A8, {
        onEnter: function (args) {
            console.log(JSON.stringify(this.context))
            console.log(Memory.readCString(this.context.r2));
        },
        onLeave: function (retval) {
        }
    })
}


setImmediate(hook_r3)