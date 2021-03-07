function main() {
    Java.perform(function x() {
            console.log("java perform");
            // login
            var System = Java.use("java.lang.System");
            System.getProperty.overload('java.lang.String').implementation = function (v1) {
                console.log("v1:" + v1);
                var ret_value = this.getProperty(v1);
                console.log("ret_value:" + ret_value);
                return 'Russia'
            };
            System.getenv.overload('java.lang.String').implementation = function (v1) {
                console.log("v1:" + v1);
                var ret_value = this.getProperty(v1);
                console.log("ret_value:" + ret_value);
                var pass = Java.use('java.lang.String').$new('RkxBR3s1N0VSTDFOR180UkNIM1J9Cg==');
                return pass;
            };
            var MessengerActivity = Java.use('com.tlamb96.kgbmessenger.MessengerActivity');
            MessengerActivity.a.implementation = function (str) {
                return "V@]EAASB\u0012WZF\u0012e,a$7(&am2(3.\u0003";
            };
            MessengerActivity.b.implementation = function (str) {
                return "dslp}oQ dks$|Mh +AYQgP*!M$gQ";
            }
        }
    );
}


setImmediate(main);