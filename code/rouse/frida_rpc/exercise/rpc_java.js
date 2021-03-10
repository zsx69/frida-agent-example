function hook_demoso_method01(args) {
    var result;
    Java.perform(function x() {
        console.log("java perform");
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        result = MainActivity.method01(args);
    });
    return result
}


function hook_demoso_method02() {
    var result;
    Java.perform(function x() {
        console.log("java perform");
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        result = MainActivity.method01("222222");
    });
    return result
}

rpc.exports = {
    method1: hook_demoso_method01,
    method2: hook_demoso_method02
}