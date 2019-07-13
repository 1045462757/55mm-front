<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="showCard" shadow="hover">
      <div slot="header">
        <span id="card-title">{{userInfoForm.name}}</span>
        <el-switch
          v-if="!permisstion"
          v-model="userInfoForm.isFocus"
          active-text="关注"
          @change="focus()"
        ></el-switch>
      </div>

      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
          <!--头像-->
          <img :src="userInfoForm.avatar" class="img">

          <!--表单-->
          <el-form ref="userInfoForm" :model="userInfoForm" class="form">
            <el-form-item label="昵称" prop="name">
              <el-input
                v-model="userInfoForm.name"
                :disabled="true"
                style="width: 100%;"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input
                v-model="userInfoForm.sex"
                :disabled="true"
                style="width: 100%;"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="type">
              <el-input
                v-model="userInfoForm.type"
                :disabled="true"
                style="width: 100%;"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-input
                v-model="userInfoForm.birthday"
                :disabled="true"
                style="width: 100%;"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                v-model="userInfoForm.introduction"
                :disabled="true"
                style="width: 100%;"
                class="input"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="getUserInfo()"></Tip>
      </div>
      <BackTop :height="100" :bottom="30" :duration="1500">
        <div class="top el-icon-top"></div>
      </BackTop>
    </el-card>
  </transition>
</template>

<script>
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
import EventVue from "@/utils/EventVue.js";
export default {
  name: "UserDetails",
  components: { Tip },
  store,
  data() {
    return {
      showCard: false,
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: ""
      },

      userInfoForm: {}
    };
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo() {
      //状态初始化
      this.loading = true;
      this.loadingSuccess = false;
      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";

      let data = {
        userId: this.$route.query.userId,
        watcherId: this.$store.state.userInfo.userId
      };

      this.$http
        .get(this.globalApi.RetrieveOtherUserInformationApi, { params: data })
        .then(
          response => {
            // console.log(response.data);
            this.loading = false;
            this.loadingSuccess = true;
            if (response.data.errorCode!=null) {
              console.log(response.data.errorMessage);
              this.tip.show = true;
              this.tip.businessError = true;
              this.tip.errorMessage = response.data.errorMessage;
            } else {
              this.userInfoForm = response.data;
              if (response.data.introduction == null) {
                this.userInfoForm.introduction = "这个人太懒了,什么都没写";
              }
            }
          },
          err => {
            this.loading = false;
            this.loadingSuccess = false;
            this.tip.show = true;
            this.tip.netError = true;
          }
        );
    },

    /**
     * 关注用户
     */
    focus() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        setTimeout(
          function() {
            this.userInfoForm.isFocus = false;
          }.bind(this),
          500
        );
        return;
      }

      if (this.userInfoForm.isFocus == true) {
        this.$Loading.start();
        let data = {
          fansId: this.$store.state.userInfo.userId,
          focusId: this.userInfoForm.userId
        };

        this.$http
          .post(this.globalApi.CreateUserCollectionApi, data, {
            emulateJSON: true
          })
          .then(
            response => {
              this.$Loading.finish();
              // console.log(response.data);
              if (response.data.errorCode!=null) {
                this.$message({
                  message: response.data.errorMessage,
                  type: "error",
                  center: true,
                  duration: 2000
                });
                setTimeout(
                  function() {
                    this.userInfoForm.isFocus = false;
                  }.bind(this),
                  2000
                );
              } else {
                this.$message({
                  message: "关注成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "关注用户失败,服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
              setTimeout(
                function() {
                  this.userInfoForm.isFocus = false;
                }.bind(this),
                2000
              );
            }
          );
      } else {
        //取消关注
        this.$confirm("确认不再关注TA吗", "提示", {
          confirmButtonText: "真滴",
          cancelButtonText: "手滑啦",
          type: "warning"
        }).then(
          () => {
            //加载条开始
            this.$Loading.start();
            let data = {
              fansId: this.$store.state.userInfo.userId,
              focusId: this.userInfoForm.userId
            };
            this.$http
              .delete(this.globalApi.DeleteUserCollectionApi, {
                params: data
              })
              .then(
                response => {
                  this.$Loading.finish();
                  // console.log(response.data);
                  if (response.data.errorCode!=null) {
                    this.$message({
                      message: response.data.errorMessage,
                      type: "error",
                      center: true,
                      duration: 2000
                    });
                    setTimeout(
                      function() {
                        this.userInfoForm.isFocus = true;
                      }.bind(this),
                      2000
                    );
                  } else {
                    this.$message({
                      message: "取消关注成功",
                      type: "success",
                      center: true,
                      duration: 2000
                    });
                  }
                },
                err => {
                  this.$Loading.error();
                  this.$message({
                    message: "取消关注用户失败:服务器异常",
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                  setTimeout(
                    function() {
                      this.userInfoForm.isFocus = true;
                    }.bind(this),
                    2000
                  );
                }
              );
          },
          () => {
            this.userInfoForm.isFocus = true;
          }
        );
      }
    }
  },
  mounted() {
    this.showCard = true;

    this.getUserInfo();
  },
  computed: {
    permisstion: function() {
      if (this.userInfoForm.userId == this.$store.state.userInfo.userId) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.action-details {
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

#title {
  font-size: 68px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
}

.main {
  min-height: 500px;
}

.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}

.img {
  display: block;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.form {
  width: 90%;
  max-width: 320px;
  margin: 20px auto;
}

.input {
  font-size: 18px;
}
</style>
