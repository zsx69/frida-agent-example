// 解决报错： *** that has not called looper.prepare() --> Java.scheduleOnMainThread 在主函数上运行此函数

function showToast(string) {
    Java.perform(function () {
        var Toast = Java.use('android.widget.Toast');
        var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
        var context = currentApplication.getApplicationContext();
        Java.scheduleOnMainThread(function () {
            Toast.makeText(context, string, Toast.LENGTH_LONG.value).show();
        })
    })
}

function invokeNormal() {
    Java.perform(function () {
        var javaString = Java.use("java.lang.String")
        var MoneyInnerClass = Java.use("com.xiaojianbang.app.Money$innerClass").$new(javaString.$new("barbque"), 666).outPrint();
        console.log("result =>", MoneyInnerClass)
        showToast(javaString.$new(MoneyInnerClass))
    })
}

function invokeInit() {
    Java.perform(function () {
        var javaString = Java.use("java.lang.String")
        var MoneyName = Java.use("com.xiaojianbang.app.Money").$new().name();
        showToast(javaString.$new(MoneyName))
    })
}

function invokeOverload() {
    Java.perform(function () {
        var javaString = Java.use("java.lang.String")
        var result = Java.use("com.xiaojianbang.app.Utils").test(666);
        showToast(javaString.$new(result))
    })
}

function invokeObjectParm() {
    Java.perform(function () {
        var javaString = Java.use("java.lang.String")
        var MoneyInstance = Java.use("com.xiaojianbang.app.Money").$new(javaString.$new("美元"), 200);
        var result = Java.use("com.xiaojianbang.app.Utils").test(MoneyInstance);
        showToast(javaString.$new(result))

        // Java 数组
        var StringArray = Java.array("java.lang.String", [javaString.$new("r0ysue  "), javaString.$new("you are the "), javaString.$new("best ")])
        var retvl = Java.use("com.xiaojianbang.app.Utils").$new().myPrint(StringArray)
        showToast(javaString.$new(retvl))
    })
}

function invokeNative() {
    Java.perform(function () {
        var javaString = Java.use("java.lang.String")
        var result = Java.use("com.xiaojianbang.app.NativeHelper").helloFromC();
        showToast(javaString.$new(result));

        result = Java.use("com.xiaojianbang.app.NativeHelper").add(100, 200, 300);
        // result是int得先转成String
        showToast(javaString.$new(String(result)));
    })
}

function hookMD5() {
    Java.perform(function () {
        var targetClassMethod = "java.security.MessageDigest.getInstance"
        // delim --> .
        var delim = targetClassMethod.lastIndexOf(".");
        if (delim === -1) return;
        // targetClass --> java.security.MessageDigest
        var targetClass = targetClassMethod.slice(0, delim)
        // targetMethod --> getInstance
        var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)
        var hook = Java.use(targetClass);
        // 所有重载函数的数量
        var overloadCount = hook[targetMethod].overloads.length;
        // hook 遍历所有重载函数
        for (var i = 0; i < overloadCount; i++) {
            hook[targetMethod].overloads[i].implementation = function () {
                console.warn("\n*** entered " + targetClassMethod);

                // print args
                if (arguments.length >= 0) {
                    for (var j = 0; j < arguments.length; j++) {
                        console.log("arg[" + j + "]: " + arguments[j]);
                    }
                }
                var retval = this[targetMethod].apply(this, arguments);
                console.log("\nretval: " + retval);
                console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
                return retval;
            }
        }
    })
}


function main() {
    // invokeNormal()
    // invokeInit()
    // invokeOverload()
    // invokeObjectParm()
    // invokeNative()
    hookMD5()
}

setImmediate(main)

// 无限调用
// setInterval(main, 10)
