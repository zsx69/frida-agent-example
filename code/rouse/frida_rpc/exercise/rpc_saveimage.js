// 获取类名
function getObjClassName(obj) {
    if (!jclazz) {
        var jclazz = Java.use("java.lang.Class");
    }
    if (!jobj) {
        var jobj = Java.use("java.lang.Object");
    }
    return jclazz.getName.call(jobj.getClass.call(obj));
}

// uuid
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function hookImageByteCiphered() {
    Java.perform(function () {
        Java.use("android.util.Base64").encodeToString.overload('[B', 'int').implementation = function (bytearray, int) {
            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            // 和抓包得到的数据是一样的
            console.log("IMAGE DATA:bytearray,int=>", ByteString.of(bytearray).hex(), int)
            var result = this.encodeToString(bytearray, int)
            return result;
        }
    })
}

function hookByteBuffer() {
    Java.perform(function () {
        Java.use("com.ilulutv.fulao2.other.i.b").a.overload('java.nio.ByteBuffer').implementation = function (bf) {
            var result = this.a(bf)
            // 结果和hookImageByteCiphered参数是一样的，此时是秘文数据
            //var gson = Java.use('com.google.gson.Gson')
            //console.log("result is => ",result);
            send(result)
            //console.log( gson.$new().toJson(result))
            return result;
        }
    })
}

function hookdecodeimgkey() {
    Java.perform(function () {
        // 使用js的比较困难 使用系统库的base64
        var base64 = Java.use("android.util.Base64")
        // 数据为加密的此方法为aes解密
        Java.use("com.ilulutv.fulao2.other.i.b").b.overload('[B', '[B', 'java.lang.String').implementation = function (key, iv, image) {
            var result = this.b(key, iv, image);
            // 获取aes的key和iv
            // 打印数组麻烦。使用base64加密 在python中解密使用
            console.log("key", base64.encodeToString(key, 0));
            console.log("iv", base64.encodeToString(iv, 0));
            return result;
        }
    })
    /*
    key svOEKGb5WD0ezmHE4FXCVQ==
    iv 4B7eYzHTevzHvgVZfWVNIg==
    */
}


function hookImage() {
    Java.perform(function () {

        var Runnable = Java.use("java.lang.Runnable");
        var saveImg = Java.registerClass({
            name: "com.roysue.runnable",
            implements: [Runnable],
            fields: {
                bm: "android.graphics.Bitmap",
            },
            methods: {
                $init: [{
                    returnType: "void",
                    argumentTypes: ["android.graphics.Bitmap"],
                    implementation: function (bitmap) {
                        this.bm.value = bitmap;
                    }
                }],
                run: function () {

                    var path = "/sdcard/Download/tmp/" + guid() + ".jpg"
                    console.log("path=> ", path)
                    var file = Java.use("java.io.File").$new(path)
                    var fos = Java.use("java.io.FileOutputStream").$new(file);

                    this.bm.value.compress(Java.use("android.graphics.Bitmap$CompressFormat").JPEG.value, 100, fos)
                    console.log("success!")
                    fos.flush();
                    fos.close();

                }
            }
        });


        Java.use("android.graphics.BitmapFactory").decodeByteArray.overload('[B', 'int', 'int', 'android.graphics.BitmapFactory$Options').implementation = function (data, offset, length, opts) {
            var result = this.decodeByteArray(data, offset, length, opts);
            var ByteString = Java.use("com.android.okhttp.okio.ByteString");

            //var gson = Java.use('com.google.gson.Gson')
            // data 由 com.ilulutv.fulao2.other.i.b 解密得来的
            // data 为数据的明文，就是最终图片，可以看jpg文件头看是否为一个图片
            //send(data)


            //send(gson.$new().toJson(data))
            //console.log("data, offset, length, opts=>",data, offset, length, opts)
            //console.log("IMAGE DATA:bytearray,int=>",ByteString.of(data).hex())

            /*
            写入sd卡中
            var path = "/sdcard/Download/tmp/"+guid()+".jpg"
            console.log("path=> ",path)
            var file = Java.use("java.io.File").$new(path)
            var fos = Java.use("java.io.FileOutputStream").$new(file);
            fos.write(data);
            fos.flush();
            fos.close();
            */

            /*var gson = Java.use('com.google.gson.Gson')

            console.log("result is =>",gson.$new().toJson(result))
            console.log("className is =>",getObjClassName(result))*/
            //console.log('Object.getOwnPropertyNames()=>',Object.getOwnPropertyNames(result.$className))




            /*
            var path = "/sdcard/Download/tmp/" + guid() + ".jpg"
            console.log("path=> ", path)
            var file = Java.use("java.io.File").$new(path)
            var fos = Java.use("java.io.FileOutputStream").$new(file);

            // 结果就是一个Bitmap对象不是一个类 可以直接使用compress保存
            // java文档 Bitmap.CompressFormat 转成js中内部类
            result.compress(Java.use("android.graphics.Bitmap$CompressFormat").JPEG.value, 100, fos)
            console.log("success!")
            fos.flush();
            fos.close();
            */



            var runnable = saveImg.$new(result);
            runnable.run()
            return result;
        }
    })
}



function main() {
    //hookq0();
    //hookImageByteCiphered();
    //hook_SSLsocketandroid8();
    hookImage();
    //hookByteBuffer()
    //hookdecodeimgkey();
}
setImmediate(main)

