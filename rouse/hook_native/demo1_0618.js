/*
主动调用、方法替换
example:
open函数文档：https://blog.csdn.net/simongyley/article/details/8330636
var openPtr = Module.getExportByName('libc.so', 'open');
// int：返回值 ['pointer', 'int']：参数列表
var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
// pathPtr, flags 参数
Interceptor.replace(openPtr, new NativeCallback(function (pathPtr, flags) {
  // 打印路径
  var path = pathPtr.readUtf8String();
  log('Opening "' + path + '"');
  // 重新调用
  var fd = open(pathPtr, flags);
  // 返回值：若所有欲核查的权限都通过了检查则返回0 值，表示成功，只要有一个权限被禁止则返回-1。
  log('Got fd: ' + fd);
  return fd;
}, 'int', ['pointer', 'int']));
 */

function hook_replace() {
    var addr_NewStringUTF = null;
    var Symbols = Process.findModuleByName("libart.so").enumerateSymbols();
    for (var i = 0; i < Symbols.length; i++) {
        var symbol = Symbols[i].name;
        if ((symbol.indexOf('CheckJNI') == -1) && symbol.indexOf('JNI') >= 0) {
            if (symbol.indexOf('NewStringUTF') >= 0) {
                console.log("Symbols[i].name:", Symbols[i].name);
                console.log("Symbols[i].address:", Symbols[i].address);
                addr_NewStringUTF = Symbols[i].address;
            }
        }
    }

    // jstring 是一个pointer， GetStringUTF第一个参数是JNI ENV
    var NewStringUTF = new NativeFunction(addr_NewStringUTF, 'pointer', ['pointer', 'pointer']);
    Interceptor.replace(NewStringUTF, new NativeCallback(function (env, content_ptr) {
        var content = Memory.readCString(content_ptr);
        console.log('Opening "' + content + '"');

        // 方法参数替换
        var new_content_ptr = Memory.allocUtf8String("string frida native hook replace")
        var retval = NewStringUTF(env, new_content_ptr);

        //var retval = GetStringUTF(env, content_ptr);
        console.log('retval: ' + Java.vm.getEnv().getStringUtfChars(retval, null).readCString());

        return retval;
    }, 'pointer', ['pointer', 'pointer']));
}


function main() {
    hook_replace()
}

setImmediate(main)