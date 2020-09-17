function callsecret() {
    Java.perform(function x() {
        console.log("java perform");

        Java.choose('com.noguess.a0820demo1.MainActivity', {
            onMatch: function (instance) {
                console.log("found instance:" + instance);
                console.log("instance.secret():" + instance.secret());
            },
            onComplete: function () {
                console.log('finish');
            }
        });

    })
}

rpc.exports = {
    callsecret: callsecret
};