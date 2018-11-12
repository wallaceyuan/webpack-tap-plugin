//let {AsyncSeriesWaterfallHook} = require('tapable');

class AsyncSeriesWaterfallHook{
  constructor(){
    this.tasks = []
  }
  tapAsync(name,fn){
    this.tasks.push(fn)
  }
  callAsync(){
    const args = Array.from(arguments)
    const callback = args.pop()
    let i=0,size = this.tasks.length;
    let next = (err,res)=>{
      if(err){
        callback(err)
      }else{
        let task  = this.tasks[i++]
        if(task){
          if (i==1) {
            task(...args,next);
          } else {
            task(res,next);
          }
        } else {
          callback(err,res);
        }
      }
    }
    next()
  }
} 


let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
  setTimeout(function(){
      console.log(name,1);
      callback(null,1);
  },1000)
});
queue.tapAsync('2',function(arg2,callback){
  setTimeout(function(){
      console.log(arg2,2);
      callback(null,2);
  },2000)
});
queue.tapAsync('3',function(arg3,callback){
  setTimeout(function(){
      console.log(arg3,3);
      callback(null,3);
  },3000)
});

queue.callAsync('zfpx',(err,data)=>{
  console.log(err,data);
  console.timeEnd('cost');
})