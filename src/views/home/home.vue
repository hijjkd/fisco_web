<template>
  <div class="over-view-wrapper qqqqq" v-autoTableHeight="180">
    <div style="margin: 0 20px 20px 0" >
      <el-row class="module-box-shadow">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number block-bg" @click="handleLink">
            <div class="part1-content-amount">
              <img :src="blockImg" alt="" />
            </div>
            <div class="part2-content-amount">
              <span class="font-28 part2-content-amount-number">{{
                blockList.sum
              }}</span
              ><br />
              <span class="font-14">{{ this.$t("project.blocks") }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number node-bg" @click="handleNode">
            <div class="part1-content-amount">
              <img :src="nodesImg" alt="" />
            </div>
            <div class="part2-content-amount" >
              <span class="font-28 part2-content-amount-number">{{
                nodeList.sum
              }}</span>
              <span class="font-14">{{ this.$t("project.nodes") }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number transation-bg" @click="handleLink">
            <div class="part1-content-amount">
              <img :src="transationImg" alt="" />
            </div>
            <div class="part2-content-amount">
              <span class="font-28 part2-content-amount-number">{{
                dealList.sum
              }}</span>
              <span class="font-14">{{ this.$t("project.transactions") }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number transationPendding-bg" @click="handleLink">
            <div class="part1-content-amount">
              <img :src="transationPeddingImg" alt="" />
            </div>
            <div class="part2-content-amount">
              <span class="font-28 part2-content-amount-number">{{
                TxSize.sum
              }}</span>
              <span class="font-14">{{
                this.$t("project.pendingTransactions")
              }}</span>
            </div>
          </div>
        </el-col>
        <!-- <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number transationPendding-bg">
            <div class="part1-content-amount">
              <img :src="transationPeddingImg" alt="" />
            </div>
            <div class="part2-content-amount">
              <span class="font-28 part2-content-amount-number">{{
                numberFormat(overviewPendingTxNumber, 0, ".", ",")
              }}</span>
              <span class="font-14">{{
                this.$t("project.pendingTransactions")
              }}</span>
            </div>
          </div>
        </el-col> -->
        <!-- <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="overview-number transationPendding-bg">
            <div class="part1-content-amount">
              <img :src="transationPeddingImg" alt="" />
            </div>
            <div class="part2-content-amount">
              <span class="font-28 part2-content-amount-number">{{
                numberFormat(overviewPendingTxNumber, 0, ".", ",")
              }}</span>
              <span class="font-14">{{
                this.$t("project.pendingTransactions")
              }}</span>
            </div>
          </div>
        </el-col> -->
      </el-row>
    </div>
    <div class="module-wrapper-small" style="padding: 30px 31px 26px 32px" >
      <el-input
        :placeholder="$t('placeholder.globalSearch')"
        v-model.trim="keyword"
        @keyup.enter.native="search"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          v-loading="searchLoading"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <!-- <div
      class="module-wrapper-small"
      style="padding: 30px 31px 26px 32px"
      v-show="blockData.length > 0"
      v-loading="loadingBlock"
    >
      <json-viewer :value="searchMap" :expand-depth="2" copyable> </json-viewer>
    </div> -->
    <!-- <div
      class="module-wrapper-small"
      style="padding: 30px 31px 26px 32px"
      v-show="transactionList.length > 0"
      v-loading="loadingTransaction"
    >
      <el-table
        :data="transactionList"
        class="block-table-content"
        @row-click="clickTable"
        ref="refTable"
      >
        <el-table-column type="expand" align="center">
          <template slot-scope="scope">
            <v-transaction-detail
              :transHash="scope.row.transHash"
            ></v-transaction-detail>
          </template>
        </el-table-column>
        <el-table-column
          prop="transHash"
          :label="$t('table.transactionHash')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>
              <i
                class="wbs-icon-copy font-12 copy-key"
                @click="copyPubilcKey(scope.row['transHash'])"
                :title="$t('title.copyHash')"
              ></i>
              {{ scope.row["transHash"] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="blockNumber"
          :label="$t('table.blockHeight')"
          width="260"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row["blockNumber"] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <!-- <div
      class="module-wrapper-small"
      style="padding: 30px 31px 26px 32px; display: none"
    >
      <el-table
        :data="nodeData"
        class="search-table-content"
        v-loading="loadingNodes"
      >
        <el-table-column
          v-for="head in nodeHead"
          :label="head.name"
          :key="head.enName"
          show-overflow-tooltip
          align=""
        >
          <template slot-scope="scope">
            <template>
              <span v-if="head.enName === 'nodeActive'">
                <i
                  :style="{ color: textColor(scope.row[head.enName]) }"
                  class="wbs-icon-radio font-6"
                ></i>
                {{ nodesStatus(scope.row[head.enName]) }}
              </span>
              <span v-else-if="head.enName === 'nodeIp'">
                <router-link
                  :to="{
                    path: 'hostDetail',
                    query: {
                      nodeIp: scope.row['nodeIp'],
                      nodeId: scope.row['nodeId'],
                    },
                  }"
                  class="node-ip"
                  >{{ scope.row[head.enName] }}</router-link
                >
              </span>
              <span v-else>{{ scope.row[head.enName] }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <div style="min-width: 540px; margin: 8px 8px 0px 9px"  v-autoTableHeight="295">
      <el-row :gutter="16" style="height: 100%;overflow-y: auto" >
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="overview-wrapper">
            <p>
              <span class="overview-title">区块</span>
              <span
                class="overview-more cursor-pointer"
                @click="goRouter('blocks')"
                >更多</span
              >
            </p>
            <div class="overview-item-base" v-loading="loadingBlock">
              <div
                class="block-item font-color-2e384d"
                v-for="(item, index) in blockData"
                :key="index"
              >
                <div class="block-amount">
                  <span>
                    <!-- <router-link
                      :to="{
                        path: 'transactionInfo',
                        query: { transactions: item.transactions },
                      }"
                      class="node-ip"
                      >块高 {{ item.number }}</router-link
                    > -->
                    <div class="node-ip"  @click="link(item)">
                      Block {{ item.number |blockNumber}}
                    </div>

                  </span>
                  <span class="font-color-8798ad">{{ item.timestamp |formateDate }}</span>
                </div>
                <div>
                  <div class="block-miner">
                    <span>Blocker</span>
                    <p :title="`${item.sealer}`">{{ item | formateBlocker }}</p>
                  </div>
                  <!-- <div class="text-right">
                                        <span>{{item.transCount}}</span>
                                        <span>txns</span>
                                    </div> -->
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="overview-wrapper">
            <p>
              <span class="overview-title">交易</span>
              <span
                class="overview-more cursor-pointer"
                @click="goRouter('transactions')"
                >更多</span
              >
            </p>
            <div class="overview-item-base" v-loading="loadingTransaction">
              <div
                class="block-item font-color-2e384d"
                v-for="(item, index) in transactionList"
                :key="index"
              >
                <div class="block-amount">
                  <p class="trans-hash" :title="`${item.timestamp}`">
                    <router-link
                      :to="{
                        path: 'transactionInfo',
                        query: { transactionHash: item.transactionHash },
                      }"
                      class="node-ip"
                      >{{ item.transactionHash }}</router-link
                    >
                  </p>
                  <span class="font-color-8798ad">{{ item.timestamp }}</span>
                </div>
                <div>
                  {{ item.blockNumber }}
                </div>
              </div>
            </div>
          </div>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import contentHead from "@/components/contentHead";
import transactionDetail from "@/components/transactionDetail";
import charts from "./components/chart";
import {
  queryHomeSearch,
  BlockNumber,
  NodeNumber,
  DealNumber,
  TxSizeNumber,
  BlockByNumber,
  BlockByNumber2,
  BlockByNumber3,
  BlockByNumber4,
  BlockByNumber5,
  BlockByNumber6,
  hashList,
} from "@/util/api";
import { changWeek, numberFormat, format } from "@/util/util";
// import { sync } from "@/util/promise";
import router from "@/router";
import block_img from "@/../static/image/block.png";
import nodes_img from "@/../static/image/nodes.png";
import transation_img from "@/../static/image/transation.png";
import transationPedding_img from "@/../static/image/transationPedding.png";
import Bus from "@/bus";

export default {
  name: "home",
  components: {
    "v-content-head": contentHead,
    "v-chart": charts,
    "v-transaction-detail": transactionDetail,
  },
  data: function () {
    return {
      blockList: {
        sum: 0,
      },
      nodeList: {
        sum: 0,
      },
      dealList: {
        sum: 0,
      },
      TxSize: {
        sum: 0,
      },
      blockImg: block_img,
      nodesImg: nodes_img,
      transationImg: transation_img,
      transationPeddingImg: transationPedding_img,
      loadingNumber: false,
      loadingCharts: false,
      loadingNodes: false,
      loadingBlock: false,
      loadingTransaction: false,
      searchLoading: false,
      numberFormat: numberFormat,
      format: format,
      detailsList: [
        {
          label: "节点个数",
          name: "nodeCount",
          value: 0,
          color: "#8693f3",
        },
        {
          label: "合约块高",
          name: "contractCount",
          value: 0,
          color: "#bc8dee",
        },
        {
          label: "BlockNumber",
          name: "latestBlock",
          value: 0,
          color: "#ffa897",
        },
        {
          label: "交易数量",
          name: "transactionCount",
          value: 0,
          color: "#89c3f8",
        },
      ],
      networkDetails: null,
      chartStatistics: {
        show: false,
        date: [],
        dataArr: [],
        chartSize: {
          width: 0,
          height: 0,
        },
      },
      reloadNumber: true,
      networkId: localStorage.getItem("networkId"),
      nodeHead: [
        {
          enName: "orgName",
          name: "机构名称",
        },
        {
          enName: "nodeName",
          name: "节点名称",
        },
        {
          enName: "blockNumber",
          name: "块高",
        },
        {
          enName: "pbftView",
          name: "pbftView",
        },
        {
          enName: "nodeIp",
          name: "ip",
        },
        {
          enName: "p2pPort",
          name: "p2p端口",
        },
        {
          enName: "rpcPort",
          name: "rpc端口",
        },
        {
          enName: "nodeActive",
          name: "状态",
        },
      ],
      nodeData: [],
      blockData: [],
      transactionList: [],
      keyword: "",
      reqQuery: {},
      getRowKeys: function (row) {
        return row.transHash;
      },
      overviewBlockNumber: "",
      overviewNodesNumber: "",
      overviewTxNumber: "",
      overviewPendingTxNumber: "",
      group: localStorage.getItem("groupId"),
      searchMap: {},
      hashList: [],
      getHash: [],
      adds:[],
      accs:""
    };
  },

  filters: {
    // 格式化区块编号
    blockNumber: (value) => {
      return parseInt(value, 16);
    },

    // 格式化区块时间
    formateDate: (value) => {
      const time = Number(value);
      var date = new Date(time);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

      return Y + M + D + h + m + s;
    },

    // 格式化blocker(sealer)
    formateBlocker: (item) => {
      return item.sealerList[eval(item.sealer).toString(16)]
    },
  },

  mounted: async function () {
    const self = this;

    await this.getBlockNumber();
    this.getNodeNumber();
    await this.getTotalTransactionCount();
    this.getPendingTxSize();
    //  this.getHomeSearch();

    this.$axios
      .all([
        this.getBlockByNumber2(),
        this.getBlockByNumber(),
        this.getBlockByNumber3(),
        this.getBlockByNumber4(),
        this.getBlockByNumber5(),
        this.getBlockByNumber6(),
      ])
      .then(
        this.$axios.spread(function (
          allList,
          allList2,
          allList3,
          allList4,
          allList5,
          allList6
        ) {
          const add = allList.data.result;
          const arr = allList2.data.result;
          const acc = allList3.data.result;
          const aee = allList4.data.result;
          const aff = allList5.data.result;
          const agg = allList6.data.result;
          self.blockData = [arr, add, acc, aee, aff, agg];
        })
      );
  },
  destroyed() {},
  methods: {
    handleLink(){

      router.push({
        path: "/blockInfo",

      });
    },
    handleNode(){

      router.push({
        path: "/group",

      });
    },
    link: function (val) {
      router.push({
        path: "/transactionInfo",
        query: {
          number: val.number,
        },
      });
    },
    //交易
   getHomeSearch() {
      for (var i = this.dealList.sum; i >= 0; i--) {
        const arr = i.toString(16);
        const sum = "0x" + arr;
        this.getList(sum);
      }
    },
    getList(val) {

      var data = {
        jsonrpc: "2.0",
        method: "getBatchReceiptsByBlockNumberAndRange",
        params: [1, val, "0", "-1", false],
        id: 1,
      };
      queryHomeSearch(data).then((res) => {

        if(res.data.result && res.data.result.transactionReceipts){

          const result = res.data.result.transactionReceipts.map(it=>it.transactionHash);
        this.hashList.push(...result);
        this.getHash = this.hashList.slice(0, 6);

         for (var i = 0; i <  this.getHash.length; i++) {
          var acc = this.getHash[i];
          this.getHashList(acc)
          this.adds.push( )
        }
        }
      });
    },

removeDuplicate(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        len-- // 减少循环次数提高性能
        j-- // 保证j的值自加后不变
      }
    }
  }
  return arr
},

  async getHashList(val) {

      var data = {
        jsonrpc: "2.0",
        method: "getTransactionReceipt",
        params: [1, val],
        id: 1,
      };
      const [err,res] = await sync(hashList(data))
      if(!err){
        // console.log(res,'res')
         return res.data.result.blockNumber

        this.adds.push(this.accs)

       console.log(this.adds,'this.adds')
      }
      // .then((res) => {

      //   const result = res.data.result;

      //   // result.blockNumber = parseInt(result.blockNumber, 16);
      //   // this.transactionList.push(result);

      //   // this.transactionList = this.transactionList.slice(0, 6);
      //   return  result.blockNumber
      // });
    },
    //区块
    getBlockByNumber() {
      var arr = this.blockList.sum.toString(16);
      var sum = "0x" + arr;

      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
        txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber(data);
    },
    // 区块2
    getBlockByNumber2() {
      var acc = this.blockList.sum - 1;
      var arr = acc.toString(16);
      var sum = "0x" + arr;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
         txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber2(data);
    },
    // 区块3
    getBlockByNumber3() {
      var acc = this.blockList.sum - 2;
      var arr = acc.toString(16);
      var sum = "0x" + arr;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
         txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber3(data);
    },
    //区块4
    getBlockByNumber4() {
      var acc = this.blockList.sum - 3;
      var arr = acc.toString(16);
      var sum = "0x" + arr;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
         txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber4(data);
    },
    //区块5
    getBlockByNumber5() {
      var acc = this.blockList.sum - 4;
      var arr = acc.toString(16);
      var sum = "0x" + arr;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
         txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber5(data);
    },
    //区块6
    getBlockByNumber6() {
      var acc = this.blockList.sum - 5;
      var arr = acc.toString(16);
      var sum = "0x" + arr;
      var data = {
        jsonrpc: "2.0",
        method: "getBlockByNumber",
        params: [1, sum, true],
        id: 1,
         txPageId:"1",blockPageId:"1"
      };
      return BlockByNumber6(data);
    },
    // 区块数量
    async getBlockNumber() {
      var data = {
        jsonrpc: "2.0",
        method: "getBlockNumber",
        params: [1],
        id: 1,
      };
      var info = await BlockNumber(data).then((res) => {
        const { data, status } = res;
        this.blockList.sum = parseInt(data.result, 16);
      });

      return info;
    },

    // 节点数量
    getNodeNumber: function () {
      var data = {
        jsonrpc: "2.0",
        method: "getGroupPeers",
        params: [1],
        id: 1,
      };
      NodeNumber(data).then((res) => {
        const { data, status } = res;
        this.nodeList.sum = data.result.length;
      });
    },

    //交易数量
    async getTotalTransactionCount() {
      var data = {
        jsonrpc: "2.0",
        method: "getTotalTransactionCount",
        params: [1],
        id: 1,
      };
      var info = await DealNumber(data).then((res) => {
        const { data, status } = res;

        this.dealList.sum = parseInt(data.result.txSum, 16);
      });

      return info;
    },
    //待交易数量

    getPendingTxSize: function () {
      var data = {
        jsonrpc: "2.0",
        method: "getPendingTxSize",
        params: [1],
        id: 1,
      };
      TxSizeNumber(data).then((res) => {
        const { data, status } = res;
        this.TxSize.sum = parseInt(data.result, 16);
      });
    },
    submit(){
      //
    },
    goRouter: function (val) {
      switch (val) {
        case "blocks":
          router.push("blockInfo");
          break;

        // case "transactions":
        //   router.push("transactionInfo");
        //   break;
      }
    },



        // 搜索按钮逻辑
        search() {

            let searchKey = this.keyword
            var arr = Number(searchKey).toString(16);
            var sum = "0x" + arr;
            var data = {
                jsonrpc: "2.0",
                method: "getBlockByNumber",
                params: [1, sum, true],
                id: 1,
                txPageId:"1",
                blockPageId:"1"
            };

            // 网络请求搜索数据
            BlockByNumber(data).then((res) => {
                // TODO 校验搜索框输入逻辑
                this.blockData = []
                this.blockData=[res.data.result]
            })
        },
  },
};
</script>
<style scoped>
.block-bg {
  background: linear-gradient(to top right, #47befa, #37eef2);
}
.node-bg {
  background: linear-gradient(to top right, #466dff, #30a7ff);
}
.transation-bg {
  background: linear-gradient(to top right, #736aff, #b287ff);
}
.transationPendding-bg {
  background: linear-gradient(to top right, #ff6e9a, #ffa895);
}
.over-view-wrapper {
  background: #20293c;
}
.amount-wrapper {
  margin: 30px 30px 0 31px;
}
.font-12 {
  font-size: 12px;
  color: #9da2ab;
}
.part1-content {
  display: flex;
  background: #20293c;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.overview-number {
  /* width: 23%; */
  /* max-width: 280px; */
  margin-top: 20px;
  margin-left: 20px;
  padding: 16px 6px;
  font-size: 0;
  color: #fff;
}
.part1-content-amount {
  display: inline-block;
  width: 41%;
  max-width: 114px;
  vertical-align: middle;
}
.part1-content-amount img {
  width: 100%;
  max-width: 114px;
}
.part2-content-amount {
  font-size: 14px;
  display: inline-block;
  width: 59%;
  max-width: 90px;
  vertical-align: middle;
}
.part2-content-amount-number {
  display: inline-block;
  width: 100%;
}
.part2-title {
  padding: 22px 31px 26px 32px;
}
.part2-title::after {
  display: block;
  content: "";
  clear: both;
}
.part2-title-left {
  float: left;
  font-size: 16px;
  color: #000e1f;
  font-weight: bold;
}
.part2-title-right {
  float: right;
  font-size: 12px;
  color: #727476;
  padding: 2px 12px;
  border-radius: 20px;
  background: #f6f6f6;
}
.part3-title {
  padding: 40px 60px 40px 40px;
}
.part3-title::after {
  display: block;
  content: "";
  clear: both;
}
.more-content {
  font-size: 14px;
  color: #2d5f9e;
  cursor: pointer;
}
.part3-table-content {
  width: 100%;
  padding: 0 39px 48px 40px;
  font-size: 12px;
}
.part3-table-content >>> th,
.part3-table-content >>> td {
  padding: 8px 0;
}
.part1-details-bottom {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.part1-details-arrow-right {
  position: relative;
  top: 4px;
}
.search-table-content {
  width: 100%;
}
.search-table-content >>> th {
  background: #fafafa;
  color: #00122c;
}
.search-table-content >>> th,
.search-table-content >>> td {
  font-size: 14px;
}
.overview-wrapper {
  background: #fff;
  font-size: 15px;
  box-shadow: 0 4px 12px 0 #dfe2e9;
  border-radius: 2px;
  min-height: 500px;
}
.overview-wrapper > p {
  padding: 26px 18px 0px 22px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
}
.overview-title {
  font-size: 15px;
  color: #2e384d;
  padding-bottom: 22px;
  border-bottom: 2px solid #2e384d;
}
.overview-more {
  font-size: 14px;
  color: #2fcdd1;
}
.block-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding-bottom: 10px;
}
.block-amount {
  display: flex;
  flex-flow: column;
}
.overview-item-base {
  margin: 26px 18px 30px 22px;
}
.block-miner {
  display: flex;
  flex-flow: row wrap;
}
.block-miner > p {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
}
.trans-hash {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.node-ip {
  color: #2fcdd1;
  cursor: pointer;
}
.block-table-content >>> .el-table__row {
  cursor: pointer;
}
</style>
