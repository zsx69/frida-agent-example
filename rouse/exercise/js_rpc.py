# -*- encoding:utf-8 -*-
# Author: zsx <18611901469@163.com>
# Date:   2020/7/30
import sys
import time
import frida

device = frida.get_usb_device()

# 生成一个进程id
pid = device.spawn(['com.iCitySuzhou.suzhou001'])
# 重启进程
device.resume(pid)
time.sleep(2)
session = device.attach(pid)
with open("rpc_ex.js") as f:
    script = session.create_script(f.read())
# 传递消息
script.on()
script.load()

command = ""
while 1 == 1:
    command = input("Enter command")
    if command == "1":
        break
    elif command == "2":
        script.exports.getHello()

