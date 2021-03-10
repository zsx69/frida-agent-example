function main() {
    Java.perform(function x() {
        console.log("java perform");
        var stringClass = Java.use("java.lang.String");
        var verfiy = Java.use('org.teamsik.ahe17.qualification.Verifier');
        var p = stringClass.$new('09042ec2c2c08c4cbece042681caf1d13984f24a');
        var pSign = p.getBytes();
        console.log(bytesToString(pSign));

        for (var i = 7000; i < 10000; i++) {
            console.log(i);
            var v = String(i);
            var vSign = verfiy.encodePassword(v);
            if (bytesToString(vSign) == bytesToString(pSign)) {
                console.log("real vSign:" + v);
                break;
            }
        }
    });

    function bytesToString(arr) {
        var str = '';
        arr = new Uint8Array(arr);
        for (var i in arr) {
            str += String.fromCharCode(arr[i]);
        }
        return str;

    }
}

setImmediate(main);