Java.perform(
    function () {
        var Base64 = Java.use("android.util.Base64");
        Base64.encodeToString.overload('[B', 'int').implementation = function (v1, v2) {
            console.log("v1:" + bytesToString(v1));
            console.log("v2:" + v2);
            var encry = this.encodeToString(v1, v2);
            console.log("encry:" + encry);
            return encry
        };

        var DeviceUtil = Java.use('com.bk.base.util.bk.DeviceUtil');
        DeviceUtil.SHA1ToString.implementation = function (s1) {
            console.log("s1:" + s1);
            var st = this.SHA1ToString(s1);
            console.log("st:" + st);
            return st

        };


        //将object对象、byte[]转成String的方法
        function bytesToString(arr) {
            var str = '';
            arr = new Uint8Array(arr);
            for (var i in arr) {
                str += String.fromCharCode(arr[i]);
            }
            return str;
        }
    }
);


