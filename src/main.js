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
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import login from './views/login/login'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import { getCookie, setCookie, delCookie } from './util/util'
import VueClipboard from 'vue-clipboard2'
import JsonViewer from 'vue-json-viewer'
import filters from './util/filter.js'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css'

/*iconfont*/
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import '@/assets/icon/iconfont_webaas.css'
import './svgIcons'
/*public css moudle */
import '@/assets/css/common.css'
import i18n from './lang' // internationalization
import { chooseLang } from "./util/errcode.js";
Vue.config.productionTip = false;
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60 * 1000;
Vue.use(router);
Vue.use(VueClipboard)
Vue.use(JsonViewer)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
});
ElementUI.Dialog.props.closeOnClickModal.default=false
import Loaded from './components/Loading'
Vue.use(Loaded)
import promise from 'es6-promise';
//compatible Promise
promise.polyfill();
//cookie function
Vue.prototype.getCookie = getCookie;
Vue.prototype.setCookie = setCookie;
Vue.prototype.delCookie = delCookie;



//对拥有方进行转换
Vue.filter('ownerChange', (value) => {
  switch (value) {
    case "00":
      return "银行";
    case "11":
      return "保理";
    default:
      return value
  }
}),

//对供应商证件类型进行转换
Vue.filter('certificateTypeChange', (value) => {
  switch(value)
  {
      case "C09":
          
          return "组织机构代码证";
      case "C35":
          return "统一社会信用代码证";
          
      default:
          return value
  }
}),


//对发票进行转换
Vue.filter('invoiceChange', (value) => {
  switch (value) {
    case "01":
      return "专票";
    case "02":
      return "普票";
    default:
      return value
  }

}),
//对币种进行转换
Vue.filter('moneyDecode',(value)=>{
  console.log(value);
  switch(value)
  {
    case "10":
      return "人民币";
    case "19":
      return "澳门元";
    case "21":
      return "港币";
    case "27":
      return "俄罗斯卢布";
    case "31":
      return "台湾元";
    case "32":
      return "美元";
    case "35":
      return "欧元";
    case "39":
      return "加拿大元";
    case "43":
      return "英镑";
    case "65":
      return "日元";
    case "69":
      return "新加坡元";
    default:
      return value
  }
})

//导入角色
import roles from './util/roles.js';
Vue.roles = roles;
//导入自定义指令
import directives from './util/directives.js';
Object.keys(directives).forEach((key,value)=>{
  Vue.directive(key,directives[key])
})

//error code
Vue.prototype.$chooseLang = chooseLang;
// lodash
import _ from 'lodash'
Vue.prototype._ = _
import { message } from '@/util/message.js';
Vue.prototype.$message = message;
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
});
