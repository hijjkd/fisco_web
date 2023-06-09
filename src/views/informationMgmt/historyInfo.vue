<template>
  <div>
    <div class="top">
      <el-form ref="historyForm" :model="historyForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="供应商编号" label-width="130px">
              <el-input v-model="historyForm.customerId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商证件号" label-width="130px">
              <el-input v-model="historyForm.certificateId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商名称" label-width="130px">
              <el-input v-model="historyForm.corpName" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="核心企业证件号" label-width="130px">
              <el-input v-model="historyForm.interCustomerId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="融资意向申请编号" label-width="130px">
              <el-input v-model="historyForm.financeId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拥有方" label-width="130px">
              <el-select v-model="historyForm.owner" placeholder="拥有方" style="width: 100%">
                <el-option v-for="(item, index) in ownerCategory" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间" label-width="130px">
              <el-date-picker v-model="historyForm.startTime" value-format="yyyy-MM" type="month" style="width: 100%"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" label-width="130px">
              <el-date-picker v-model="historyForm.endTime" value-format="yyyy-MM" type="month" style="width: 100%"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="130px">
              <el-button type="primary" @click="onSubmit">搜索</el-button>
              <el-button type="default" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="body" v-autoTableHeight="255">
      <el-table v-loading="loading" :data="tableData" height="100%" width="100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed align="center" width="75">
        </el-table-column>
        <el-table-column prop="customerGrade" label="供应商评级" fixed width="100">
        </el-table-column>
        <el-table-column prop="certificateType" label="供应商证件类型" fixed width="110">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row["certificateType"] | certificateTypeChange }}</span>
            </template>
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
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.usedInfos[0].ccy | moneyDecode }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="结算信息">
          <el-table-column prop="settleInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="settleInfos[0].settleAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="settleInfos[0].ccy" label="币种">
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.settleInfos[0].ccy | moneyDecode }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="订单信息">
          <el-table-column prop="orderInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="orderInfos[0].orderAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="orderInfos[0].ccy" label="币种">
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.orderInfos[0].ccy | moneyDecode }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="应收账款信息">
          <el-table-column prop="receivableInfos[0].tradeYearMonth" width="90" label="交易年月">
          </el-table-column>
          <el-table-column prop="receivableInfos[0].receivableAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="receivableInfos[0].ccy" label="币种">
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.receivableInfos[0].ccy | moneyDecode }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="owner" label="拥有方" fixed width="100">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row["owner"]| ownerChange }}</span>
            </template>
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
        customerId: "",//供应商编号
        certificateId: "",//供应商证件号码
        corpName: "",//供应商名称

        interCustomerId: "",//核心企业证件号
        financeId: "",//融资意向申请编号
        owner: "",//拥有方
        tradeYearMonth: "",//
        startTime: "",
        endTime: "",
        pageId: 1
      },
      tableData: [],
      pages: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      ownerCategory: [
        { label: "保理", value: "1" },
        { label: "银行", value: "0" }
      ],
      loading: true

    }
  },
  methods: {
    /**
     * 搜索按钮
     */
    onSubmit() {
      // const data = {
      //   'id': this.historyForm.id_no,
      //   'financeid': this.historyForm.apply_no,
      //   'certificateId': this.historyForm.certificateId,//供应商证件号码
      //   'corpName':this.historyForm.corpName,//供应商名称
      //   'interCustomerId':this.historyForm.interCustomerId,//核心企业证件号
      //   'apply_no': this.historyForm.apply_no,//融资意向申请编号
      //   'owner': this.historyForm.owner,//拥有方
      //   'tradeyearmonth': this.historyForm.startTime + 'to' + this.historyForm.endTime,
      // }
      if (this.historyForm.startTime || this.historyForm.endTime) {
        this.historyForm.tradeYearMonth = this.historyForm.startTime + 'to' + this.historyForm.endTime;
      } else {
        this.historyForm.tradeYearMonth = ""
      }
      const data = this.historyForm;
      data.pageId = 1; //fix 有搜索结果点击页码时，按钮时pageId不变
      this.getDecryptHistoricaltransaction(data);
    },

    /**
     * 重置按钮
     */
    resetForm(formName) {
      this.historyForm = {
        customerId: "",//供应商编号
        certificateId: "",//供应商证件号码
        corpName: "",//供应商名称

        interCustomerId: "",//核心企业证件号
        financeId: "",//融资意向申请编号
        owner: "",//拥有方

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
      this.historyForm.pageId = val;
      const data = this.historyForm;
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
