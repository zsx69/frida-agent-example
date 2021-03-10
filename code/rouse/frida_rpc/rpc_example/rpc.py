import frida

"""
attach到本机电脑上，需要在电脑上安装frida-server
frida 万物皆可hook
"""

session = frida.attach("Google Chrome")
script = session.create_script("""\
rpc.exports = {
  hello: function () {
    return 'Hello';
  },
  failPlease: function () {
    return 'oops';
  }
};
""")
script.load()
api = script.exports
print("api.hello() =>", api.hello())
api.fail_please()
api.hello()
