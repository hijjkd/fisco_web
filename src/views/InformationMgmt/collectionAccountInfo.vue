<template>
  <div class="" style="padding: 20px !important;">
       <div style="width: 100%;height: 30px;background: #ffffff;text-align: center" ></div>
       <div v-autoTableHeight='100'>
         <el-table :data="InvoiceInfo" style="width: 100%;height: 100%;">
          <el-table-column prop="BackAccount" label="供应商回款账户" width="180">
          </el-table-column>
          <el-table-column prop="CertificateId" label="供应商证件号码" width="180">
          </el-table-column>
          <el-table-column prop="CustomerId" label="供应商编号">
          </el-table-column>
          <el-table-column prop="CorpName" label="供应商名称">
          </el-table-column>
          <el-table-column prop="LockRemark" label="锁定备注">
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
import { CollectionAccountInfo } from "@/util/api";
export default {
  data() {
    return {
      InvoiceInfo: []
    }
  }, methods: {
    getData() {
      CollectionAccountInfo().then(response => {
        this.InvoiceInfo = response.data
      },);
    }
  }, mounted() {
    this.getData();

  },
}
</script>
