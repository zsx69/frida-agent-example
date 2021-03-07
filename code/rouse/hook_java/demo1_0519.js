function main() {
    Java.perform(function x() {
            console.log("java perform");
            // login
            var LoginActivity = Java.use("com.example.androiddemo.Activity.LoginActivity");
            LoginActivity.a.overload('java.lang.String', 'java.lang.String').implementation = function (v1, v2) {
                console.log("v1:" + v1);
                console.log("v2:" + v2);
                var ret_value = this.a(v1, v2);
                console.log("ret_value:" + ret_value);
                return ret_value
            };
        }
    );
}

function challenge1() {
    Java.perform(function () {
        // 1
        var FridaActivity1 = Java.use("com.example.androiddemo.Activity.FridaActivity1");
        FridaActivity1.a.implementation = function (v1) {
            console.log("v1:" + v1);
            var pass = Java.use('java.lang.String').$new('R4jSLLLLLLLLLLOrLE7/5B+Z6fsl65yj6BgC6YWz66gO6g2t65Pk6a+P65NK44NNROl0wNOLLLL=');
            return pass;
        }
    })
}

function challenge2() {
    Java.perform(function () {
        // 1
        var FridaActivity2 = Java.use("com.example.androiddemo.Activity.FridaActivity2");
        FridaActivity2.setStatic_bool_var();
        Java.choose("com.example.androiddemo.Activity.FridaActivity2", {
            onMatch: function (instance) {
                instance.setBool_var();
            },
            onComplete: function () {
                console.log("finish")
            }
        })
    })
}

function challenge3() {
    Java.perform(function () {
        // 1
        var FridaActivity3 = Java.use("com.example.androiddemo.Activity.FridaActivity3");
        FridaActivity3.static_bool_var.value = true;
        Java.choose("com.example.androiddemo.Activity.FridaActivity3", {
            onMatch: function (instance) {
                instance.bool_var.value = true;
                instance._same_name_bool_var.value = true;
            },
            onComplete: function () {
                console.log("finish")
            }
        })
    })
}

function challenge4() {
    Java.perform(function () {
        // 1
        var classname = "com.example.androiddemo.Activity.FridaActivity4$InnerClasses";
        var InnerClasses = Java.use(classname);
        var all_methods = InnerClasses.class.getDeclaredMethods();
        for (var i = 0; i < all_methods.length; i++) {
            var method = all_methods[i];
            var methodStr = method.toString();
            var substring = methodStr.substr(methodStr.indexOf(classname) + classname.length + 1);
            var func = substring.substr(0, substring.indexOf("("));
            InnerClasses[func].implementation = function () {
                return true;
            }
        }

    })
}

function challenge5() {
    Java.perform(function () {
        // Java.choose("com.example.androiddemo.Activity.FridaActivity5", {
        //     onMatch: function (instace) {
        //         // 打印类名
        //         console.log(instace.getDynamicDexCheck().$className)
        //     }, onComplete: function () {
        //     }
        // });
        Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {
                    if (loader.findClass('com.example.androiddemo.Dynamic.DynamicCheck')) {
                        console.log("Successfully found loader");
                        console.log(loader);
                        // 切换新的loader 安卓7.0
                        // Java.classFactory.loader = loader;
                    }
                } catch (e) {
                    console.log("find error" + e)
                }
            }, onComplete: function () {
            }
        });

        var DynamicCheck = Java.use("com.example.androiddemo.Dynamic.DynamicCheck");
        console.log(DynamicCheck);
        DynamicCheck.check.implementation = function () {
            return true
        };

    })
}

function challenge6() {
    Java.perform(function () {
        Java.enumerateLoadedClasses({
            onMatch: function (name, handle) {
                if (name.indexOf('com.example.androiddemo.Activity.Frida6') >= 0) {
                    console.log("name:" + name + " handle:" + handle);
                    Java.use(name).check.implementation = function () {
                        return true
                    }
                }

            }, onComplete: function () {
            }
        })

    })
}


setImmediate(challenge6);