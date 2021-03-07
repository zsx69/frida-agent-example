function hook_volume() {
    Java.perform(function () {
        Java.use("android.media.AudioManager").setStreamVolume.overload('int', 'int', 'int').implementation = function (int1, int2, int3) {
            var result = this.setStreamVolume(15, 15, 1);
            console.log("int1,int2,int3,result:" + int1, int2, int3, result);
            return result;
        }
    })

}


setImmediate(hook_volume);