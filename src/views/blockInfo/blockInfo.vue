/* * Copyright 2014-2020 the original author or authors. * * Licensed under the
Apache License, Version 2.0 (the "License"); * you may not use this file except
in compliance with the License. * You may obtain a copy of the License at * *
http://www.apache.org/licenses/LICENSE-2.0 * * Unless required by applicable law
or agreed to in writing, software * distributed under the License is distributed
on an "AS IS" BASIS, * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. * See the License for the specific language governing
permissions and * limitations under the License. */
<template>
  <div>
    <!-- <v-content-head
      :headTitle="$t('title.blockTitle')"
      :icon="true"
      @changGroup="changGroup"
    ></v-content-head> -->
    <div class="module-wrapper">
      <div class="search-part">
        <div class="search-part-left-bg">
          <!-- <span>{{ this.$t("text.total") }}</span>
          <span>{{ numberFormat(total, 0, ".", ",") }}</span>
          <span>{{ this.$t("text.tiao") }}</span> -->
        </div>
        <div class="search-part-right">
          <el-input
            :placeholder="$t('placeholder.globalSearch')"
            v-model="searchKey.value"
            class="input-with-select"
            clearable
            @clear="clearText"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
      </div>
      <div class="search-table">
        <el-table
          :data="
            blockData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          class="block-table-content"
          v-loading="loading"
          ref="refTable"
        >
          <el-table-column
            prop="number"
            :label="$t('BlockHeight')"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span @click="link(scope.row)" class="link">
                {{ scope.row && scope.row["number"]|filterBlockHeight }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="blockHash"
            :label="$t('TransactionCount')"
            width="500"
            align="center"
          >
            <template slot-scope="scope">
              <span class="" @click="link(scope.row)">{{
                scope.row && scope.row["transactions"] |filterTransationcount
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="transaction"
            :label="$t('ConsensusNodeHash')"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template slot-scope="scope">
              <span class="" @click="link(scope.row)">
                <i
                  class="wbs-icon-copy font-12 copy-key"
                  @click="link(scope.row)"
                  :title="$t('text.copyHash')"
                ></i>
                {{ scope.row |filtersTransactionHash }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="timestamp"
            :label="$t('CreateTime')"
            width="280"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template slot-scope="scope">
              <span class="" @click="link(scope.row)">{{
                scope.row && scope.row["timestamp"] | filtersTimeStap
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="nav">
          <div class="pravPage" @click="prav">上一页</div>
          <div
            class="pages"
            v-for="(item, index) in conpages"
            :key="index"
            @click="getPageInfo(item)"
            :class="item === currentPage ? 'active' : ''"
          >
            {{ item }}
          </div>
          <div class="nextPage" @click="next">下一页</div>
        </div> -->
        <el-pagination
          class="page"
          style="text-aglin: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout=" sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import contentHead from "@/components/contentHead";
import { BlockByNumber, BlockNumber } from "@/util/api";
import router from "@/router";
import errcode from "@/util/errcode";
import { numberFormat } from "@/util/util";
export default {
  name: "blockInfo",
  components: {
    "v-content-head": contentHead,
  },
  data: function () {
    return {
      blockData: [],
      currentPage: 1,
      pageSize: 10,
      sum: 0,
      total: 0,
      loading: false,
      numberFormat: numberFormat,
      ticket: [],
      conpages: "",
      searchKey: {
        key: "",
        value: "",
      },
    };
  },
  mounted: function () {
    this.getList();
  },

  filters: {
    filterBlockHeight :(value)=> {
      return "Block"+parseInt(value,16);
    },
    // 格式化transationcount
    filterTransationcount:(value)=> {
      console.log('liunan',value)
      return value.length
    },
    // 格式化copyHash
    filtersTransactionHash:(item)=> {
  
      return   item.sealerList[eval(item.sealer).toString(16)];
    },
    // 格式化日期
    filtersTimeStap:(timestamp) => {
      const time = Number(timestamp);
      var date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":";
      var m =
        (date.getMinutes() < 10
          ? "0" + date.getMinutes()
          : date.getMinutes()) + ":";
      var s =
        date.getSeconds() < 10
          ? "0" + date.getSeconds()
          : date.getSeconds();
      return Y + M + D + h + m + s;

    }
  },

  methods: {
    getList() {
      const seft = this;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber_all",
        params: [1, "0x6", true],
        id: 1,
      };
      BlockByNumber(data).then((res) => {
        console.log(res.data.blocks, "111");
        const arr = res.data.blocks;
        for (var i = 0; i < arr.length; i++) {
          if (arr) {
      
            
           

          }
        }
        seft.blockData = arr;
        seft.total = seft.blockData.length;
        seft.ticket = seft.blockData;
        seft.blockData.reverse();
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    link: function (val) {
      router.push({
        path: "/transactionInfo",
        query: {
          list: val,
        },
      });
    },


      // 搜索框清除键逻辑
      clearText(){
            this.blockData = []
        },

        // 搜索按钮逻辑
        search() {
            let searchKey = this.searchKey.value
            var arr = Number(searchKey).toString(16);
            var sum = "0x" + arr;
            var data = {
                jsonrpc: "2.0",
                method: "getBlockByNumber",
                params: [1, sum, true],
                id: 1,
            };

            // 网络请求搜索数据
            BlockByNumber(data).then((res) => {
              this.blockData = []
              this.blockData = [res.data.result]
            })
        },

    // compare(property) {
    //   return function (a, b) {
    //     var value1 = a[property];
    //     var value2 = b[property];
    //     return value2 - value1;
    //   };
    // },
    // // console.log(arr.sort(compare('age')))
    // // 获取当前页的数据信息
    // getPageInfo(item) {
    //   this.currentPage = item; //当前页
    //   var list = (this.currentPage - 1) * this.pageSize; //每去一组数据的第一个索引
    //   this.blockData = this.ticket.slice(list, list + this.pageSize); //从总数据中取出每页的数据
    // },
    // next() {
    //   if (this.currentPage < this.conpages) {
    //     this.currentPage++;
    //     this.getPageInfo(this.currentPage);
    //   }
    // },
    // prav() {
    //   if (this.currentPage != 1) {
    //     this.currentPage--;
    //     this.getPageInfo(this.currentPage);
    //   }
    // },
    // // 区块数量
    // async getBlockNumber() {
    //   var data = {
    //     jsonrpc: "2.0",
    //     method: "getBlockNumber",
    //     params: [1],
    //     id: 1,
    //   };
    //   var info = await BlockNumber(data).then((res) => {
    //     const { data, status } = res;
    //     this.sum = parseInt(data.result, 16);
    //   });

    //   return info;
    // },
    // // changGroup(val) {
    // //   this.getBlockList();
    // // },
    // search: function () {
    //   if (
    //     this.searchKey.key == "pkHash" &&
    //     this.searchKey.value.length != 66 &&
    //     this.searchKey.value
    //   ) {
    //     this.$message({
    //       message: this.$t("text.blockSearchMsg"),
    //       type: "error",
    //       duration: 2000,
    //     });
    //   } else {
    //     this.currentPage = 1;
    //     this.getBlockList();
    //   }
    // },
    // getBlockList: function () {
    //   this.loading = true;
    //   let groupId = localStorage.getItem("groupId");
    //   let reqData = {
    //       groupId: groupId,
    //       pageNumber: this.currentPage,
    //       pageSize: this.pageSize,
    //     },
    //     reqQuery = {};
    //   if (this.$route.query.blockNumber) {
    //     this.searchKey.key = "blockNumber";
    //     this.searchKey.value = this.$route.query.blockNumber;
    //   }
    //   if (this.searchKey.value) {
    //     if (this.searchKey.value.length === 66) {
    //       reqQuery.pkHash = this.searchKey.value;
    //     } else {
    //       reqQuery.blockNumber = this.searchKey.value;
    //     }
    //   }
    // getBlockPage(reqData, reqQuery)
    //   .then((res) => {
    //     this.loading = false;
    //     if (res.data.code === 0) {
    //       this.blockData = res.data.data;
    //       this.total = res.data.totalCount;
    //     } else {
    //       this.$message({
    //         message: this.$chooseLang(res.data.code),
    //         type: "error",
    //         duration: 2000,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //     this.$message({
    //       message: err.data || this.$t("text.systemError"),
    //       type: "error",
    //       duration: 2000,
    //     });
    //   });
  },
  // handleSizeChange(size) {
  //   //修改当前每页的数据行数
  //   this.pagesize = size;
  //   //数据重新分页
  //   this.getPageInfo();
  // },
  // //调整当前的页码
  // handleCurrentChange() {
  //   if (this.currentPage < this.conpages) {
  //     this.currentPage++;
  //     this.getPageInfo(this.currentPage);
  //   }
  // },

  // handleSizeChange: function (val) {
  //   this.pageSize = val;
  //   this.currentPage = 1;
  //   this.getBlockList();
  // },
  // handleCurrentChange: function (val) {
  //   if(this.currentPage<this.blockData.length){
  //         this.currentPage++
  //         this.getPageInfo(this.currentPage)
  //       }
  //   // console.log(val,'111')
  //   // this.currentPage = val;
  //   // this.getList();
  // },

  // clickTable: function (row, column, $event) {
  //   console.log(row,'222')
  //   let nodeName = $event.target.nodeName;
  //   if (nodeName === "I") {
  //     return;
  //   }
  //   this.link(row.blockNumber);
  // },
};
</script>
<style scoped>
.search-part {
  padding: 30px 0px;
  overflow: hidden;
  margin: 0;
}
.input-with-select {
  width: 610px;
}
.input-with-select >>> .el-input__inner {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px solid #eaedf3;
  box-shadow: 0 3px 11px 0 rgba(159, 166, 189, 0.11);
}
.input-with-select >>> .el-input--suffix > .el-input__inner {
  box-shadow: none;
}
.input-with-select >>> .el-input-group__prepend {
  border-left-color: #fff;
}
.input-with-select >>> .el-input-group__append {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 3px 11px 0 rgba(159, 166, 189, 0.11);
}
.input-with-select >>> .el-button {
  border: 1px solid #20d4d9;
  border-radius: inherit;
  background: #20d4d9;
  color: #fff;
}
.block-table-content {
  width: 100%;
  padding-bottom: 16px;
  font-size: 12px;
}
.block-table-content >>> .el-table__row {
  cursor: pointer;
}
.nav {
  width: 550px;
  height: 30px;
  background-color: pink;
  display: flex;
  align-items: center;
}
div[class$="Page"] {
  width: 80px;
  height: 25px;
  text-align: center;
  color: black;
  line-height: 25px;
  background-color: coral;
  margin: 0 5px;
}
div[class="pages"] {
  width: 25px;
  height: 25px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0 5px;
  background-color: rgb(236, 235, 235);
  text-align: center;
  line-height: 25px;
}
.active {
  width: 25px;
  height: 25px;
  border: 1px solid #8f8f8f;
  border-radius: 5px;
  margin: 0 5px;
  background-color: rgb(247, 113, 23);
  text-align: center;
  line-height: 25px;
  color: #fff;
}
.nav div:hover {
  cursor: pointer;
}
.box {
  width: 550px;
  height: 200px;
  border: 1px solid #eee;
  background-color: #f5f5f5;
}
</style>
