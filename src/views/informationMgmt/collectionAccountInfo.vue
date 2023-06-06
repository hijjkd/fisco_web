
<template>
  <div>
    <div class="top">
      <el-form ref="collectionAccountForm" :model="collectionAccountForm">
        <el-row>
          <el-col :span="9">
            <el-form-item label="供应商编号" label-width="89px">
              <el-input style="width: 95%;" v-model="collectionAccountForm.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="default" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="body" v-autoTableHeight="150">
      <el-table v-loading="loading" :data="tableData" height="100%" width="100%" stripe>
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
    <div class="footer">
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pages.currentPage" :page-sizes="pages.pageSizes" :page-size="pages.pageSize"
        layout="total, prev, pager, next, jumper" :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { CollectionAccountInfo } from "@/util/api";

export default {
  name: "collectionAccountInfo",
  data() {
    return {
      collectionAccountForm: {
        id: "",//供应商编号
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
    onSubmit() {
      const data = {
        'id': this.collectionAccountForm.id,
      }
      this.getCollectionAccountInfos(data);
    },
    /**
 * 重置按钮
 */
    resetForm(formName) {
      this.collectionAccountForm = {
        id: "",//供应商编号
      };
      this.getCollectionAccountInfos()
    },
    getCollectionAccountInfos(data) {
      const that = this;
      this.loading = true;
      CollectionAccountInfo(data).then(response => {
        that.loading = false;
        console.log(response)
        that.tableData = response.data.collectionAccountList;
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
        'id': this.collectionAccountForm.id,
        'pageid': val
      };
      this.getCollectionAccountInfos(data)
    }
  },
  mounted() {
    this.getCollectionAccountInfos();
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
