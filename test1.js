const obj = {
    name: "7yue",
    age: 18,
    // 定义json序列化的方法
    toJSON: function () {
        return {
            name1: "8yue"
        }
    }
}

// {"name1":"8yue"}
console.log(JSON.stringify(obj))
