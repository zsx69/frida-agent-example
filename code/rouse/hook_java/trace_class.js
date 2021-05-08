function inspectObject(obj) {
    Java.perform(function () {


    })
}

function uniqBy(array, key) {
    var seen = {};
    return array.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}

// trace a specific Java Method
function traceMethod(targetClassMethod) {
    var delim = targetClassMethod.lastIndexOf(".");
    if (delim === -1) return;

    var targetClass = targetClassMethod.slice(0, delim)
    var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

    var hook = Java.use(targetClass);
    var overloadCount = hook[targetMethod].overloads.length;

    console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");

    for (var i = 0; i < overloadCount; i++) {

        hook[targetMethod].overloads[i].implementation = function () {
            var output = "";
            for(var line=0;line<100;line++){
                output = output.concat("=")
            }
            output = output.concat("\r\n")
            const Class = Java.use("java.lang.Class");
            // const obj_class = Java.cast(this.getClass(), Class);
            const obj_class = this.class;
            const fields = obj_class.getDeclaredFields();

            // output = output.concat("Inspecting " + this.getClass().toString());
            output = output.concat("Inspecting " + this.class);
            output = output.concat("\r\n")
            output = output.concat("\tFields:");
            output = output.concat("\r\n")
            for (var i in fields) {
                // console.log("\t\t" + fields[i].toString());
                var className = obj_class.toString().trim().split(" ")[1];
                // console.log("className is => ",className);
                var fieldName = fields[i].toString().split(className.concat(".")).pop();
                var fieldValue = undefined;
                if(!(this[fieldName]===undefined)){
                    fieldValue = this[fieldName].value ;
                }
                output = output.concat(fieldName + " => ", fieldValue);
                output = output.concat("\r\n")
            }

            output = output.concat("\n*** entered " + targetClassMethod);
            output = output.concat("\r\n")

            // print args
            if (arguments.length) console.log();
            for (var j = 0; j < arguments.length; j++) {
                output = output.concat("arg[" + j + "]: " + arguments[j] + " => " + JSON.stringify(arguments[j]));
                output = output.concat("\r\n")
            }
            output = output.concat(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            output = output.concat("\r\n");

            // print retval
            var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
            output = output.concat("\nretval: " + retval + " => " + JSON.stringify(retval));
            output = output.concat("\r\n")
            output = output.concat("\n*** exiting " + targetClassMethod);
            output = output.concat("\r\n")
            console.log(output);
            return retval;
        }
    }

}

function traceClass(targetClass) {
    //Java.use是新建一个对象哈，大家还记得么？
    var hook = Java.use(targetClass);
    //利用反射的方式，拿到当前类的所有方法
    var methods = hook.class.getDeclaredMethods();
    // var methods = hook.class.getMethods();
    console.log("methods => ", methods)
    //建完对象之后记得将对象释放掉哈
    hook.$dispose;
    //将方法名保存到数组中
    var parsedMethods = [];
    methods.forEach(function (method) {
        parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
    });
    //去掉一些重复的值
    var targets = uniqBy(parsedMethods, JSON.stringify);
    // targets = [];
    if(hook.class.getDeclaredConstructors().length > 0 ){
        targets = targets.concat("$init")
    }
    console.log("targets=>", targets)
    //对数组中所有的方法进行hook，traceMethod也就是第一小节的内容
    targets.forEach(function (targetMethod) {
        traceMethod(targetClass + "." + targetMethod);
    });
}


function hook() {
    Java.perform(function () {
        console.log("start")
        Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {
                    if (loader.findClass("com.ceco.nougat.gravitybox.ModStatusbarColor$1")) {
                        // if(loader.findClass("de.robv.android.xposed.XC_MethodHook")){
                        // if(loader.findClass("de.robv.android.xposed.XposedBridge")){
                        //if(loader.findClass("com.android.internal.statusbar.StatusBarIcon")){

                        console.log("Successfully found loader")
                        console.log(loader);
                        Java.classFactory.loader = loader;
                    }
                }
                catch (error) {
                    console.log("find error:" + error)
                }
            },
            onComplete: function () {
                console.log("end1")
            }
        })

        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                if (className.toString().indexOf("gravitybox") > 0 &&
                    className.toString().indexOf("$") > 0
                ) {
                    console.log("found => ", className)
                    // var interFaces = Java.use(className).class.getInterfaces();
                    // if(interFaces.length>0){
                    //     console.log("interface is => ");
                    //     for(var i in interFaces){
                    //         console.log("\t",interFaces[i].toString())
                    //     }
                    // }
                    if (Java.use(className).class.getSuperclass()) {
                        var superClass = Java.use(className).class.getSuperclass().getName();
                        // console.log("superClass is => ",superClass);
                        if (superClass.indexOf("XC_MethodHook") > 0) {
                            console.log("found class is => ", className.toString())
                            traceClass(className);
                        }
                    }
                }
            }, onComplete: function () {
                console.log("search completed!")

            }
        })
        console.log("end2")
    })
}

function main() {
    Java.perform(function () {
        traceClass("com.mobile.auth.gatewayauth.utils.security.CheckRoot")
    })
}
// setImmediate(main)
setTimeout(main,2000)