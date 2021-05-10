function TIMManager() {
    Java.perform(function () {
        Java.choose("com.tencent.imsdk.TIMManager", {
            onMatch: function (ins) {
                console.log("found ins => ", ins)
                console.log("found ins.getNetworkStatus() => ", ins.getNetworkStatus())
                console.log("found ins.getSdkConfig() => ", ins.getSdkConfig())
                // console.log("found ins.getUserConfig() => ", ins.getUserConfig())
                // var output = "";
                // output = inspectObject(ins.getUserConfig(), output);
                // console.log(output)
                console.log("found ins.getConversationList() => ", ins.getConversationList())
                console.log("found ins.getConversationList() => ", ins.getConversationList().toString())
                console.log("found ins.getConversationList() => ", JSON.stringify(ins.getConversationList()))

                var iter = ins.getConversationList().listIterator();
                while (iter.hasNext()) {
                    console.log(iter.next());
                    if (iter.next() != null) {
                        var TIMConversation = Java.cast(iter.next(), Java.use("com.tencent.imsdk.TIMConversation"))
                        console.log(TIMConversation.getPeer());
                        // if (TIMConversation.getPeer().toString().indexOf("209509") >= 0) {
                        console.log("try send message...")

                        //构造一条消息
                        var msg = Java.use("com.tencent.imsdk.TIMMessage").$new();
                        //添加文本内容
                        var elem = Java.use("com.tencent.imsdk.TIMTextElem").$new();
                        elem.setText("r0ysue222");
                        //将elem添加到消息
                        msg.addElement(elem)

                        // if (msg.addElement(elem) != 0) {
                        //     Log.d(tag, "addElement failed");
                        //     return;
                        // }
                        const callback = Java.registerClass({
                            name: 'com.tencent.imsdk.TIMValueCallBackCallback',
                            implements: [Java.use("com.tencent.imsdk.TIMValueCallBack")],
                            methods: {
                                onError(i, str) { console.log("send message failed. code: " + i + " errmsg: " + str) },
                                onSuccess(msg) { console.log("SendMsg ok", +msg) }
                            }
                        });
                        //发送消息
                        TIMConversation.sendMessage(msg, callback.$new())
                        // }
                    }
                }


    }, onComplete: function () {
        console.log("search compeled")
    }
        })
    })
}

function main() {
    TIMManager()
}
setImmediate(main)