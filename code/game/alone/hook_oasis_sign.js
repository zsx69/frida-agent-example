// version 3.5.8
function hook_AC0C() {
    var oasis_addr = Module.findBaseAddress('liboasiscore.so');
    console.log("so base address ->", oasis_addr)
    var addr_0xAC0C = oasis_addr.add(0x8AB2 + 1);
    console.log("addr_0xAC0C ->", addr_0xAC0C)

    var arg_address = null;

    Interceptor.attach(addr_0xAC0C, {
        onEnter: function (args) {
            arg_address = args[0];
            console.log(args[2]);
            console.log("args[1]", hexdump(args[1],{length:args[2].toInt32()}))
        },
        onLeave: function (retval) {
        }
    })
}

setImmediate(hook_AC0C)