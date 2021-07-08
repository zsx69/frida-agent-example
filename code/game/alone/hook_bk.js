function hook_encode() {
    Java.perform(function x() {

        Java.enumerateClassLoaders({
            onMatch:function(loader){
                try{
                    if(loader.findClass("android.util.Base64")){
                        console.log("Successfully found loader")
                        console.log(loader);
                        // 切换新的loder
                        Java.classFactory.loader = loader ;
                    }
                }catch(error){
                    console.log("find error:"+error)
                }
            },onComplete:function(){}
        })

        console.log("java perform");
        var Base64 = Java.use("android.util.Base64");
        Base64.encodeToString.overload('[B', 'int').implementation = function (v1, v2) {
            console.log("v1:" + bytesToString(v1));
            console.log("v2:" + v2);
            var encry = this.encodeToString(v1, v2);
            console.log("encry:" + encry);
            return encry
        };
      }
    );
}


function hook_sha1() {
    Java.perform(function x() {
        var DeviceUtil = Java.use('com.bk.base.util.bk.DeviceUtil');
        DeviceUtil.SHA1ToString.implementation = function (s1) {
            console.log("s1:" + s1);
            var st = this.SHA1ToString(s1);
            console.log("st:" + st);
            return st
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


setImmediate(hook_encode);
