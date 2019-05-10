<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item class="tip">
      <img width="50px" src="@/assets/logo.png">
      <span id="title">55mm</span>
    </el-menu-item>
    <el-menu-item index="1" class="tip el-icon-s-home">首页</el-menu-item>

    <el-menu-item index="2" class="tip el-icon-camera-solid" :disabled="!isLogin">发表</el-menu-item>

    <el-submenu index="3" class="tip">
      <template slot="title" class="tip">
        <span class="title-tip" v-if="isLogin">
          <img
            src="http://image.shehuiapp.com/u/822505/822505_036337370_1553935009948.jpg/t150"
            class="avatar"
          >
          {{title}}
        </span>
        <span class="title-tip el-icon-user-solid" v-else>{{title}}</span>
      </template>
      <div v-if="isLogin">
        <el-menu-item index="3-1" class="el-icon-star-off small-tip">个人中心</el-menu-item>
        <br>
        <el-menu-item index="3-2" class="el-icon-star-off small-tip">我的消息</el-menu-item>
        <br>
        <el-menu-item index="3-3" class="el-icon-star-off small-tip">退出</el-menu-item>
      </div>

      <div v-else>
        <el-menu-item index="3-4" class="el-icon-star-off small-tip">登录|注册</el-menu-item>
      </div>
    </el-submenu>
    <el-dialog
      title="感谢使用55mm"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
      class="dialog"
      :fullscreen="true"
    >
      <el-tabs type="border-card" lazy="true" class="tab">
        <el-tab-pane label="登录">
          <el-form
            :model="loginForm"
            status-icon
            :rules="loginRules"
            ref="loginForm"
            class="loginForm"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                v-model="loginForm.account"
                clearable
                placeholder="请输入账号"
                @keyup.enter.native="login('loginForm')"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                clearable
                show-password
                @keyup.enter.native="login('loginForm')"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="login-btn" type="primary" @click="login('loginForm')" round>登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-form
            :model="registerForm"
            status-icon
            :rules="registerRules"
            ref="registerForm"
            class="loginForm"
          >
            <el-form-item label="账号" prop="account">
              <el-input v-model="registerForm.account" clearable placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                autocomplete="off"
                clearable
                show-password
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="registerForm.checkPass"
                autocomplete="off"
                clearable
                show-password
                @keyup.enter.native="register('registerForm')"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input
                type="email"
                v-model="registerForm.email"
                autocomplete="off"
                clearable
                @keyup.enter.native="register('registerForm')"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="login-btn" type="primary" @click="register('registerForm')" round>注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-menu>
</template>

<script>
export default {
  data() {
    //校验账号
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("账号不能小于8位"));
      } else {
        callback();
      }
    };
    //校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    //再次密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "1",
      isLogin: false,
      title: "游客",
      centerDialogVisible: false,
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      registerForm: {
        account: "",
        password: "",
        checkPass: "",
        email: ""
      },
      registerRules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == "1") {
        this.activeIndex = "1";
        this.$router.push("/main");
      } else if (key == "2") {
        this.activeIndex = "2";
        this.$router.push("/write");
      } else if (key == "3-1") {
        this.activeIndex = "3";
        this.$router.push("/userMain");
      } else if (key == "3-2") {
        this.activeIndex = "3";
        this.$message({
          message: "尚在开发",
          type: "info",
          center: true,
          duration: 2000
        });
      } else if (key == "3-3") {
        this.activeIndex = "3";
        this.$confirm("确认退出吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$notify({
            message: "退出成功",
            type: "success",
            center: true,
            duration: 2000
          });
          this.title = "游客";
          this.isLogin = false;
        });
      } else if (key == "3-4") {
        this.activeIndex = "3";
        this.centerDialogVisible = true;
      }
    },
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$notify({
            message: "登录成功",
            type: "success",
            center: true,
            duration: 2000
          });
          this.title = "小可爱";
          this.isLogin = true;
          this.centerDialogVisible = false;
          this.loginForm.password = "";
        } else {
          return false;
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "注册成功",
            type: "success",
            center: true,
            duration: 2000
          });
          this.registerForm.account = "";
          this.registerForm.password = "";
          this.registerForm.checkPass = "";
          this.registerForm.email = "";
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.el-menu-demo {
  width: 95%;
  margin: 0px auto;
  max-width: 1200px;
  /* position: fixed;
  left: 20%; */
}
.tip {
  font-size: 22px;
  width: 25%;
  letter-spacing: 5px;
}
.title-tip {
  font-size: 22px;
  letter-spacing: 5px;
}
.small-tip {
  font-size: 18px;
  width: 100%;
  letter-spacing: 15px;
  text-align: center;
  margin-top: 5px;
}
#title {
  font-weight: bold;
  color: rgb(31, 155, 144);
  font-size: 30px;
}
.login-card {
  width: 500px;
  margin: 180px auto;
  border-radius: 50px;
}

#login-title {
  font-size: 32px;
  color: orangered;
}

#login-tip {
  font-size: 20px;
  color: darkolivegreen;
}

.login-btn {
  margin: 20px auto;
  width: 100%;
}

.loginForm {
  margin: 0 auto;
  padding: 0px 100px 0px 100px;
}

.tab {
  width: 500px;
  margin: 0 auto;
  max-width: 500px;
}

.avatar {
  width: 40px;
  border-radius: 50%;
}
</style>




