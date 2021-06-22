function hook_response() {
    Java.perform(function x() {
        console.log("java perform");
        var Util = Java.use("com.facebook.tigon.TigonCallbacksIntegerBufferJavaHelper");
        Util.onResponse.implementation = function (v1, v2, v3) {
            console.log("call function");
            var response = this.onResponse(v1, v2, v3);
            console.log("v2:" + bytesToString(v2));
            return response
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

setImmediate(hook_response)
