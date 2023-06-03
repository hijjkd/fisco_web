<template>
  <div style="height: 50%">
    <el-row>
      <el-col :span="18" style="margin-top: 20px;margin-left: 30px">
          <span v-for="(item,index) in form.items" :key="index" @click="returnThisProcess(index,item.key)" >
            <span style="color: #1f83e7;cursor:pointer">{{item.value}}</span>
            <span class="el-icon-arrow-right breadcrum" v-show="index != form.items.length - 1"></span>
          </span>
      </el-col>
    </el-row>

    <el-row class="parent" v-roleLimit="'admin,use'">
      <div class="child" v-show="processes.startProcess">
        <el-row style="margin-top: 50px">
          <el-col :span="12" :offset="6" >
            <el-input v-model="form.id" style="width: 100%" :placeholder="form.placeholder" size="medium"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 40px">
          <el-col :span="12" :offset="6">
            <el-button type="success" style="width: 100%" @click="createProcess" >创建招标流程/查询招标</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="child" v-show="processes.nextProcess">
        <el-row>
          <el-col :span="8" :offset="8">
            <el-button type="primary" style="width: 100%" @click="processFileStart">招标文件</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-5">
          <el-col :span="8" :offset="8">
            <el-button type="primary" style="width: 100%" >投标文件</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-5">
          <el-col :span="8" :offset="8">
            <el-button type="primary" style="width: 100%" >评价记录</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-5">
          <el-col :span="8" :offset="8">
            <el-button type="primary" style="width: 100%" >定价报告</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-5">
          <el-col :span="8" :offset="8">
            <el-button type="primary" style="width: 100%" >合同文件</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="child" v-show="processes.processFile">
        <el-row>
          <el-col :span="8" :offset="8">
            <el-button type="success" style="width: 100%" @click="processFileUpload">招标文件上传</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-10">
          <el-col :span="8" :offset="8">
            <el-button type="success" style="width: 100%" @click="processFIleValidate">招标文件验证</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-10">
          <el-col :span="8" :offset="8">
            <el-button type="success" style="width: 100%" @click="processFileChange" >更改记录</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-10">
          <el-col :span="8" :offset="8">
            <el-button type="success" style="width: 100%" >招标文件下载</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="child" v-show="processes.processFileUpload">
        <el-upload style="width: 370px;margin: 0 auto;"
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
      </div>
      <div class="child" v-show="processes.processFIleValidate">
        <el-upload style="width: 370px;margin: 0 auto;"
                   class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
      </div>
      <div class="child" v-show="processes.processFileChange">
        <el-row class="mg-t-10">
          <el-col :span="8" :offset="5">
              <el-input v-model="form.hash1" style="width: 100%"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="float: left">查询</el-button>
          </el-col>
        </el-row>
        <el-row class="mg-t-10">
          <el-col :span="8" :offset="5">
            <el-input v-model="form.hash2" style="width: 100%"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="float: left">查询</el-button>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "filesMgn",
  data(){
    return {
      form:{
        id:"",
        placeholder:"输入招标流程ID",
        items:[],
        hash1:'',
        hash2:''
      },
      processes:{
        startProcess:true,
        nextProcess:false,
        processFile:false,
        processFileUpload:false,
        processFIleValidate:false,
        processFileChange:false
      }

    }
  },
  methods: {
    createProcess(){
      this.processShow("nextProcess");
      //调用接口，查看ID是否存在，若存在则进行查询否则进行创建。
      if(this.form.id){
        this.form.items.push({
          key:"nextProcess",
          value:'招标流程ID'
        })
      }
      //函数体
    },
    processFileStart(){   //点击招标文件
      this.processShow("processFile");
      this.form.items.push({
        key:"processFile",
        value:'招标文件'
      })
    },
    processFileUpload(){
      this.processShow("processFileUpload");
      this.form.items.push({
        key:"processFileUpload",
        value:'招标文件上传'
      })
    },
    processFIleValidate(){
      this.processShow("processFIleValidate");
      this.form.items.push({
        key:"processFIleValidate",
        value:'招标文件验证'
      })
    },
    processFileChange(){
      this.processShow("processFileChange");
      this.form.items.push({
        key:"processFileChange",
        value:'更改记录'
      })
    },
    processShow(node){ // 控制页面显示
      var temp = this.processes;
      for(var n in temp){
        if(node == n){
          temp[n] = true;
        }else {
          temp[n] = false;
        }
      }
    },
    returnThisProcess(index,key){ //面包屑返回当前
      this.processShow(key);
      this.showBreadcrumb(index);
    },
    showBreadcrumb(index){ //控制显示面包屑
      if(!arguments){
        return;
      }
      var temps = [];
      this.form.items.forEach(function (item,key){
        console.log(key)
        if(key > index){
          return
        }
        temps.push(item);
      });
      this.form.items = temps;
    }
  }
}
</script>

<style scoped>
.parent {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
.child {
  width: 80%;
  margin-top: 60px;
  height: 260px;
}
.mg-t-5{
  margin-top: 8px;
}
.mg-t-10{
  margin-top: 15px;
}
.breadcrum{
  margin-left: 3px;
  margin-right: 3px;
}

</style>
