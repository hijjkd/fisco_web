/*
 * Copyright 2014-2020 the original author or authors.
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
<template>
  <div class="login-bg" :style="{ backgroundImage: 'url(' + bgLogin + ')' }">

    <div class="login">
      <div>
        <img
        style="
            width: 142px;
            height: 142px;
            fill: currentColor;
            overflow: hidden;
          " aria-hidden="true"
        src="../../../static/image/login_logo.jpg" alt="My Image">
      <div>


      </div>
      </div>
      <div class="msg-wrapper">
        <div class="msg-error" v-show="msgError || timeout">
          <i class="el-icon-remove"></i>
          <span v-if="msgError">{{
            msgErrorContent || this.$t("text.loginFail")
          }}</span>
          <span v-else-if="timeout">{{ this.$t("text.reqOvertime") }}</span>
        </div>
      </div>
      <div class="login-content">
        <template>
          <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form">
            <el-form-item :label="$t('login.user')" prop="user">
              <el-input v-model="loginForm.user" :placeholder="$t('inputText.user')">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password')" prop="password">
              <el-input v-model="loginForm.password" :placeholder="$t('inputText.password')" type="password">
              </el-input>
            </el-form-item>

            <!-- 验证码校验 -->
            <!-- <el-form-item :label="$t('login.verificationCode')" prop="vercode">
              <div style="width: 100%">
                <el-input style="width: 240px" v-model="loginForm.vercode" :placeholder="$t('inputText.verificationCode')"
                  @keyup.enter.native="submit('loginForm')">
                </el-input>
                <span class="codeUrlImg">
                  <img style="width: 100%; height: 100%" :src="codeUrl" alt="" @click="changeCode()" />
                </span>
              </div>
            </el-form-item> -->
          </el-form>
        </template>
      </div>
      <div>
        <el-button @click="submit('loginForm')" type="primary" class="login-submit" :loading="logining">{{
          this.$t("login.login") }}</el-button>
      </div>

      <!-- 忘记密码 -->
      <!-- <div class="loginTip">
        <el-popover class="forgetPassWord" placement="top" title="" width="250" trigger="click">
          <span>{{ $t('login.ForgetPasswordMsg') }}</span>
          <a target="_blank" style="color:cornflowerblue"
            href="https://webasedoc.readthedocs.io/zh_CN/latest/docs/WeBASE-Node-Manager/appendix.html#forget_pwd">{{ $t('login.ForgetPassword') }}</a>
          <span>{{ $t('login.FollowPrompt') }}</span>
          <el-button slot="reference">{{ $t('login.ForgetPassword') }}</el-button>
        </el-popover>
        <el-popover class="pictureCheckCodeErr" v-show="pictureCheckCodeErrShow" placement="top" title="" width="250"
          trigger="click">
          <span>{{ $t('login.VerificaFailedMsg') }}</span>
          <a target="_blank" style="color:cornflowerblue"
            href="https://webasedoc.readthedocs.io/zh_CN/latest/docs/WeBASE-Web/appendix.html#code_fail">{{ $t('login.VerificaFailed') }}</a>
          <span>{{ $t('login.FollowPrompt') }}</span>
          <el-button slot="reference">{{ $t('login.VerificaFailed') }}</el-button>
        </el-popover>
      </div> -->
    </div>
  </div>
</template>
<script>
import {
  login,
  networkList,
  haveNode,
  getPictureCheckCode,
  encryption,
  getDeployType,
  getConfigAuth,
} from "@/util/api";
import url from "@/util/url";
import router from "@/router";
import bg from "../../../static/image/banner.png";
import logo from "../../../static/image/logo-2 copy@1.5x.jpg";
import { delCookie } from "@/util/util";
import errcode from "@/util/errcode";
const sha256 = require("js-sha256").sha256;
const gm = require("@/util/SM2Sign");
import utils from "@/util/sm_sha";
import langSelect from "@/components/LangSelect";
export default {
  name: "login",
  components: {
    "lang-select": langSelect,
  },
  data: function () {
    return {
      bgLogin: bg,
      logoPng: logo,
      logining: false,
      msgError: false,
      msgErrorContent: "",
      timeout: false,
      codeUrl: url.codeUrl,
      loginForm: {
        user: "",
        password: "",
        vercode: "",
      },
      authToken: null,
      encryption: "hash",
      pictureCheckCodeErrShow: false
    };
  },
  computed: {
    rules() {
      var obj = {
        user: [
          {
            required: true,
            message: this.$t("inputText.user"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("inputText.password"),
            trigger: "blur",
          },
        ],
        vercode: [
          {
            required: true,
            message: this.$t("inputText.verificationCode"),
            trigger: "blur",
          },
        ],
      };
      return obj;
    },
  },
  mounted: function () {

    // let soljson = document.getElementById('soljson')
    // if(soljson){
    //     soljson.remove()
    //     location.reload()
    // }
  },
  methods: {
    submit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true;
          this.userLogin();
        } else {
          return false;
        }
      });
    },

    userLogin: function (callback) {
      delCookie("JSESSIONID");
      delCookie("NODE_MGR_ACCOUNT_C");
      let reqData = {
        username: this.loginForm.user,
        password: sha256(this.loginForm.password),
      };
      let checkCode = this.loginForm.vercode;
      login(reqData, checkCode, this.authToken)
        .then((res) => {
          if (res.data.code  == "") {
            localStorage.setItem("access_token", res.data.result);
            localStorage.setItem("userName", reqData.username);
            this.logining = false;
            this.$router.push({
                          path: "/home",
                        });
          } else {

            // this.msgErrorContent = this.$chooseLang(res.data.code);
            this.msgError = true;
            this.loginForm.password = "";
            this.logining = false;
          }
        })
        .catch((err) => {
          this.timeout = true;
          this.loginForm.password = "";
          this.logining = false;
        });
    },

  },
};
</script>
<style>
.login-label.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: "" !important;
}

.login-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.login {
  position: absolute;
  width: 430px;
  height: 460px;
  top: 52%;
  left: 70%;
  margin-top: -280px;
  margin-left: -201px;
  padding: 0 50px 40px 50px;
  background-color: #fff;
  border-radius: 16px;
  text-align: center;
  box-sizing: border-box;
}

.logo-content {
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0;
  text-align: center;
  font-size: 12px;
  color: #979faa;
  letter-spacing: 0.02px;
}

.msg-wrapper {
  min-height: 20px;
  height: auto;
}

.msg-error {
  color: #e4393c;
}

.codeUrlImg {
  display: inline-block;
  height: 38px;
  width: 84px;
  line-height: 38px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
}

.logo {
  width: 120px;
  padding-top: 80px;
}

.login-title {
  padding: 16px 0 0px 0;
  font-size: 20px;
  color: #2e2e2e;
  letter-spacing: 0.04px;
}

.login-label {
  position: relative;
  padding: 0 60px;
}

.login-label input {
  height: 54px;
  padding-left: 60px;
}

.login-submit {
  width: 100%;
  height: 45px;
  margin-top: 10px;
  font-size: 14px;
}

.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: "";
}

.login-form .el-form-item__label {
  display: block;
  line-height: 32px;
  float: none;
  text-align: left;
}

.login-lang {
  position: absolute;
  right: 10px;
  top: 20px;
  min-width: 160px;
}

.login-encrypt {
  position: absolute;
  right: 10px;
  top: 60px;
  min-width: 160px;
}

.login-encrypt .el-radio-button__inner {
  display: inline-block;
  width: 80px;
}

.loginTip {
  position: relative;
  margin-top: 10px;
}

.forgetPassWord {
  position: absolute;
  left: 0;
}

.pictureCheckCodeErr {
  position: absolute;
  right: 0;
}

.forgetPassWord button {
  border: none;
  width: 70px;
  color: #20D4D9;
  padding: 0;
}

.pictureCheckCodeErr button {
  border: none;
  width: 108px;
  color: #20D4D9;
  padding: 0;
}

.forgetPassWord button:hover {
  color: #409EFF;
}

.pictureCheckCodeErr button:hover {
  color: #409EFF;
}

.forgetPassWord button span {
  background-color: white;
  /* color: #409EFF; */
}

.pictureCheckCodeErr button span {
  background-color: white;
  /* color: #409EFF; */
}




</style>
