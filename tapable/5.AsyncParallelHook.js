
//let {AsyncParallelHook}=require('tapable');

class AsyncParallelHook{
  constructor() {
    this.tasks=[];
  }
  tapAsync(name,fn){
    this.tasks.push(fn)
  }
  tapPromise(name,fn){
    this.tasks.push(fn)
  }
  callAsync(){
    let counter = 0,total = this.tasks.length
    const args = Array.from(arguments)
    const lastFn = args.pop()
    function done(err){
      if(err){
        lastFn(err)
      }else if(++counter == total){
        lastFn()
      }
    }
    this.tasks.forEach(task=>task(...args,done))
  }
  promise(){
    let promises = this.tasks.map(task => task());
    return Promise.all(promises);
  }
}

let hook = new AsyncParallelHook(['name']);

console.time('cost');
// hook.tapAsync('1',function(name,callback){
//   setTimeout(function(){
//     callback(0)
//   },1000)
// })
// hook.tapAsync('2',function(name,callback){
//   setTimeout(function(){
//     callback(0)
//   },2000)
// })
// hook.tapAsync('3',function(name,callback){
//   setTimeout(function(){
//     callback(0)
//   },3000)
// })
// hook.callAsync('zfpx',err=>{
//   console.log(err);
//   console.timeEnd('cost');
// });


hook.tapPromise('1',function(name){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
          console.log(1);
          resolve();
      },1000)
  });
});
hook.tapPromise('2',function(name){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
          console.log(2);
          reject('err');
      },2000)
  });
});
hook.tapPromise('3',function(name){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
          console.log(3);
          resolve();
      },3000)
  });
});

hook.promise('zfpx').then(()=>{
  console.timeEnd('cost');
},(err)=>{
  console.log(err)
})
