/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '@/util/util'

const main = resolve => require(['@/views/index/main'], resolve);
const home = resolve => require(['@/views/home/home'], resolve);
const group = resolve => require(['@/views/group'], resolve);
const transactionInfo = resolve => require(['@/views/transactionInfo/transactionInfo'], resolve);
const blockInfo = resolve => require(['@/views/blockInfo/blockInfo'], resolve);
const collectionAccountInfo = resolve => require(['@/views/informationMgmt/collectionAccountInfo'], resolve);
const financingIntentionInfo = resolve => require(['@/views/informationMgmt/financingIntentionInfo'], resolve);
const invoiceInfo = resolve => require(['@/views/informationMgmt/invoiceInfo'], resolve);


Vue.use(Router);
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    nameKey: "login",
    name: 'login',
    component: resolve => require(['@/views/login/login'], resolve),
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/home',
    leaf: true,
    menuShow: true,
    iconCls: 'wbs-icon-gailan sidebar-icon',
    component: main,
    children: [
      {
        path: '/home', component: home, name: '数据概览', enName: 'statistics', menuShow: true, meta: { requireAuth: false }
      }
    ]
  },
  {
    path: '/',
    component: main,
    name: '节点管理',
    enName: 'nodeManagement',
    leaf: true,
    menuShow: true,
    iconCls: 'wbs-icon-group sidebar-icon',
    children: [
      { path: '/group', component: group, name: '节点管理', enName: 'nodeManagement', menuShow: true, meta: { requireAuth: false } },
    ]
  },
  {
    path: '/',
    component: main,
    name: '区块概览',
    enName: 'contractManagement',
    menuShow: true,
    iconCls: 'wbs-icon-heyueguanli sidebar-icon',
    children: [

      {
        path: '/transactionInfo',
        component: transactionInfo,
        name: 'transactionInfo',
        enName: 'transactionInfo',
        nameKey: "transactionInfo",
        menuShow: false,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/blockInfo',
        component: blockInfo,
        name: 'blockInfo',
        enName: 'blockInfo',
        nameKey: "blockInfo",
        menuShow: true,
        meta: {
          requireAuth: true
        }
      },
    ]
  },
  {
    path: '/',
    component: main,
    name: '信息管理',
    enName: 'informationMgmt',
    menuShow: true,
    iconCls: 'wbs-icon-baocun sidebar-icon',
    children: [

      // {
      //   path: '/collectionAccountInfo',
      //   component: collectionAccountInfo,
      //   name: 'collectionAccountInfo',
      //   enName: 'collectionAccountInfo',
      //   nameKey: "collectionAccountInfo",
      //   menuShow: true,
      //   meta: {
      //     requireAuth: true
      //   }
      // },
      // {
      //   path: '/financingIntentionInfo',
      //   component: financingIntentionInfo,
      //   name: 'financingIntentionInfo',
      //   enName: 'financingIntentionInfo',
      //   nameKey: "financingIntentionInfo",
      //   menuShow: true,
      //   meta: {
      //     requireAuth: true
      //   }

      // },
      {
        path: '/invoiceInfo',
        component: invoiceInfo,
        name: 'invoiceInfo',
        enName: 'invoiceInfo',
        nameKey: "invoiceInfo",
        menuShow: true,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/historyInfo',
        component: (resolve) => require(['@/views/informationMgmt/historyInfo'], resolve),
        name: 'historyInfo',
        enName: 'historyInfo',
        nameKey: "historyInfo",
        menuShow: true,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/enterPoolInfo',
        component: (resolve) => require(['@/views/informationMgmt/enterPoolInfo'], resolve),
        name: 'enterPoolInfo',
        enName: 'enterPoolInfo',
        nameKey: "enterPoolInfo",
        menuShow: true,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: main,
  //   name: '文件管理',
  //   enName: 'filesMgmt',
  //   menuShow: true,
  //   iconCls: 'wbs-icon-wenjianxuanzhong sidebar-icon',
  //   children: [
  //     {
  //       path: '/filesInfo',
  //       component: (resolve) => require(['@/views/filesMgmt/filesInfo'], resolve),
  //       name: 'filesInfo',
  //       enName: 'filesInfo',
  //       nameKey: "filesInfo",
  //       menuShow: true,
  //       meta: {
  //         requireAuth: true
  //       }
  //     }
  //   ]
  // },

  // {
  //     path: '/',
  //     component: main,
  //     name: '系统监控',
  //     enName: 'systemMonitoring',
  //     menuShow: true,
  //     iconCls: 'wbs-icon-monitor sidebar-icon',
  //     children: [
  //         { path: '/hostMetric', component: hostMetric, name: '主机指标', enName: 'hostMetrics', menuShow: true, meta: { requireAuth: false } },
  //         { path: '/nodesMetric', component: nodesMetric, name: '节点指标', enName: 'nodeMetrics', menuShow: true, meta: { requireAuth: false } },
  //     ]
  // },
  // {
  //     path: '/',
  //     component: main,
  //     name: '订阅事件',
  //     enName: 'subscribeEvent',
  //     menuShow: true,
  //     iconCls: 'wbs-icon-dingyue sidebar-icon',
  //     children: [
  //         { path: '/blockEvent', component: blockEvent, name: '出块事件', enName: 'blockEvent', menuShow: true, meta: { requireAuth: false } },
  //         { path: '/contractEvent', component: contractEvent, name: '合约Event事件', enName: 'contractEvent', menuShow: true, meta: { requireAuth: false } }
  //     ]
  // },
  // {
  //     path: '/',
  //     component: main,
  //     name: '订阅事件',
  //     enName: 'subscribeEvent',
  //     menuShow: false,
  //     iconCls: 'wbs-icon-dingyue sidebar-icon',
  //     children: [
  //         { path: '/blank', component: blank, name: '出块事件', enName: 'blank', menuShow: true, meta: { requireAuth: false } },

  //     ]
  // },

]
const router = new Router({
  mode: "history",
  routes
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
