function main() {
    Java.perform(function x() {
        var imsdk = Java.use("imsdk.ld$a")
        imsdk.a.overload('java.lang.String', 'java.lang.String').implementation = function (v1, v2) {
            console.log("v1:" + v1);
            console.log("v2:" + v2);
            var ret_value = this.a(v1, v2);
            console.log("ret_value:" + ret_value);
            return ret_value
            };
        }
    );
}

/*
v1: dZ3hdzzAxLHfGK0fPdjjFUFrEjsMKcV317erPZYGCQs2sHY7ktgslf6vw9NFs+bQMK/c04a5P8mTsdTA0rIuWDQkyM9FPDCNjnl1QlZcJuo=
python: from urllib.parse import quote -> quote
ret_value:yVfs2CXD%2BIvTCyHpitsc7s8ZzMMBqOvU9oBM7YTRkyQR3a%2B%2BjNZlM1KH5fLv5EJjfkF8OT%2BZGdXfRe7IIvpV%2Fq8JQ4m4cgxJbyZPBL%2FHmS4%3D
*/
function hook_web_sig() {
    Java.perform(function x() {
        var as = Java.use("cn.futu.component.util.as");
        as.e.overload('java.lang.String').implementation = function (v1) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            console.log("v1:" + v1);
            var ret_value = this.e(v1);
            console.log("ret_value:" + ret_value);
            return ret_value
            };
        }
    );
}


function hook_web_sig_a() {
    Java.perform(function x() {
        Java.choose("cn.futu.nndc.db.cacheable.global.AccountCacheable",{
                onMatch:function(instance){
                    console.log("instance:",instance);
                    var s = instance.j()
                    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
                },onComplete:function(){
                    console.log("search_complete")
                }
            })
        }
    );
}


// mo19415b
setImmediate(hook_web_sig_a);