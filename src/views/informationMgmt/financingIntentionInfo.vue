<template>
  <div>
    <div class="top">
      <el-form ref="financingIntentionForm" :model="financingIntentionForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="供应商编号" label-width="89px">
              <el-input style="width: 95%;" v-model="financingIntentionForm.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资意向申请编号" label-width="135px">
              <el-input style="width: 95%;" v-model="financingIntentionForm.financeid" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="default" @click="resetForm">重置</el-button>
        </el-row>
        <el-row>

          <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;">

          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="body" v-autoTableHeight="140">
      <el-table v-loading="loading" :data="tableData" height="100%" width="100%">
        <el-table-column prop="CustcdLinkName" label="联系人">
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
    <div class="footer">
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pages.currentPage" :page-size="pages.pageSize" layout="total, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { FinancingIntentionInfo } from "@/util/api";
import '/static/css/base.css';

export default {
  name: "financingIntentionInfo",
  data() {
    return {
      financingIntentionForm: {
        id: "",//供应商编号
        financeid: "",//融资意向申请编号
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
        'id': this.financingIntentionForm.id,
        'financeid': this.financingIntentionForm.financeid,
      }
      this.getFinancingIntentionInfo(data);
    },

    /**
     * 重置按钮
     */
    resetForm(formName) {
      this.financingIntentionForm = {
        id: "",//供应商编号
        financeid: "",//融资意向申请编号
      };
      this.getFinancingIntentionInfo()
    },

    /**
     * 请求融资意向接口
     * @param {*} data 
     */
    getFinancingIntentionInfo(data) {
      const that = this;
      this.loading = true;
      FinancingIntentionInfo(data).then(response => {
        that.loading = false;
        console.log(response)
        that.tableData = response.data.financingIntentionList;
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
      const data = {
        'id': this.financingIntentionForm.id,
        'financeid': this.financingIntentionForm.financeid,
        'pageid': val
      };
      this.getFinancingIntentionInfo(data)
    }
  },
  mounted() {
    this.getFinancingIntentionInfo();
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
