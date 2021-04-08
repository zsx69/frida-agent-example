# -*- encoding:utf-8 -*-
# Author: zsx <18611901469@163.com>
# Date:   2020/8/20

import frida, time


def on_message(message, data):
    print(data)
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


device = frida.get_usb_device()
pid = device.spawn(['com.noguess.a0820demo1'])
device.resume(pid)
time.sleep(2)
session = device.attach(pid)
with open("0820_rpc.js") as f:
    script = session.create_script(f.read())
script.on('message', on_message)
script.load()

command = ""
while 1 == 1:
    command = input("Enter command")
    if command == "1":
        break
    elif command == "2":
        script.exports.callsecretfunction()
