//let {SyncHook} = require('tapable')


/*
class SyncHook{
    constructor(argNames){
        this.argName = argNames;
        this.arrList = []
    }
    tap(name,task){
        this.arrList.push({options:name,fn:task})
    }
    call(argus){
        this.arrList.map((todo)=>{
            todo.fn(argus)
        })
    }
}
*/

class SyncHook{
    constructor(argNames){
        this.argNames = argNames;
        this.arrList = []
    }
    tap(name,task){
        this.arrList.push({options:name,fn:task})
    }
    call(argus){
        //let args = Array.from(arguments)//{ '0': 'zfpx', '1': 12 } [ 'zfpx', 12 ]
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length)
        this.arrList.map(todo=>todo.fn(...args))
    }
}

//tap注册监听 call 触发事件
let queue = new SyncHook(['name','age'])
queue.tap('1', function (name) {
    console.log(name, 1);
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx',12);