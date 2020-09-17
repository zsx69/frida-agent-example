function main() {
    Java.perform(function x() {
        console.log("java perform");

        var MainActivity = Java.use("com.noguess.a0820demo1.MainActivity");
        MainActivity.fun.overload('int', 'int').implementation = function (x, y) {
            console.log("x:" + x);
            console.log("y:" + y);
            var ret_value = this.fun(2, 5);
            return ret_value
        };

        MainActivity.fun.overload('java.lang.String').implementation = function (m) {
            console.log("m:" + m);
            var newString = Java.use("java.lang.String").$new('aaa');
            var ret_value = this.fun(newString);
            console.log("newString:" + ret_value);
            return ret_value
        };

        Java.choose('com.noguess.a0820demo1.MainActivity',{
            onMatch:function(instance) {
                console.log("found instance:" + instance);
                console.log("instance.secret():" + instance.secret());
            },
            onComplete:function(){
                console.log('finish');
            }
        });

    })
}

setImmediate(main);