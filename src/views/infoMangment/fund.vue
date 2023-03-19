<template>
    <el-table :data="InvoiceInfo" style="width: 100%">
        <el-table-column prop="CustcdLinkPosition" label="联系人职位" width="180">
        </el-table-column>
        <el-table-column prop="CustcdLinkName" label="联系人" width="180">
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
</template>
  
<script>
import axios from 'axios'
export default {
    name: "fund",
    components: {
        "v-content-head": contentHead,
    },
    data() {
        return {
            InvoiceInfo: []
        }
    }, methods: {
        getData() {
            axios.get('/api/asl/universal/decryptCollectionAccount').then(response => {
                console.log("liunan" + response.data);
                this.InvoiceInfo = response.data
            },);
        }
    }, mounted() {
        this.getData();
        // window.addEventListener('click',function(e){
        //     console.log(e)
        // })
    },
}
</script>