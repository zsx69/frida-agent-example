// method01 静态方法
function hook_demoso_method01() {
    Java.perform(function x() {
            console.log("java perform");
            var MainActivity = Java.use("com.example.demoso1.MainActivity");
            MainActivity.method01.implementation = function (v1) {
                console.log("v1: " + v1);
                var result = this.method01(v1);
                console.log("result:" + result);
                return result
            };
        }
    );
}

// method02 动态方法
function hook_demoso_method02() {
    Java.perform(function x() {
            console.log("java perform");
            var MainActivity = Java.use("com.example.demoso1.MainActivity");
            MainActivity.method02.implementation = function (v1) {
                console.log("v1: " + v1);
                var result = this.method02(v1);
                console.log("result:" + result);
                return result
            };
        }
    );
}


function hook_demoso_method03() {
    Java.perform(function x() {
            console.log("java perform");
            var MainActivity = Java.use("com.example.demoso1.MainActivity");
            var result = MainActivity.method01("222222");
            console.log("result:" + result)
        }
    );
}


function hook_demoso_method04() {
    Java.perform(function x() {
            Java.choose("com.example.demoso1.MainActivity", {
                onMatch: function (instance) {
                    var result = instance.method02("db48f5c43a69e8b1ea42de9877a4c2d4");
                    console.log("result:" + result)
                },
                onComplete: function () {
                }
            })
        }
    );
}


function hook_demoso_method05() {
    var result;
    Java.perform(function x() {
        console.log("java perform");
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        result = MainActivity.method01("222222");
    });
    return result
}

// setImmediate(hook_demoso_method05)
console.log("result is ->", hook_demoso_method05())
