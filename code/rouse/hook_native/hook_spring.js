function hook_spring() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0x102BC = libnative_addr.add(0xB90);
    console.log("addr_0x102BC ->", addr_0x102BC)

    Interceptor.attach(addr_0x102BC, {
        onEnter: function (args) {
            console.log("calling addr_0x102BC")
            console.log("args1:", Memory.readCString(args[0]))
            console.log("args2:", args[1])
            console.log("args3:", hexdump(args[2]))

        },
        onLeave: function (retval) {
            // console.log("retval:", retval)
        }
    })
}

setImmediate(hook_spring)