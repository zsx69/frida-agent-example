function hook_decrypt() {
    Java.perform(function x() {
        console.log("java perform");
        var Util = Java.use("com.kugou.common.useraccount.utils.h");
        Util.a.overload('java.lang.String', 'java.lang.String').implementation = function (v1, v2) {
            console.log("v1: " + v1);
            console.log("v2: " + v2);
            var decrypt_data = this.a(v1, v2);
            console.log("encry:" + decrypt_data);
            return decrypt_data
        };
      }
    );
}

setImmediate(hook_decrypt)
