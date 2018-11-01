//let {SyncBailHook} = require('tapable')

class SyncBailHook{
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
        for(var i = 0;i<this.arrList.length;i++){
            let value = this.arrList[i].fn(...args)
            if(value) break;
        }
    }
}

//tap注册监听 call 触发事件
let queue = new SyncBailHook(['name','age'])
queue.tap('1', function (name) {
    console.log(name, 1);
});
queue.tap('2', function (name) {
    console.log(name, 2);
    return '2 wrong'
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx',12);