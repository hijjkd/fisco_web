<template>
  <div class="" style="padding: 20px !important;">
    <div style="width: 100%;background: #ffffff;text-align: center;display: block">
      <el-form ref="invoiceForm" :model="invoiceForm" label-width="90px">
        <el-col :span="7" >
          <el-form-item label="供应商编号">
            <el-input style="width:85%;" v-model="invoiceForm.id_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发票类型">
            <el-select style="width: 95%;" v-model="invoiceForm.invoice_Type" placeholder="发票类型">
              <el-option v-for="(item,index) in invoiceCategory" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" >
          <el-form-item label="时   间">
            <el-date-picker
              v-model="invoiceForm.date_time"
              type="date"
              style="width: 95%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;" >
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="default" @click="resetForm">重置</el-button>
        </el-col>
      </el-form>
    </div>
    <div  v-autoTableHeight="150">
      <el-table
        :data="InvoiceInfo"
        style="width: 100%"
        height="100%">
        <el-table-column
          fixed
          prop="certificateId"
          label="供应商证件号码"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="customerId"
          label="供应商编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="corpName"
          label="供应商名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="certificateType"
          label="供应商证件类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="interCustomerId"
          label="核心企业的证件号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceNotaxAmt"
          label="发票不含税金额（专票）"
          width="170">
        </el-table-column>
        <el-table-column
          prop="InvoiceCcy"
          label="发票币种"
          width="120">
        </el-table-column>
        <el-table-column
          prop="SellerName"
          label="销方名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceType"
          label="发票类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="BuyerName"
          label="购方名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="BuyerUsccode"
          label="购方税号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceDate"
          label="开票日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="SellerUsccode"
          label="销方税号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceCode"
          label="发票代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceNum"
          label="发票号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="CheckCode"
          label="校验码后六位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="InvoiceAmt"
          label="发票金额"
          width="120">
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>

import { InvoiceInformation } from "@/util/api";

export default {
  data() {
    return {
      InvoiceInfo: [],
      invoiceForm: {
        id_no: '',
        invoice_Type: '',
        date_time: ''
      },
      invoiceCategory:[
        {label:"普通发票",value:"普通发票"},
        {label:"专业发票",value:"专业发票"}
      ]
    }
  }, methods: {
    getData(data) {
      if(data){
        //传入参数
        let param = {
                id: data.id_no,
                invoiceType: data.invoice_Type,
                time: data.date_time
            }
        InvoiceInformation(param).then(response => {
        this.InvoiceInfo = response.data.invoiceInformationList
      },);
      }else{
        InvoiceInformation().then(response => {
        this.InvoiceInfo = response.data.invoiceInformationList
      },);
      }

    },
    resetForm(formName) {
      this.invoiceForm ={
        id_no: '',
        invoice_Type: '',
        date_time: ''
      }
    },
    onSubmit(){
      this.getData(this.invoiceForm);
    }
  }, mounted() {
    this.getData();
  },
}
</script>
