// let {
//     SyncWaterfallHook
// } = require('tapable')

class SyncWaterfallHook {
    constructor(argNames){
        this.argNames = argNames;
        this.arrList = []
    }
    tap(name,task){
        this.arrList.push(task)
    }
    call(argus){
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length)
        //let [first, ...task] = this.arrList
        // task.reduce((pre,cur)=>{
        //     return cur(pre)
        // },first(...args))
        return this.arrList.reduce((pre,cur)=>(...args)=>{cur(pre(...args))})(...args)
    }
}

//tap注册监听 call 触发事件
let queue = new SyncWaterfallHook(['name', 'age'])
queue.tap('1', function (arg1,agg2) {
    console.log(arg1,agg2, 1);
    return arg1+agg2
});
queue.tap('2', function (arg3) {
    console.log(arg3,2);
    return arg3+200;
});
queue.tap('3', function (data) {
    console.log(data);
});
queue.call(50,50);