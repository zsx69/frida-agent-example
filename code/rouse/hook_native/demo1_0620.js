function write_reg() {
    var file = new File("/sdcard/reg.dat", "w")
    file.write("EoPAoY62@ElRD");
    file.flush();
    file.close()
}

function write_reg2() {
    var fopen_addr = Module.findExportByName("libc.so", "fopen");
    var fputs_addr = Module.findExportByName("libc.so", "fputs");
    var fclose_addr = Module.findExportByName("libc.so", "fclose");

    console.log("fopen:", fopen_addr, " fputs :", fputs_addr, " fclose :", fclose_addr);

    var fopen = new NativeFunction(fopen_addr, "pointer", ["pointer", "pointer"]);
    var fputs = new NativeFunction(fputs_addr, "int", ["pointer", "pointer"])
    var fclose = new NativeFunction(fclose_addr, "int", ["pointer"]);

    var filename = Memory.allocUtf8String("/sdcard/reg.dat");
    var file_mode = Memory.allocUtf8String("w+");

    var file = fopen(filename, file_mode);

    var contents = Memory.allocUtf8String("EoPAoY62@ElRD");
    var ret = fputs(contents, file);
    fclose(file);
}

setImmediate(write_reg)

/*
https://gtoad.github.io/2017/06/25/Android-Anti-Debug/
https://github.com/gnaixx/anti-debug
*/