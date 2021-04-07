import frida, time

device_manager = frida.get_device_manager()
# frida的端口
device = device_manager.add_remote_device("127.0.0.1:58888")
pid = device.spawn('com.example.demoso1')
device.resume(pid)
time.sleep(1)
session = device.attach(pid)
with open("1023_rpc.js") as f:
    script = session.create_script(f.read())
script.load()

a = script.exports.method2("aaaaa")
print(a)