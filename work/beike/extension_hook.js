function main(){
    Java.perform(function x() {
            var tools = Java.use("com.lianjia.common.data.Tools");
            tools.getAppendParamsStr.implementation = function(v1) {
                console.log("v1:" + v1);
                var sb = this.getAppendParamsStr(v1);
                console.log("sb:" + sb);
                return sb
            };

            var configSp = Java.use("com.lianjia.common.data.ConfigSp");
            tools.getAppendParamsStr.implementation = function(v1) {
                console.log("v1:" + v1);
                var sb = this.getAppendParamsStr(v1);
                console.log("sb:" + sb);
                return sb
            };
        }
    );
}

setImmediate(main);
