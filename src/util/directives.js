/*
自定义一些指令
*/
import Vue from 'vue'
export default {
  autoTableHeight:function(el,binding){
    var h = document.body.clientHeight;
    el.style.height = (h - binding.value - 61) + "px";
    window.addEventListener("resize",function(){
      h = document.body.clientHeight;
      el.style.height = (h - binding.value - 61) + "px";
    })
  },
  roleLimit:function(el,binding){
    var tempRoles = binding.value.split(",");
    var role = sessionStorage.getItem('role');
    if(!role){
      return;
    }
    var flag = false;
    console.log(tempRoles)
    if(role){
      tempRoles.forEach(function (tempRole){
        if(tempRole === role){
          flag = true;
        }
      })
    }
    if(!flag){
      var children = el.children;
      for(var i= 0;i<children.length;i++){
        el.removeChild(el.children[i])
      }
    }


  }
}
