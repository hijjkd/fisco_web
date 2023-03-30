<template>
  <div>
    <div class="top">
      <el-form ref="enterPoolForm" :model="enterPoolForm" >
        <el-row>
          <el-col :span="8" >
            <el-form-item label="供应商编号" label-width="89px">
              <el-input style="width: 95%;" v-model="enterPoolForm.id_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="融资意向申请编号" label-width="135px">
              <el-input style="width: 95%;" v-model="enterPoolForm.apply_no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" >
            <el-form-item label="开始时间" label-width="89px">
              <el-date-picker
                v-model="enterPoolForm.startTime"
                type="month"
                style="width: 95%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="结束时间" label-width="89px">
              <el-date-picker
                v-model="enterPoolForm.endTime"
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
          prop="dateTimePoint"
          label="数据时点"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="ccy"
          label="币种" fixed width="110">
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="供应商编号">
        </el-table-column>
        <el-table-column
          prop="interCustomerId"
          label="核心企业证件号">
        </el-table-column>
        <el-table-column
          prop="receivableBalance"
          label="应收账款余额">
        </el-table-column>
    
        <el-table-column label="计划信息">
          <el-table-column
            prop="planInfos[0].TradeYearMonth"
            width="90"
            label="交易年月（当天）">
          </el-table-column>
          <el-table-column
           prop="planInfos[0].PlanAmount"
            width="90"
            label="生产计划金额">
          </el-table-column>
          <el-table-column
            prop="planInfos[0].Currency"
            label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="入库信息">
          <el-table-column
            prop="ProviderUsedInfos[0].TradeYearMonth"
            width="90"
            label="交易年月（上月当天）">
          </el-table-column>
          <el-table-column
            prop="ProviderUsedInfos[0].UsedAmount"
            width="90"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="ProviderUsedInfos[0].Currency"
            label="币种">
          </el-table-column>
        </el-table-column>
   
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currentPage"
        :page-sizes="pages.pageSizes"
        :page-size="pages.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { EnterpoolDataInfos } from "@/util/api";

export default {
  name: "enterPoolInfo",
  data(){
    return {
      enterPoolForm:{
        id_no:"",
        apply_no:"",
        startTime:"",
        endTime:""
      },
      tableData:[],
      pages:{
        pageSize:10,
        currentPage:1,
        total:0
      },
      loading:true

    }
  },
  methods:{
    onSubmit(){
      const data = {

      }
      this.getEnterpoolDataInfos(data);
    },
    getEnterpoolDataInfos(data){
      const that = this;
      this.loading = true;
      EnterpoolDataInfos(data).then(response => {
        that.loading = false;
        console.log(response)
        that.tableData = response.data.enterpoolDataList;
        that.pages.total= response.data.totalcount;
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
    this.getEnterpoolDataInfos();
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
   padding-top:25px;
 }
 .footer{
   margin-top: 5px;
 }

</style>
