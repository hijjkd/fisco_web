<template>
  <div>
    <div class="top">
      <el-form ref="enterPoolForm" :model="enterPoolForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="供应商编号" label-width="130px">
              <el-input v-model="enterPoolForm.customerId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核心企业证件号" label-width="130px">
              <el-input v-model="enterPoolForm.interCustomerId" clearable></el-input>
            </el-form-item>
          </el-col>
         
          <el-col :span="5">
            <el-form-item label="拥有方" label-width="70px">
              <el-select v-model="enterPoolForm.owner" >
                <el-option
                  v-for="owner in enterPoolFormSelect.owners"
                  :key="owner.lable"
                  :label="owner.lable"
                  :value="owner.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="币种" label-width="60px">
              <el-select v-model="enterPoolForm.ccy" >
                <el-option
                  v-for="ccy in enterPoolFormSelect.ccys"
                  :key="ccy.lable"
                  :label="ccy.lable"
                  :value="ccy.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

  
          <el-col :span="6">
            <el-form-item label="数据时点" label-width="130px">
              <el-input v-model="enterPoolForm.dateTimePoint" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开始时间" label-width="130px">
              <el-date-picker v-model="enterPoolForm.startTime" value-format="yyyy-MM" type="month" style="width: 100%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" label-width="130px">
              <el-date-picker v-model="enterPoolForm.endTime" value-format="yyyy-MM" type="month" style="width: 100%;"
                placeholder="选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display: block;text-align: left;padding-left: 15px;">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="default" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
        <el-row>
        </el-row>
      </el-form>
    </div>
    <div class="body" v-autoTableHeight="210">
      <el-table v-loading="loading" :data="tableData" height="100%" width="100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed align="center" width="75">
        </el-table-column>
        <el-table-column fixed prop="owner" label="拥有方" width="120">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row["owner"] | ownerChange }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dateTimePoint" label="数据时点" fixed width="100">
        </el-table-column>
        <el-table-column prop="ccy" label="币种" fixed width="110">
          <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row["ccy"] | moneyDecode }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="customerId" label="供应商编号">
        </el-table-column>
        <el-table-column prop="interCustomerId" label="核心企业证件号">
        </el-table-column>
        <el-table-column prop="receivableBalance" label="应收账款余额">
        </el-table-column>

        <el-table-column label="计划信息">
          <el-table-column prop="planInfos[0].tradeYearMonth" width="90" label="交易年月（当天）">
          </el-table-column>
          <el-table-column prop="planInfos[0].planAmount" width="90" label="生产计划金额">
          </el-table-column>
          <el-table-column prop="planInfos[0].currency" label="币种">
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.planInfos[0].currency | moneyDecode }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="入库信息">
          <el-table-column prop="providerUsedInfos[0].tradeYearMonth" width="90" label="交易年月（上月当天）">
          </el-table-column>
          <el-table-column prop="providerUsedInfos[0].usedAmount" width="90" label="结算金额">
          </el-table-column>
          <el-table-column prop="providerUsedInfos[0].currency" label="币种">
            <template slot-scope="scope">
              <!-- 使用过滤器处理数字 -->
              <span>{{ scope.row.providerUsedInfos[0].currency | moneyDecode }}</span>
            </template>
          </el-table-column>
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

import { EnterpoolDataInfos } from "@/util/api";

export default {
  name: "enterPoolInfo",
  data() {
    return {
      enterPoolForm: {
        customerId: "",//供应商编号
        interCustomerId:"",
        startTime: "",
        endTime: "",
        dateTimePoint:'',
        tradeYearMonth:"",
        ccy:"",
        owner:"",
        searchType:"",
        pageId:1
      },
      enterPoolFormSelect:{
        ccys:[
          {lable:'人民币',value:"10"},
          {lable:'澳门元',value:'19'},
          {lable:'港币',value:'21'},
          {lable:'俄罗斯卢布',value:'27'},
          {lable:'台湾元',value:'31'},
          {lable:'美元',value:'32'},
          {lable:'欧元',value:'35'},
          {lable:'加拿大元',value:'39'},
          {lable:'英镑',value:'43'},
          {lable:'日元',value:'65'},
          {lable:'新加坡元',value:'69'}],
        owners:[{lable:'保理',value:"1"},{lable:'银行',value:"0"}],
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
    /*
    搜索按钮
    */
    onSubmit() {
      if(this.enterPoolForm.startTime||this.enterPoolForm.endTime){
        this.enterPoolForm.tradeYearMonth = this.enterPoolForm.startTime + 'to' + this.enterPoolForm.endTime;
      }else{
        this.enterPoolForm.tradeYearMonth = ''
      }
      const data = this.enterPoolForm;
      data.pageId=1;
      this.getEnterpoolDataInfos(data);
    },


    /**
 * 重置按钮
 */
    resetForm(formName) {
      this.enterPoolForm = {
        customerId: "",//供应商编号
        interCustomerId:"",
        startTime: "",
        endTime: "",
        dateTimePoint:'',
        tradeYearMonth:"",
        ccy:"",
        owner:"",
        pageId:1
      };
      this.getEnterpoolDataInfos()
    },
    getEnterpoolDataInfos(data) {
      const that = this;
      this.loading = true;
      var dataTemp = this.enterPoolForm;
      if(data){
        dataTemp = data;
      }
      EnterpoolDataInfos(dataTemp).then(response => {
        that.loading = false;
        //console.log(response)
        that.tableData = response.data.enterpoolDataList;
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
      this.enterPoolForm.pageId = val;
      this.getEnterpoolDataInfos()
    }
  },
  mounted() {
    this.getEnterpoolDataInfos({});
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
