//let {AsyncSeriesHook} = require('tapable');

class AsyncSeriesHook{
  constructor(){
    this.tasks = []
  }
  tapPromise(name,fn){
    this.tasks.push(fn)
  }
  promise(){
    const [first,...others] = this.tasks
    return others.reduce((pre,cur)=>{
      return pre.then(cur)
    },first())
    // const args = Array.from(arguments)
    // let that = this
    // let total = this.tasks.length,counter = 0;
    // return new Promise((resolve,reject)=>{
    //   run(resolve,reject)
    // })
    // function run(resolve,reject){
    //   if(counter++ == total){
    //     resolve()
    //   }else{
    //     const fn = that.tasks.pop()
    //     fn(...args).then(()=>{
    //       run(resolve,reject)
    //     },(err)=>{
    //       reject(err)
    //     })
    //   }
    // }
  }
} 


let queue = new AsyncSeriesHook(['name']);

console.time('cost');
queue.tapPromise('1',function(name){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log(1);
        resolve();
    },1000)
  });
});
queue.tapPromise('2',function(name){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log(1);
        resolve();
    },2000)
  });
});
queue.tapPromise('3',function(name){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log(1);
        resolve();
    },3000)
  });
});

queue.promise('zfpx').then(()=>{
  console.timeEnd('cost');
},(err)=>{
  console.log(err)
})