function main() {
    Java.perform(function x() {
        console.log("你好123")
        console.log("你好456")
    })
}

// 异步调用
setImmediate(main);

