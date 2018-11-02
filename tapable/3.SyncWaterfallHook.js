let {
    SyncWaterfallHook
} = require('tapable')

class SyncWaterfallHook {
    constructor(argNames){
        this.argNames = argNames;
        this.arrList = []
    }
    tap(name,task){
        this.arrList.push({options:name,fn:task})
    }
    call(argus){
        //let args = Array.from(arguments)//{ '0': 'zfpx', '1': 12 } [ 'zfpx', 12 ]
        let [first, ...task] = this.arrList

    }
}

//tap注册监听 call 触发事件
let queue = new SyncWaterfallHook(['name', 'age'])
queue.tap('1', function (name,age) {
    console.log(name,age, 1);
    return 1;
});
queue.tap('2', function (data) {
    console.log(data, 2);
    return data+200;
});
queue.tap('3', function (data) {
    console.log(data, 3);
});
queue.call('zfpx',12);