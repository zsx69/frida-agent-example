Java.perform(
    function () {
        var DigParams = Java.use("com.lianjia.common.dig.DigParams");
        DigParams.getUdid.implementation = function () {
            var encry =  this.getUdid();
            console.log("encry:" + encry);
            return encry
        };

    }
);


