<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-userInfo" v-show="showbox" shadow="hover">
      <div slot="header">
        <span id="card-title">个人中心</span>
      </div>
      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
          <!--头像-->
          <div class="avatar">
            <my-upload
              field="file"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              v-model="show"
              :url="uploadAvatar"
              :params="params"
              :headers="headers"
              img-format="png"
            ></my-upload>
            <img :src="userInfo.avatar" class="img">

            <span id="nametest">{{userInfo.name}}</span>
            <div id="sextest">
              <img class="sex-img" src="@/assets/male.png" v-if="userInfo.sex=='男'">
              <img class="sex-img" src="@/assets/female.png" v-else>
            </div>
          </div>

          <!--信息-->
          <div class="user-info">
            <div class="user-info-main">
              <div id="birth">
                <span class="info-title">生日</span>
                {{userInfo.birthday}}
              </div>

              <div id="email">
                <span class="info-title">邮箱</span>
                {{userInfo.email}}
              </div>

              <div id="type">
                <span class="info-title">身份</span>
                {{userInfo.type}}
              </div>

              <div id="introduction">
                <span class="info-title">简介</span>
                {{userInfo.introduction}}
              </div>
            </div>

            <el-dialog :visible.sync="modifyInfoDiolog" width="30%">
              <div slot="title">修改信息</div>
              <el-form ref="form" :model="form" :rules="rules" label-width="150px" :inline="true">
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="form.name" maxlength="10" placeholder="请输入昵称" clearable></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    <el-option label="保密" value="保密"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    v-model="form.birthday"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <el-input
                    type="email"
                    v-model="form.email"
                    autocomplete="off"
                    clearable
                    placeholder="请输入邮箱"
                  ></el-input>
                </el-form-item>

                <el-form-item label="身份" prop="type">
                  <el-select v-model="form.type" placeholder="请选择身份">
                    <el-option label="摄影师" value="摄影师"></el-option>
                    <el-option label="模特" value="模特"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="个人简介">
                  <el-input
                    type="textarea"
                    v-model="form.introduction"
                    maxlength="300"
                    placeholder="请输入简介"
                    clearable
                  ></el-input>
                </el-form-item>
                <br>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>

          <div class="modify-btn">
            <el-button type="primary" @click="toggleShow" round>修改头像</el-button>
            <el-button type="primary" @click="modifyInfoDiolog = true" round>修改信息</el-button>
          </div>
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

      userInfo: {},

      showbox: false,
      modifyInfoDiolog: false,
      form: {},

      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "不少于2个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            required: true,
            message: "请选择生日",
            trigger: "change"
          }
        ],
        type: [{ required: true, message: "请选择身份", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },

      show: false,
      params: {
        token: "123456798",
        name: "avatar",
        userId: this.$store.state.userInfo.userId
      },
      headers: {
        smail: "*_~"
      },
      uploadAvatar: this.globalApi.UpdateUserApi,
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    getUserInfo() {
      //vuex存在数据
      if (this.$store.state.userInfo != "") {
        this.loading = false;
        this.loadingSuccess = true;
        this.userInfo = this.$store.state.userInfo;
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";

        let data = {
          userId: getCookie("userId")
        };
        this.$http
          .get(this.globalApi.RetrieUserInformationApi, { params: data })
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
                this.userInfo = response.data.data;
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

    modifyUserInformation() {
      this.$Loading.start();

      let data = {
        userId: getCookie("userId"),
        name: this.form.name,
        birthday: this.form.birthday,
        email: this.form.email,
        introduction: this.form.introduction,
        sex: this.form.sex,
        type: this.form.type,
        avatar: this.userInfo.avatar
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

            setCookie("name", data.name, 1000 * 60);

            this.modifyInfoDiolog = false;
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

    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      // console.log("-------- upload success --------");
      // console.log(jsonData);
      // console.log("field: " + field);
      // console.log(jsonData.data);
      this.userInfo.avatar = jsonData.data;
      // console.log(this.userInfo.avatar);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      // console.log("-------- upload fail --------");
      // console.log(status.data);
      // console.log(this.userInfo.avatar)
      // this.userInfo.avatar = status.data;
      // console.log("field: " + field);
    }
  },
  mounted() {
    this.showbox = true;

    this.getUserInfo();
  }
};
</script>

<style scoped>
.card-userInfo {
  width: 95%;
  margin: 20px auto;
  border-radius: 20px;
  max-width: 1200px;
  min-height: 500px;
}
#card-title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}
.main {
  min-height: 500px;
}
.avatar {
  width: 50%;
  height: 400px;
  float: left;
}
.img {
  display: block;
  border-radius: 50%;
  width: 200px;
  margin: 0 auto;
}

#nametest {
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: brown;
  margin-top: 10px;
}

#sextest {
  margin-top: 10px;
}

.user-info {
  width: 50%;
  height: 400px;
  float: right;
  letter-spacing: 0px;
}
.user-info-main {
  width: 100%;
  height: 300px;
}

#birth {
  margin-top: 0px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  text-align: left;
}
#email,
#type,
#introduction {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-top: 50px;
}

.info-title {
  font-size: 22px;
  color: brown;
}

.modify-btn {
  width: 100%;
}

#avatar-btn {
  margin-top: 100px;
}
</style>
