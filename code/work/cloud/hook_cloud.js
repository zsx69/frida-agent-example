function hook_request() {
    Java.perform(function () {
        console.log("hook starting....")
        var nameClass = Java.use("com.netease.cloudmusic.utils.NeteaseMusicUtils")
        nameClass.serialdatanew.implementation = function (v1, v2, v3) {
            console.log("v1:->", v1)
            console.log("v2:->", v2)
            console.log("v3:->", v3)
            var result = this.serialdatanew(v1, v2, v3);
            console.log("result:->", result)
            return result
        }
    })
}

function bytesToString(arr) {
    var str = '';
    arr = new Uint8Array(arr);
    for (var i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;

}


function main() {
    hook_request()
}

setImmediate(main)