<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b" style="text-align: right">
<!--    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <div class="nav_header">
      欢迎{{username}}登录本系统！
    </div>

    <el-menu-item index="3" style="float: right;margin-right: 15px" @click="logOut" >退出</el-menu-item>
<!--    <el-menu-item index="4" style="float: right" >dyy</el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "headerBar",
  data(){
    return {
      username:localStorage.getItem("userName")?localStorage.getItem("userName"):""
    }
  },
  methods:{
    logOut(){
      this.$confirm('您确定要退出当前用户吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        //在此操作删除cookie及用户信息
        localStorage.removeItem("access_token")
        localStorage.removeItem("userName")
        this.$router.push('login')
      })
    },
  }
}
</script>

<style scoped>
.nav_header {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding: 0 20px 0 20px;
  color: #fff;
}

</style>
