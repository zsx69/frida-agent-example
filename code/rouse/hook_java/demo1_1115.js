/*  trace XposedBridge.log  */

function main(){
    Java.perform(function(){
        Java.enumerateClassLoaders({
            onMatch:function(loader){
                try{
                    if(loader.findClass("de.robv.android.xposed.XposedBridge")){
                        console.log("Successfully found loader")
                        console.log(loader);
                        // 切换新的loder
                        Java.classFactory.loader = loader ;
                    }
                }catch(error){
                    console.log("find error:"+error)
                }
            },
            onComplete:function(){}
        })

        var XposedBridge = Java.use("de.robv.android.xposed.XposedBridge");
        console.log(XposedBridge);
        XposedBridge.log.overload('java.lang.String').implementation = function(v1){
               console.log('v1:',  v1)
        };
    })
}

setImmediate(main)
