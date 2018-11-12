//let {SyncHook}=require('tapable');
class SyncLoopHook{
  constructor() {
      this.tasks=[];
  }
  tap(name,task) {
      this.tasks.push(task);
  }
  call(...args) {    
      this.tasks.forEach(task => {
          let ret=true;
          do {
              ret = task(...args);
          }while(ret == true || !(ret === undefined))
      });
  }
}
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1',function(name){
  console.log(count++);
  if(count==3){
      return;
  }else{
      return true;
  }
});
queue.call('zfpx');