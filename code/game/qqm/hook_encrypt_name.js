function hook_encrypt_name() {
    Java.perform(function x() {
            console.log("java perform");
            var Base64 = Java.use("com.tencent.qqmusiccommon.util.Base64");
            Base64.encode.implementation = function (v1) {
                console.log("v1:" + bytesToString(v1));
                var result = this.encode(v1);
                console.log("result:" + bytesToString(result));
                return result
            };
        }
    );
}

function bytesToString(arr) {
    var str = '';
    arr = new Uint8Array(arr);
    for (var i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;

}


setImmediate(hook_encrypt_name);
