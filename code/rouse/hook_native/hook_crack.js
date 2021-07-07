// 32位寄存器位R 64位寄存器为X
// com.yaotong.crackme

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


function hook_crack() {
    var libcrackme_addr = Module.findBaseAddress('libcrackme.so');
    var left = libcrackme_addr.add(0x12A8);
    console.log("left address ->", left)
    console.log("left ->", hexdump(left))

    var maxPatchSize = 64;
    Memory.patchCode(left, maxPatchSize, function (code) {
        console.log("code", code)
        var cw = new ArmWriter(code, {pc: left});
        cw.putBytes([
            0x7a, 0x68, 0x61, 0x6f,
            0x73, 0x68, 0x6f, 0x75,
            0x78, 0x69, 0x6e, 0x6e
        ]);
        cw.flush()
    });

    console.log("addr_0x12A8_after ->", hexdump(left))
}


setImmediate(hook_crack)