<template>
  <div class="" style="padding: 20px !important;">
       <div style="width: 100%;height: 30px;background: #ffffff;text-align: center" ></div>
       <div v-autoTableHeight='100'>
         <el-table :data="InvoiceInfo" style="width: 100%;height: 100%">
          <el-table-column fixed prop="CustcdLinkPosition" label="联系人职位" >
          </el-table-column>
          <el-table-column prop="CustcdLinkName" label="联系人" >
          </el-table-column>
          <el-table-column prop="CertificateId" label="供应商证件号码">
          </el-table-column>
          <el-table-column prop="CorpName" label="供应商名称">
          </el-table-column>
          <el-table-column prop="Remark" label="备注">
          </el-table-column>
          <el-table-column prop="BankContact" label="我行联系方式">
          </el-table-column>
          <el-table-column prop="BankLinkName" label="我行联系人">
          </el-table-column>
          <el-table-column prop="CustcdContact" label="联系方式">
          </el-table-column>

          <el-table-column prop="CustomerId" label="供应商编号">
          </el-table-column>
          <el-table-column prop="FinanceId" label="融资意向申请编号">
          </el-table-column>
          <el-table-column prop="CooperationYears" label="合作年限">
          </el-table-column>
          <el-table-column prop="CertificateType" label="供应商证件类型">
          </el-table-column>
          <el-table-column prop="InterCustomerId" label="核心企业证件号">
          </el-table-column>

        </el-table>
       </div>
    
  </div>
</template>

<script>

import { FinancingIntentionInfo } from "@/util/api";
export default {
  data() {
    return {
      InvoiceInfo: []
    }
  }, methods: {
    getData() {
      FinancingIntentionInfo().then(response => {
        this.InvoiceInfo = response.data
      },);
    }
  }, mounted() {
    this.getData();

  },
}
</script>
