<template>
  <div>
    <div class="top">
      <el-form ref="historyForm" :model="historyForm" >
        <el-row>
          <el-col :span="8" >
            <el-form-item label="供应商编号" label-width="89px">
              <el-input style="width: 95%;" v-model="historyForm.id_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="融资意向申请编号" label-width="135px">
              <el-input style="width: 95%;" v-model="historyForm.apply_no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" >
            <el-form-item label="开始时间" label-width="89px">
              <el-date-picker
                v-model="historyForm.startTime"
                type="month"
                style="width: 95%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="结束时间" label-width="89px">
              <el-date-picker
                v-model="historyForm.endTime"
                type="month"
                style="width: 95%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;" >
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class = "body" v-autoTableHeight="190">
      <el-table v-loading="loading"
        :data="tableData"
        height="100%"
        width="100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          fixed
          align="center"
          width="75">
        </el-table-column>
        <el-table-column
          prop="customerGrade"
          label="供应商评级"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="certificateType"
          label="供应商证件类型" fixed width="110">
        </el-table-column>
        <el-table-column
          prop="interCustomerId"
          label="核心企业证件号">
        </el-table-column>
        <el-table-column
          prop="corpName"
          label="供应商名称">
        </el-table-column>
        <el-table-column
          prop="financeId"
          label="融资意向申请编号">
        </el-table-column>
        <el-table-column
          prop="certificateId"
          label="供应商证件号码">
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="供应商编号">
        </el-table-column>
        <el-table-column label="入库信息">
          <el-table-column
            prop="usedInfos[0].TradeYearMonth"
            width="90"
            label="交易年月">
          </el-table-column>
          <el-table-column
           prop="usedInfos[0].UsedAmount"
            width="90"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="usedInfos[0].Ccy"
            label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="结算信息">
          <el-table-column
            prop="settleInfos[0].TradeYearMonth"
            width="90"
            label="交易年月">
          </el-table-column>
          <el-table-column
            prop="settleInfos[0].SettleAmount"
            width="90"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="settleInfos[0].Ccy"
            label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="订单信息">
          <el-table-column
            prop="orderInfos[0].TradeYearMonth"
            width="90"
            label="交易年月">
          </el-table-column>
          <el-table-column
            prop="orderInfos[0].OrderAmount"
            width="90"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="orderInfos[0].Ccy"
            label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="应收账款信息">
          <el-table-column
            prop="receivableInfos[0].TradeYearMonth"
            width="90"
            label="交易年月">
          </el-table-column>
          <el-table-column
            prop="receivableInfos[0].ReceivableAmount"
            width="90"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="receivableInfos[0].Ccy"
            label="币种">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currentPage"
        :page-sizes="pages.pageSizes"
        :page-size="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { historicaltransaction } from "@/util/api";

export default {
  name: "historyInfo",
  data(){
    return {
      historyForm:{
        id_no:"",
        apply_no:"",
        startTime:"",
        endTime:""
      },
      tableData:"",
      pages:{
        pageSize:10,
        pageSizes:[5,10,20,30,50],
        currentPage:1,
        total:10
      },
      loading:true

    }
  },
  methods:{
    onSubmit(){
      const data = {

      }
      this.getDecryptHistoricaltransaction(data);
    },
    getDecryptHistoricaltransaction(data){
      const that = this;
      this.loading = true;
      historicaltransaction(data).then(response => {
        that.loading = false;
        console.log(response)
        that.tableData = response.data;
      },error => {
        that.loading = false;
      })
    },
    /*toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },*/
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this.getDecryptHistoricaltransaction();
  },
  handleData(data){
    if(!data){
      return;
    }
  }

}
</script>

<style scoped>
 .top{
   padding: 10px;
   pading-top:25px;
 }
 .footer{
   margin-top: 5px;
 }

</style>
