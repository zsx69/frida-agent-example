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

function main() {
    invokeNormal()
}

setImmediate(main)

// 无限调用
// setInterval(main, 10)
