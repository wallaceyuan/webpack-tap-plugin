
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
  constructor() {
    this.tasks=[];
  }
  tap(name,fn){
    this.tasks.push(fn)
  }
  callAsync(){
    const args = Array.from(arguments)
    const lastFn = args.pop()
    for(var i =0;i<this.tasks.length;i++){
      let res = this.tasks[i](...args)
      if(res){
        return lastFn(res)
      }
    }
  }
  promise(){
    let promises = this.tasks.map(task => task());
    return Promise.all(promises);
  }
}

let queue = new AsyncParallelBailHook(['name']);

console.time('cost');
queue.tap('1',function(name){
  console.log(1);
  return "Wrong";
});
queue.tap('2',function(name){
  console.log(2);
});
queue.tap('3',function(name){
  console.log(3);
});
queue.callAsync('zfpx',err=>{
  console.log(err);
  console.timeEnd('cost');
});
