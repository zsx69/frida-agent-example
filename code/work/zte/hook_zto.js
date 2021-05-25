// version 10.06.2004
function f() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.c.a.b.a.a")
        nameClass.read.overload('[B', 'int', 'int').implementation = function (v1, v2, v3) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            console.log("v1:->", String.$new(v1))
            var result = this.read(v1, v2, v3);
            return result
        }
    })
}

function e() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("zte.com.market.service.b.a.a")
        nameClass.a.overload('[B').implementation = function (v1) {
            console.log("v1->", v1)
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            var result = this.a(v1);
            console.log("result:->", result)
            return result
        }
    })
}


function g() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("zte.com.market.service.b.a.a")
        nameClass.a.overload('[B').implementation = function (v1) {
            console.log("v1->", v1)
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            var result = this.a(v1);
            console.log("result:->", result)
            return result
        }
    })
}


function h() {
    Java.perform(function () {
        console.log("hook starting....")
        var nameClass = Java.use("zte.com.market.service.b.a.d")
        nameClass.a.overload('[B', '[B').implementation = function (v1, v2) {
            console.log("v1->", bytesToString(v1))
            console.log("v2->", bytesToString(v2))
            var result = this.a(v1, v2);
            console.log("result:->", bytesToString(result))
            return result
        }
    })
}

function i() {
    Java.perform(function () {
        console.log("hook starting....")
        var nameClass = Java.use("zte.com.market.service.b.a.e")
        nameClass.c.overload('[B').implementation = function (v1) {
            console.log("v1->", bytesToString(v1))
            var result = this.c(v1);
            console.log("result:->", bytesToString(result))
            return result
        }
    })
}


function bytesToString(arr) {
    var str = '';
    arr = new Uint8Array(arr);
    for (var i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;

}


function main(){
    i()
}

setImmediate(main)