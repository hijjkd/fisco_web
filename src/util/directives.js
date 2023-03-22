/*
自定义一些指令
*/

export default {
  autoTableHeight:function(el,binding){
    var h = document.body.clientHeight;
    el.style.height = (h - binding.value) + "px";
    window.addEventListener("resize",function(){
      h = document.body.clientHeight;
      el.style.height = (h - binding.value) + "px";
    })
  }
}
