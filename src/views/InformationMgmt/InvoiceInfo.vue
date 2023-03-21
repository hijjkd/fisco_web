<template>
  <div class="" style="padding: 20px !important;">
    <div style="width: 100%;height: 30px;background: #ffffff;text-align: center"></div>
    <el-table :data="InvoiceInfo" style="width: 100%" max-height="950">
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
      InvoiceInfo: []
    }
  }, methods: {
    getData() {
      InvoiceInformation().then(response => {
        this.InvoiceInfo = response.data
      },);
    }
  }, mounted() {
    this.getData();

  },
}
</script>
