//version 4.7.24

function hookAuthConfig() {
    Java.perform(function () {
        var ClassName = "com.sf.security.AuthConfig";
        var AuthConfig = Java.use(ClassName);
        AuthConfig.getSFSecurity.implementation = function (v1, v2) {
            v2 = "r0ysue"
            var result = this.getSFSecurity(v1, v2)
            console.log("java result:", result)
            return result
        }
    });
}


function hook_sub_A944() {
    var libsfdata_addr = Module.findBaseAddress('libsfdata.so');
    console.log("so base address ->", libsfdata_addr)
    var addr_0xA944 = libsfdata_addr.add(0xb2c4 + 1);
    console.log("addr_0xA944 ->", addr_0xA944)

    Interceptor.attach(addr_0xA944, {
        onEnter: function (args) {
            console.log("calling addr_0xA944")
            this.args1 = args[1]
            console.log("native args1:", Memory.readCString(this.args1))
        },
        onLeave: function (retval) {}
    })
}

function main() {
    hookAuthConfig()
    hook_sub_A944()
}

setImmediate(hookAuthConfig)


/*
如果hook native某hash函数 打印的信息太多时，可以主动调用来看一下，然后来观察hook结果，效果就会明显很多。同时也可以配合JNITrace
首先执行hook_sub_A944()
native args1: 38695F7D-9D05-41A9-99B5-D14BF22557421626685885089r0ysuetd9#Kn_p7�*�
java result: nonce=38695F7D-9D05-41A9-99B5-D14BF2255742&timestamp=1626685885089&devicetoken=r0ysue&sign=307AAA6F82DB904C3E1F7892197BBF53
 */
