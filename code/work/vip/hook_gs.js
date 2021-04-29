function hook_gs() {
    Java.perform(function x() {
            console.log("java perform");
            Java.openClassFile("/data/local/tmp/r0gson.dex").load();
            const gson = Java.use('com.r0ysue.gson.Gson');
            var KeyInfo = Java.use("com.vip.vcsp.KeyInfo");
            KeyInfo.gsNav.implementation = function (v1, v2, v3, v4) {
                console.log("v1:" + v1);
                console.log("v2:" + gson.$new().toJson(v2))
                console.log("v3:" + v3);
                console.log("v4:" + v4);
                var result = this.gsNav(v1, v2, v3, v4);
                console.log("result:" + result);
                return result
            };
        }
    );
}

setImmediate(hook_gs);
