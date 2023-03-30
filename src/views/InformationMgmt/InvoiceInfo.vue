<template>
  <div>
    <div class="top">
      <el-form ref="invoiceForm" :model="invoiceForm" label-width="90px">
        <el-col :span="7">
          <el-form-item label="供应商编号">
            <el-input style="width:85%;" v-model="invoiceForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发票类型">
            <el-select style="width: 95%;" v-model="invoiceForm.invoiceType" placeholder="发票类型">
              <el-option v-for="(item, index) in invoiceCategory" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="时   间">
            <el-date-picker v-model="invoiceForm.time" type="date" style="width: 95%;" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="default" @click="resetForm">重置</el-button>
        </el-col>
      </el-form>
    </div>
    <div  class='body' v-autoTableHeight="150">
      <el-table v-loading="loading"
      :data="InvoiceInfo" 
      style="width: 100%" 
      height="100%">
        <el-table-column fixed prop="certificateId" label="供应商证件号码" width="150">
        </el-table-column>
        <el-table-column fixed prop="customerId" label="供应商编号" width="120">
        </el-table-column>
        <el-table-column prop="corpName" label="供应商名称" width="120">
        </el-table-column>
        <el-table-column prop="certificateType" label="供应商证件类型" width="120">
        </el-table-column>
        <el-table-column prop="interCustomerId" label="核心企业的证件号" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceNotaxAmt" label="发票不含税金额（专票）" width="170">
        </el-table-column>
        <el-table-column prop="InvoiceCcy" label="发票币种" width="120">
        </el-table-column>
        <el-table-column prop="SellerName" label="销方名称" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceType" label="发票类型" width="120">
        </el-table-column>
        <el-table-column prop="BuyerName" label="购方名称" width="120">
        </el-table-column>
        <el-table-column prop="BuyerUsccode" label="购方税号" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceDate" label="开票日期" width="120">
        </el-table-column>
        <el-table-column prop="SellerUsccode" label="销方税号" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceCode" label="发票代码" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceNum" label="发票号码" width="120">
        </el-table-column>
        <el-table-column prop="CheckCode" label="校验码后六位" width="120">
        </el-table-column>
        <el-table-column prop="InvoiceAmt" label="发票金额" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
    <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage" 
      :page-size="pages.pageSize"
      layout="total, prev, pager, next, jumper" 
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


.top{
   padding: 10px;
   padding-top:25px;
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
        id: "",
        invoiceType: "",
        time: ""
      },
      invoiceCategory: [
        { label: "普通发票", value: "普通发票" },
        { label: "专业发票", value: "专业发票" }
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


    getInvoiceInformation(data){
      const that = this;
      this.loading = true;
      InvoiceInformation(data).then(response => {
        that.loading = false;
        console.log(response)
        that.InvoiceInfo = response.data.invoiceInformationList;
        that.pages.total= response.data.totalcount;
      },error => {
        that.loading = false;
      })
    },


    resetForm(formName) {
      this.invoiceForm = {
        time: "",
        invoiceType: "",
        time: ""
      };
    },
    onSubmit() {
      this.getInvoiceInformation(this.invoiceForm);
    },
    handleData(data){
    if(!data){
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
      console.log(`当前页: ${val}`);
      console.log(this.invoiceForm)
    }
  },
  mounted() {
    this.getInvoiceInformation();
  },

}
</script>
