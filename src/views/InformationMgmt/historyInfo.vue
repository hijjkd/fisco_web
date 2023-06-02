<template>
  <div>
    <div class="top">
      <el-form ref="historyForm" :model="historyForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="供应商编号" label-width="89px">
              <el-input style="width: 95%;" v-model="historyForm.id_no" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资意向申请编号" label-width="135px">
              <el-input style="width: 95%;" v-model="historyForm.apply_no" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开始时间" label-width="89px">
              <el-date-picker v-model="historyForm.startTime" value-format="yyyy-MM" type="month" style="width: 95%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间" label-width="89px">
              <el-date-picker v-model="historyForm.endTime" value-format="yyyy-MM" type="month" style="width: 95%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="default" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="body" v-autoTableHeight="190">
      <el-table v-loading="loading" :data="tableData" height="100%" width="100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed align="center" width="75">
        </el-table-column>
        <el-table-column prop="customerGrade" label="供应商评级" fixed width="100">
        </el-table-column>
        <el-table-column prop="certificateType" label="供应商证件类型" fixed width="110">
        </el-table-column>
        <el-table-column prop="interCustomerId" label="核心企业证件号">
        </el-table-column>
        <el-table-column prop="corpName" label="供应商名称">
        </el-table-column>
        <el-table-column prop="financeId" label="融资意向申请编号">
        </el-table-column>
        <el-table-column prop="certificateId" label="供应商证件号码">
        </el-table-column>
        <el-table-column prop="customerId" label="供应商编号">
        </el-table-column>
        <el-table-column label="入库信息">
          <el-table-column prop="usedInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="usedInfos[0].usedAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="usedInfos[0].ccy" label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="结算信息">
          <el-table-column prop="settleInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="settleInfos[0].settleAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="settleInfos[0].ccy" label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="订单信息">
          <el-table-column prop="orderInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="orderInfos[0].orderAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="orderInfos[0].ccy" label="币种">
          </el-table-column>
        </el-table-column>
        <el-table-column label="应收账款信息">
          <el-table-column prop="receivableInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="receivableInfos[0].receivableAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="receivableInfos[0].ccy" label="币种">
          </el-table-column>
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

<script>

import { historicaltransaction } from "@/util/api";
import '/static/css/base.css';

export default {
  name: "historyInfo",
  data() {
    return {
      historyForm: {
        id_no: "",//供应商编号
        apply_no: "",//融资意向申请编号
        startTime: "",
        endTime: ""
      },
      tableData: [],
      pages: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      loading: true

    }
  },
  methods: {
    /**
     * 搜索按钮
     */
    onSubmit() {
      const data = {
        'id': this.historyForm.id_no,
        'financeid': this.historyForm.apply_no,
        'tradeyearmonth': this.historyForm.startTime + 'to' + this.historyForm.endTime,
      }
      this.getDecryptHistoricaltransaction(data);
    },

    /**
     * 重置按钮
     */
    resetForm(formName) {
      this.historyForm = {
        id_no: "",//供应商编号
        apply_no: "",//融资意向申请编号
        startTime: "",
        endTime: ""
      };
      this.getDecryptHistoricaltransaction()
    },

    /**
     * 请求历史交易接口
     * @param {*} data 
     */
    getDecryptHistoricaltransaction(data) {
      console.debug('liunan')
      const that = this;
      this.loading = true;
      historicaltransaction(data).then(response => {
        that.loading = false;
        console.log(response)
        that.tableData = response.data.transactionHistoryList;
        that.pages.total = response.data.totalcount;
      }, error => {
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
      console.log(this.historyForm);
      const data = {
        'id': this.historyForm.id_no,
        'financeid': this.historyForm.apply_no,
        'tradeyearmonth': this.historyForm.startTime + 'to' + this.historyForm.endTime,
        'pageid': val
      };
      this.getDecryptHistoricaltransaction(data)
    }
  },
  mounted() {
    this.getDecryptHistoricaltransaction();
  },
  handleData(data) {
    if (!data) {
      return;
    }
  }

}
</script>

<style scoped>
.top {
  padding: 10px;
  padding-top: 25px;
}

.footer {
  margin-top: 5px;
}
</style>
