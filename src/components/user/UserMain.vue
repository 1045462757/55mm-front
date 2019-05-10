<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-usermain" v-show="showbox" shadow="hover">
      <div slot="header">
        <span id="title">个人中心</span>
      </div>
      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
          <!--头像-->
          <div class="avatar">
            <my-upload
              field="img"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              v-model="show"
              url="/upload"
              :params="params"
              :headers="headers"
              img-format="png"
            ></my-upload>
            <img :src="imgDataUrl" class="img">
            <br>
            <br>
            <el-button type="primary" @click="toggleShow" round>修改头像</el-button>
          </div>

          <!--信息-->
          <div class="user-info">
            <div class="user-info-main">
              <div id="name">昵称:{{userInfo.name}}</div>
              <div id="sex">性别:{{userInfo.sex}}</div>
              <div id="birth">生日:{{userInfo.birth}}</div>
              <div id="email">邮箱:{{userInfo.email}}</div>
              <div id="qq">QQ:{{userInfo.qq}}</div>
              <div id="wechat">微信:{{userInfo.wechat}}</div>
              <div class="clear"></div>
              <div id="type">身份:{{userInfo.type}}</div>
              <div id="introduction">简介:{{userInfo.introduction}}</div>
            </div>

            <br>
            <el-button type="primary" @click="dialogFormVisible = true" round>修改信息</el-button>

            <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
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
                  <el-input v-model="form.email" maxlength="20" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="form.phone" maxlength="20" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="form.qq" maxlength="20" placeholder="请输入QQ" clearable></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="weChat">
                  <el-input v-model="form.weChat" maxlength="20" placeholder="请输入微信" clearable></el-input>
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

      userInfo: {
        name: "小张",
        sex: "女"
      },

      showbox: false,
      dialogFormVisible: false,
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 10, message: "不少于10个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 10, message: "不少于10个字符", trigger: "blur" }
        ],
        qq: [
          { required: true, message: "请输入qq", trigger: "blur" },
          { min: 5, message: "不少于5个字符", trigger: "blur" }
        ],
        weChat: [
          { required: true, message: "请输入微信", trigger: "blur" },
          { min: 2, message: "不少于2个字符", trigger: "blur" }
        ]
      },

      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl:
        "http://image.shehuiapp.com/u/67840/67840_011250952_1555906562520.jpeg/s300" // the datebase64 url of created image
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

        let data = {};
        this.$http
          .get(this.globalApi.RetrieveBlogListApi, { params: data })
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
      this.$message({
        message: "修改成功",
        type: "success",
        center: true,
        duration: 2000
      });
      this.dialogFormVisible = false;
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
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  },
  mounted() {
    this.showbox = true;

    this.getUserInfo();
  }
};
</script>

<style scoped>
.card-usermain {
  width: 95%;
  margin: 20px auto;
  border-radius: 20px;
  max-width: 1200px;
  min-height: 500px;
}
#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}
.main {
  min-height: 500px;
}
.avatar {
  width: 40%;
  height: 450px;
  float: left;
}
.img {
  border-radius: 50%;
  width: 250px;
  margin-top: 80px;
}
.user-info {
  width: 60%;
  height: 450px;
  float: right;
  letter-spacing: 10px;
}
.user-info-main {
  width: 100%;
  height: 300px;
}

#name,
#sex,
#birth {
  margin-top: 80px;
}

#email,
#qq,
#wechat,
#type,
#introduction {
  margin-top: 30px;
}

#name,
#sex,
#birth,
#email,
#qq,
#wechat {
  font-size: 24px;
  font-weight: bold;
  width: 33%;
  float: left;
  text-align: left;
}

#type,#introduction {
  font-size: 24px;
  font-weight: bold;
  width: 33%;
  text-align: left;
}

.clear{
  clear: both;
}
</style>
