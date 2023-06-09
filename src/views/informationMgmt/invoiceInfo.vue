<template>
  <div>
    <div class="top">
      <el-form ref="invoiceForm" :model="invoiceForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="供应商编号" label-width="130px">
              <el-input v-model="invoiceForm.customerId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核心企业证件号" label-width="130px">
              <el-input v-model="invoiceForm.interCustomerId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票号码" label-width="130px">
              <el-input  v-model="invoiceForm.invoiceNum" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拥有方" label-width="130px">
              <el-select  v-model="invoiceForm.owner" placeholder="拥有方" style="width: 100%">
                <el-option v-for="(item, index) in ownerCategory" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发票代码" label-width="130px">
              <el-input v-model="invoiceForm.invoiceCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票校验码" label-width="130px">
              <el-input  v-model="invoiceForm.checkCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票类型" label-width="130px">
              <el-select v-model="invoiceForm.invoiceType" placeholder="发票类型" style="width: 100%">
                <el-option v-for="(item, index) in invoiceCategory" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间" label-width="130px">
              <el-date-picker v-model="invoiceForm.startTime" value-format="yyyy-MM-dd" type="date" style="width: 100%"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" label-width="130px">
              <el-date-picker v-model="invoiceForm.endTime" value-format="yyyy-MM-dd" type="date" style="width: 100%"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label-width="130px">
              <el-button type="primary" @click="onSubmit">搜索</el-button>
              <el-button type="default" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class='body' v-autoTableHeight="255">
      <el-table v-loading="loading" :data="InvoiceInfo" style="width: 100%" height="100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed align="center" width="75">
        </el-table-column>
        <el-table-column fixed prop="certificateId" label="供应商证件号码" width="150">
        </el-table-column>
        <el-table-column fixed prop="customerId" label="供应商编号" width="120">
        </el-table-column>
        <el-table-column fixed prop="owner" label="拥有方" width="120">
          <template slot-scope="scope">
                <span>{{ scope.row['owner'] | ownerChange }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="corpName" label="供应商名称" width="120">
        </el-table-column>
        <el-table-column prop="certificateType" label="供应商证件类型" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row['certificateType'] | certificateTypeChange }}</span>
              </template>
            </el-table-column>
        <el-table-column prop="interCustomerId" label="核心企业的证件号" width="120">
        </el-table-column>
        <el-table-column prop="invoiceNotaxAmt" label="发票不含税金额（专票）" width="170">
        </el-table-column>
        <el-table-column prop="invoiceCcy" label="发票币种" width="120">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.invoiceCcy | moneyDecode }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="sellerName" label="销方名称" width="120">
        </el-table-column>
        <el-table-column prop="invoiceType" label="发票类型" width="120">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.invoiceType | invoiceChange }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="buyerName" label="购方名称" width="120">
        </el-table-column>
        <el-table-column prop="buyerUsccode" label="购方税号" width="120">
        </el-table-column>
        <el-table-column prop="invoiceDate" label="开票日期" width="120">
        </el-table-column>
        <el-table-column prop="sellerUsccode" label="销方税号" width="120">
        </el-table-column>
        <el-table-column prop="invoiceCode" label="发票代码" width="120">
        </el-table-column>
        <el-table-column prop="invoiceNum" label="发票号码" width="120">
        </el-table-column>
        <el-table-column prop="checkCode" label="校验码后六位" width="120">
        </el-table-column>
        <el-table-column prop="invoiceAmt" label="发票金额" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pages.currentPage" :page-size="pages.pageSize" layout="total, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>

    </div>
  </div>
</template>

<style>
.invoice-title {
  width: 100%;
  color: whitesmoke;
  text-align: center;
  display: block;
  font-size: 30px;
  margin-bottom: 20px;
}


.top {
  padding: 10px;
  padding-top: 25px;
}

.footer {
  margin-top: 5px;
}
</style>

<script>

import { InvoiceInformation } from "@/util/api";
import { copyFileSync } from "fs";


export default {
  data() {
    return {
      InvoiceInfo: [],
      invoiceForm: {
        customerId: "",//供应商编号
        interCustomerId:"",//核心企业号
        checkCode:"",//发票校验码
        owner:"",//拥有方
        invoiceNum: "",//发票号码
        invoiceType: "",//发票类型
        invoiceCode:"",//发票代码
        invoiceDate:'',
        /**
         * 查询发票的起止时间，拼接为date以to分割。
         */
        startTime: "",
        endTime: "",
        pageId:1
      },
      invoiceCategory: [
        { label: "普通发票", value: "02" },
        { label: "专业发票", value: "01" }
      ],
      ownerCategory: [
        { label: "保理", value: "1" },
        { label: "银行", value: "0" }
      ],
      pages: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      loading: true
    };
  },

  methods: {
    // getInvoiceInformation(data) {
    //   if (data) {
    //     //传入参数
    //     let param = {
    //       id: data.id_no,
    //       invoiceType: data.invoice_Type,
    //       time: data.date_time
    //     };
    //     InvoiceInformation(param).then(response => {
    //       this.InvoiceInfo = response.data.invoiceInformationList;
    //     });
    //   }
    //   else {
    //     InvoiceInformation().then(response => {
    //       this.InvoiceInfo = response.data.invoiceInformationList;
    //     });
    //   }
    // },
    /*handleSelectionChange(val) {
      this.multipleSelection = val;
    },*/

    getInvoiceInformation(data) {
      const that = this;
      this.loading = true;
      InvoiceInformation(data).then(response => {
        that.loading = false;
        //console.log(response)
        that.InvoiceInfo = response.data.invoiceInformationList;
        that.pages.total = response.data.totalcount;
      }, error => {
        that.loading = false;
      })
    },

    //重置搜索选项
    resetForm(formName) {
      this.invoiceForm = {
        customerId: "",//供应商编号
        interCustomerId:"",//核心企业号
        checkCode:"",//发票校验码
        owner:"",//拥有方
        invoiceNum: "",//发票号码
        invoiceType: "",//发票类型
        invoiceCode:"",//发票代码
        invoiceDate:'',
        /**
         * 查询发票的起止时间，拼接为date以to分割。
         */
        startTime: "",
        endTime: "",
        pageId:1
      };
      this.getInvoiceInformation()
    },

    onSubmit() {
      if(this.invoiceForm.startTime||this.invoiceForm.endTime){
        this.invoiceForm.invoiceDate = this.invoiceForm.startTime + 'to' + this.invoiceForm.endTime;
      }else{
        this.invoiceForm.invoiceDate = "";
      }
      const data = this.invoiceForm;
      data.pageId=1;
      this.getInvoiceInformation(data);
    },


    handleData(data) {
      if (!data) {
        return;
      }
    },


    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.invoiceForm.pageId = val;
      const data = this.invoiceForm;
      this.getInvoiceInformation(data);
    }
  },

  mounted() {
    this.getInvoiceInformation();
  },

}
</script>

<style scoped>
.top {
  padding: 10px;
  padding-top: 25px;
}
::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
}
.footer {
  margin-top: 5px;
}
</style>
