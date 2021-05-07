function hook_encrypt_name() {
    Java.perform(function x() {
            console.log("java perform");
            var ao = Java.use("com.tencent.qqmusiccommon.statistics.ao");
            ao.getBase64String.implementation = function (v1) {
                console.log("v1:" + v1);
                var result = this.getBase64String(v1);
                console.log("result:" + result);
                return result
            };
        }
    );
}

setImmediate(hook_encrypt_name);
