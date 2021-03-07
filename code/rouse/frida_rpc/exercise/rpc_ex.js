function getHello() {
    Java.perform(function x() {
        console.log("你好123")
        console.log("你好456")
    })
}


//rpc python 里调用前面的getHello就相当于跑js的getHello
rpc.exports = {
    getHello:getHello
}


// 异步调用 直接命令行调用
setImmediate(main);