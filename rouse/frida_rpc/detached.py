import sys

import frida

"""
解除附加原因
"""


def on_detached():
    print("on_detached")


def on_detached_with_reason(reason):
    print("on_detached_with_reason:", reason)


def on_detached_with_varargs(*args):
    print("on_detached_with_varargs:", args)


device = frida.get_usb_device()

# 连接非标准端口
# device = frida.get_device_manager().add_remote_device('192.168.1.8:6666')

session = device.attach("com.android.settings")
print("attached")
session.on('detached', on_detached)
session.on('detached', on_detached_with_reason)
session.on('detached', on_detached_with_varargs)
sys.stdin.read()
