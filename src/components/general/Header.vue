<template>
  <el-menu
    :default-active="activeIndex"
    class="menu"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--logo-->
    <el-menu-item class="menu-item">
      <img width="50px" src="@/assets/logo.png">
      <span id="logo-title">55mm</span>
    </el-menu-item>

    <el-menu-item index="1" class="menu-item el-icon-s-home">首页</el-menu-item>

    <el-menu-item index="2" class="menu-item el-icon-edit" :disabled="!isLogin">发表</el-menu-item>

    <el-submenu index="3" class="menu-item" :show-timeout="0" :hide-timeout="0">
      <!--二级菜单标题-->
      <template slot="title">
        <span v-if="isLogin" class="submenu-title">
          <img :src="avatar" class="avatar">
          <!-- <el-image :src="avatar" class="avatar">
            <div slot="error">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>-->
          {{name}}
        </span>
        <span class="submenu-title el-icon-user-solid" v-else>游客</span>
      </template>

      <!--未登录-->
      <div v-if="isLogin">
        <el-menu-item index="3-1" class="el-icon-s-custom sbumenu-menu-item">个人中心</el-menu-item>
        <el-menu-item index="3-2" class="el-icon-message-solid sbumenu-menu-item">我的消息</el-menu-item>
        <el-menu-item index="3-3" class="el-icon-circle-close sbumenu-menu-item">退出系统</el-menu-item>
      </div>

      <!--已登录-->
      <div v-else>
        <el-menu-item index="3-4" class="el-icon-star-on sbumenu-menu-item">登录|注册</el-menu-item>
      </div>
    </el-submenu>

    <el-dialog :visible.sync="showLoginDialog" center :close-on-click-modal="false" width="25%">
      <div slot="title">感谢使用55mm</div>
      <!-- <div slot="footer">感谢使用55mm</div> -->
      <el-tabs type="border-card" lazy="true" :stretch="true">
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
        <el-tab-pane label="找回密码">
          <el-form
            :model="findPasswordForm"
            status-icon
            :rules="resetRules"
            ref="findPasswordForm"
            class="loginForm"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input
                type="email"
                v-model="findPasswordForm.email"
                autocomplete="off"
                clearable
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                @click="findPassword('findPasswordForm')"
                round
              >确定</el-button>
            </el-form-item>
          </el-form>

          <el-dialog
            title="正在重置密码"
            :visible.sync="resetPassword"
            width="30%"
            :close-on-click-modal="false"
            center
            :show-close="false"
          >
            <span slot="footer" v-loading="true"></span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-menu>
</template>

<script>
import { setCookie, getCookie, delCookie } from "@/utils/cookie.js";
import EventVue from "@/utils/EventVue.js";
import store from "@/vuex/store.js";
export default {
  name: "Header",
  store,
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
      showLoginDialog: false,
      resetPassword: false,

      loginForm: {
        account: "",
        password: ""
      },

      registerForm: {
        account: "",
        password: "",
        checkPass: "",
        email: ""
      },

      findPasswordForm: {
        email: ""
      },

      loginRules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
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
      },

      resetRules: {
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
        this.$router.push("/user");
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
          this.$message({
            message: "退出成功",
            type: "success",
            center: true,
            duration: 2000
          });
          this.isLogin = false;

          delCookie("userInfo");
          this.$store.commit("addUserInfo", "");
          this.$store.commit("addMyActions", "");
          sessionStorage.removeItem("userInfo");
          this.$router.push("/main");
        });
      } else if (key == "3-4") {
        this.activeIndex = "3";
        this.showLoginDialog = true;
      }
    },

    /**登录 */
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          let data = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };

          this.$http.post(this.globalApi.LoginApi, data).then(
            response => {
              this.$Loading.finish();

              // console.log(response.data);
              if (response.data.status != 200) {
                console.log(response.data.message);
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.loginForm.password = "";
              } else {
                //用户信息存入cookie

                // setCookie("name", response.data.data.name, 1000 * 60);
                // setCookie("avatar", response.data.data.avatar, 1000 * 60);
                // setCookie("userId", response.data.data.userId, 1000 * 60);
                setCookie(
                  "userInfo",
                  JSON.stringify(response.data.data),
                  1000 * 60
                );

                //用户信息存入vuex
                this.$store.commit("addUserInfo", response.data.data);

                this.$message({
                  message: "登录成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });

                this.isLogin = true;
                this.showLoginDialog = false;
                this.loginForm.password = "";

                //发送刷新动态页面请求
                //不知道为什么会发送4次请求
                // EventVue.$emit("refresh");
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "登录失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
              this.loginForm.password = "";
            }
          );
        } else {
          return false;
        }
      });
    },

    /**注册 */
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          let data = {
            account: this.registerForm.account,
            password: this.registerForm.password,
            email: this.registerForm.email
          };

          this.$http.post(this.globalApi.RegisterApi, data).then(
            response => {
              // console.log(response.data);

              this.$Loading.finish();

              if (response.data.status != 200) {
                console.log(response.data.message);
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 2000
                });
              } else {
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
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "注册失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
        } else {
          return false;
        }
      });
    },

    /**找回密码 */
    findPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          this.resetPassword = true;

          let data = {
            email: this.findPasswordForm.email
          };

          this.$http
            .post(this.globalApi.UpdatePasswordByEmailApi, data, {
              emulateJSON: true
            })
            .then(
              response => {
                this.$Loading.finish();

                this.resetPassword = false;

                // console.log(response.data);

                if (response.data.status != 200) {
                  console.log(response.data.message);
                  this.$message({
                    message: response.data.message,
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                  this.findPasswordForm.email = "";
                } else {
                  this.$notify({
                    title: "重置密码成功",
                    message: "新密码已发送至邮箱",
                    type: "success",
                    duration: 5000
                  });
                }
              },
              err => {
                this.$Loading.error();

                this.resetPassword = false;

                this.$message({
                  message: "重置密码失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.findPasswordForm.email = "";
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    /*页面挂载获取cookie，如果存在userInfo的cookie，则已登录*/
    if (getCookie("userInfo")) {
      this.isLogin = true;
      //通过cookie设置vuex
      this.$store.commit("addUserInfo", JSON.parse(getCookie("userInfo")));
    }

    //接收登录请求
    EventVue.$on("login", message => {
      this.showLoginDialog = true;
    });
  },
  computed: {
    name: function() {
      return this.$store.state.userInfo.name;
    },
    avatar: function() {
      return this.$store.state.userInfo.avatar;
    }
  }
};
</script>

<style scoped>
.menu {
  width: 95%;
  margin: 10px auto;
  max-width: 1200px;
  font-size: 24px;
}
.menu-item {
  font-size: 24px;
  font-weight: bold;
  width: 25%;
}
.submenu-title {
  font-size: 24px;
}
.sbumenu-menu-item {
  display: block;
  font-size: 18px;
  width: 100%;
  letter-spacing: 10px;
  text-align: center;
  margin-top: 5px;
  font-weight: bold;
}

#logo-title {
  font-size: 32px;
  font-weight: bold;
  color: #1f9b90;
}

.login-btn {
  margin: 20px auto;
  width: 100%;
}

.loginForm {
  margin: 0 auto;
  padding: 0px 50px 0px 50px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>




