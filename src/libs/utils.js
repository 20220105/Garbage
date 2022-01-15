// import { set } from "core-js/core/dict";

function throttle(fn, delay) { //节流
  //delay 触发一次
  var t = null,
    begin = new Data().getTime();
  
  // clearTimeout(t);
  
  return function () { 
    var _self = this,
      args = arguments,
      cur = new Data().getTime();
       //报错,不是一个getTime函数(Transfer())
    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(_self.args);
      begin = cur;
    } else { 
      t = setTimeout(function () {
        fn.apply(_self, args);
      }, delay); //节流
    }
  }
}
export { 
  throttle  //函数导出
}