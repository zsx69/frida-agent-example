import frida,time


device_manager = frida.get_device_manager()
device = device_manager.add_remote_device("192.168.20.75:8888")
pid = device.spawn('com.android.settings')
device.resume(pid)
time.sleep(1)
session = device.attach(pid)
with open("s1.js") as f:
    script = session.create_script(f.read())
script.load()

# 多个设备
# device_manager = frida.get_device_manager()
# device = device_manager.add_remote_device("192.168.20.75:8888")
# pid = device.spawn('com.android.settings')
# device.resume(pid)
# time.sleep(1)
# session = device.attach(pid)
# with open("s1.js") as f:
#     script = session.create_script(f.read())
# script.load()
input()