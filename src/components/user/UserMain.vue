<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-userInfo" v-show="showCard" shadow="hover">
      <div slot="header">
        <span id="card-title">我的信息</span>
      </div>

      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
          <my-upload
            field="avatar"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="showChangeAvatar"
            :url="uploadAvatarUrl"
            :params="params"
            img-format="png"
          ></my-upload>

          <!--头像-->
          <img :src="userInfoForm.avatar" class="img" @click="toggleShow">

          <!--表单-->
          <el-form ref="userInfoForm" :model="userInfoForm" :rules="userInfoRules" class="form">
            <el-form-item label="昵称" prop="name">
              <el-input
                v-model="userInfoForm.name"
                maxlength="10"
                placeholder="请输入昵称"
                clearable
                @blur="validSubmit()"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="userInfoForm.sex"
                placeholder="请选择性别"
                @blur="validSubmit()"
                style="width: 100%;"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="保密" value="保密"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份" prop="type">
              <el-select
                v-model="userInfoForm.type"
                placeholder="请选择身份"
                @blur="validSubmit()"
                style="width: 100%;"
              >
                <el-option label="摄影师" value="摄影师"></el-option>
                <el-option label="模特" value="模特"></el-option>
                <el-option label="修图师" value="修图师"></el-option>
                <el-option label="化妆师" value="化妆师"></el-option>
                <el-option label="绘图师" value="绘图师"></el-option>
                <el-option label="服装供应商" value="服装供应商"></el-option>
                <el-option label="场地供应商" value="场地供应商"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy 年 MM 月 dd 日"
                placeholder="请选择日期"
                v-model="userInfoForm.birthday"
                style="width: 100%;"
                @blur="validSubmit()"
              ></el-date-picker>
            </el-form-item>
            <el-alert
              title="提示"
              description="邮箱可以用来找回密码，请务必填写准确"
              center
              type="warning"
              effect="light"
              :closable="false"
            ></el-alert>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="userInfoForm.email"
                maxlength="25"
                placeholder="请输入邮箱"
                clearable
                @blur="validSubmit()"
              ></el-input>
            </el-form-item>
            <el-alert
              title="提示"
              description="当您有新的约拍请求时会收到约拍通知，请务必填写有效的手机号"
              type="warning"
              effect="light"
              :closable="false"
            ></el-alert>
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="userInfoForm.phone"
                maxlength="11"
                placeholder="请输入手机号码"
                clearable
                @blur="validSubmit()"
              ></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
              <el-input
                v-model="userInfoForm.qq"
                maxlength="15"
                placeholder="请输入QQ"
                clearable
                @blur="validSubmit()"
              ></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="weChat">
              <el-input
                v-model="userInfoForm.weChat"
                maxlength="15"
                placeholder="请输入微信"
                clearable
                @blur="validSubmit()"
              ></el-input>
            </el-form-item>

            <el-form-item label="个人简介">
              <el-input
                type="textarea"
                v-model="userInfoForm.introduction"
                maxlength="300"
                placeholder="请输入简介"
                clearable
                @blur="validSubmit()"
                show-word-limit
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit('userInfoForm')" :disabled="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="getUserInfo()" class="tip"></Tip>
      </div>
    </el-card>
  </transition>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
import { getCookie, setCookie } from "@/utils/cookie.js";
export default {
  name: "UserMain",
  components: {
    "my-upload": myUpload,
    Tip
  },
  store,
  data() {
    return {
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: ""
      },

      submit: true,

      showCard: false,

      userInfoForm: {},

      userInfoRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "不少于2个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        type: [{ required: true, message: "请选择身份", trigger: "change" }],
        birthday: [
          {
            required: true,
            message: "请选择生日",
            trigger: "change"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          // { required: true, message: "请输入手机号码", trigger: "change" }
        ]
      },

      showChangeAvatar: false,

      params: {
        userId: this.$store.state.userInfo.userId
      },

      uploadAvatarUrl: this.globalApi.UpdateUserApi
    };
  },
  methods: {
    /**
     * 修改提交按钮是否禁用
     */
    validSubmit() {
      this.submit = false;
    },

    /**
     * 获取用户信息
     */
    getUserInfo() {
      //vuex存在数据
      if (this.$store.state.userInfo != "") {
        this.loading = false;
        this.loadingSuccess = true;
        this.userInfoForm = this.$store.state.userInfo;
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";

        var Info = JSON.parse(getCookie("userInfo"));
        let data = {
          userId: Info.userId
        };

        this.$http
          .get(this.globalApi.RetrieveUserInformationApi, { params: data })
          .then(
            response => {
              // console.log(response.data);
              this.loading = false;
              this.loadingSuccess = true;
              if (response.data.status != 200) {
                console.log(response.data.message);
                this.tip.show = true;
                this.tip.businessError = true;
                this.tip.errorMessage = response.data.message;
              } else {
                this.userInfoForm = response.data.data;
                //存入vuex;
                this.$store.commit("addUserInfo", response.data.data);
              }
            },
            err => {
              this.loading = false;
              this.loadingSuccess = false;
              this.tip.show = true;
              this.tip.netError = true;
            }
          );
      }
    },

    /**
     * 提交表单
     */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.modifyUserInformation();
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },

    /**
     * 修改用户信息
     */
    modifyUserInformation() {
      this.$Loading.start();

      let data = {
        userId: this.userInfoForm.userId,
        name: this.userInfoForm.name,
        sex: this.userInfoForm.sex,
        type: this.userInfoForm.type,
        birthday: this.userInfoForm.birthday,
        email: this.userInfoForm.email,
        phone: this.userInfoForm.phone,
        qq: this.userInfoForm.qq,
        weChat: this.userInfoForm.weChat,
        introduction: this.userInfoForm.introduction,
        avatar: this.userInfoForm.avatar
      };

      this.$http.put(this.globalApi.UpdateUserInformationApi, data).then(
        response => {
          this.$Loading.finish();
          // console.log(response.data);
          if (response.data.status != 200) {
            //failed
            this.$message({
              message: response.data.message,
              type: "error",
              center: true,
              duration: 2000
            });
          } else {
            //success
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
              duration: 2000
            });

            //更新vuex
            this.$store.commit("addUserInfo", data);

            //更新cookie
            setCookie("userInfo", JSON.stringify(data), 1000 * 60);

            this.submit = true;
          }
        },
        err => {
          this.$Loading.error();
          this.$message({
            message: "修改用户信息失败:服务器异常",
            type: "error",
            center: true,
            duration: 2000
          });
        }
      );
    },

    /**
     * 弹出头像修改框
     */
    toggleShow() {
      this.showChangeAvatar = !this.showChangeAvatar;
    },

    /**
     * 头像上传成功
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      this.userInfoForm.avatar = jsonData.data;

      //头像存入vuex
      let data = {
        userId: this.userInfoForm.userId,
        name: this.userInfoForm.name,
        birthday: this.userInfoForm.birthday,
        email: this.userInfoForm.email,
        introduction: this.userInfoForm.introduction,
        sex: this.userInfoForm.sex,
        type: this.userInfoForm.type,
        avatar: this.userInfoForm.avatar
      };
      this.$store.commit("addUserInfo", data);

      //头像存入cookie
      setCookie("userInfo", JSON.stringify(data), 1000 * 60);
    },

    /**
     * 头像上传失败
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      // console.log("-------- upload fail --------");
      // console.log(status.data);
      // console.log("field: " + field);
    }
  },
  mounted() {
    this.showCard = true;

    this.getUserInfo();
  }
};
</script>

<style scoped>
.card-userInfo {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 800px;
}
#card-title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}
.main {
  min-height: 500px;
}

.img {
  display: block;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

form {
  width: 90%;
  max-width: 320px;
  margin: 20px auto;
}


</style>
