<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-action-details" v-show="showCard" shadow="hover">
      <div slot="header" class="clearfix">
        <span id="title">{{action.title}}</span>
        <el-switch
          v-if="!permisstion"
          v-model="action.isCollected"
          active-text="收藏"
          @change="collect()"
        ></el-switch>
      </div>

      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
          <!--头部-->
          <div class="header">
            <!--用户信息-->
            <div class="user">
              <img class="avatar" :src="action.author.avatar" />
              <div class="user-info">
                <router-link :to="{path:'/userDetails',query: {userId: action.author.userId}}">
                  <span id="name">{{action.author.name}}</span>
                </router-link>
                <div id="sex">
                  <img class="sex-img" src="@/assets/male.png" v-if="action.author.sex=='男'" />
                  <img class="sex-img" src="@/assets/female.png" v-else-if="action.author.sex=='女'" />
                </div>
                <div id="type">{{action.author.type}}</div>
              </div>
            </div>

            <!--地区-->
            <span id="address">{{action.address}}</span>

            <!--价格-->
            <span id="cost">{{action.cost}}元</span>

            <!--时间-->
            <span id="time">
              <Time :time="action.time"></Time>
            </span>
          </div>

          <!--标签-->
          <div class="tag">
            <el-tag :key="tag" v-for="tag in action.tags" effect="dark" type="success">{{tag.name}}</el-tag>
          </div>

          <!--正文-->
          <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="action.content"></div>
          </div>

          <div v-if="!permisstion">
            <el-button
              type="primary"
              round
              class="btn"
              @click="watch()"
              :disabled="action.isWatched"
              v-if="!action.isWatched"
            >约拍TA</el-button>

            <el-button
              type="danger"
              round
              class="btn"
              @click="removeWatch()"
              :disabled="!action.isWatched"
              v-else
            >取消约拍</el-button>
          </div>
          <div v-else>
            <el-button type="primary" round class="btn" @click="modify()">修改</el-button>
            <el-button type="danger" round class="btn" @click="remove()">删除</el-button>
          </div>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="getAction()"></Tip>
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
  name: "ActionDetails",
  store,
  components: {
    Tip
  },
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

      showCard: false,
      action: {
        isWatched: false,
        author: {
          userId: ""
        },
        isCollected: false,
        tags: []
      }
    };
  },
  methods: {
    /**
     * 获取动态
     *  */
    getAction() {
      //vuex存在数据
      if (this.$store.state.myActions.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;

        var actionId = this.$route.query.actionId;

        for (var i = 0; i < this.$store.state.myActions.length; i++) {
          if (this.$store.state.myActions[i].actionId == actionId) {
            this.action = this.$store.state.myActions[i];
          }
        }
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.action = {};
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";

        //判断是否登录
        var existUserId = null;
        if (this.$store.state.userInfo.userId) {
          var existUserId = this.$store.state.userInfo.userId;
        }

        let data = {
          actionId: this.$route.query.actionId,
          userId: existUserId
        };

        this.$http.get(this.globalApi.RetrieveActionApi, { params: data }).then(
          response => {
            // console.log(response.data);
            this.loading = false;
            this.loadingSuccess = true;
            if (response.data.errorCode != null) {
              console.log(response.data.errorMessage);
              this.tip.show = true;
              this.tip.businessError = true;
              this.tip.errorMessage = response.data.errorMessage;
            } else {
              this.action = response.data;

              //如未登录则设isWatched为false
              if (existUserId == null) {
                this.action.isWatched = false;
              }

              //存入vuex;
              // this.$store.commit("addActions", response.data.data);
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
     * 约拍
     */
    watch() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        return;
      }

      //判断权限
      if (this.action.author.userId != this.$store.state.userInfo.userId) {
        if (this.action.isWatched == false) {
          this.$Loading.start();

          let data = {
            watcher: {
              userId: this.$store.state.userInfo.userId
            },
            action: {
              actionId: this.action.actionId,
              author: {
                userId: this.action.author.userId
              }
            }
          };

          this.$http.post(this.globalApi.CreateActionWatchApi, data).then(
            response => {
              this.$Loading.finish();
              // console.log(response.data);
              if (response.data.errorCode != null) {
                //failed
                this.$message({
                  message: response.data.errorMessage,
                  type: "error",
                  center: true,
                  duration: 2000
                });
              } else {
                //success
                this.$message({
                  message: "约拍成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });

                this.action.isWatched = true;
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "约拍失败,服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     * 取消约拍
     */
    removeWatch() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        return;
      }

      //判断权限
      if (this.action.author.userId != this.$store.state.userInfo.userId) {
        if (this.action.isWatched == true) {
          //取消约拍
          this.$confirm("确认取消约拍吗", "提示", {
            confirmButtonText: "真滴",
            cancelButtonText: "手滑啦",
            type: "warning"
          }).then(
            () => {
              this.$Loading.start();

              let data = {
                watcher: {
                  userId: this.$store.state.userInfo.userId
                },
                action: {
                  actionId: this.action.actionId
                }
              };

              this.$http
                .delete(this.globalApi.DeleteActionWatchApi, { body: data })
                .then(
                  response => {
                    //加载条结束
                    this.$Loading.finish();
                    // console.log(response.data);
                    if (response.data.errorCode != null) {
                      //failed
                      this.$message({
                        message: response.data.errorMessage,
                        type: "error",
                        center: true,
                        duration: 2000
                      });
                      // setTimeout(
                      //   function() {
                      //     this.action.isWatched = true;
                      //   }.bind(this),
                      //   2000
                      // );
                    } else {
                      //success
                      this.$message({
                        message: "取消约拍成功",
                        type: "success",
                        center: true,
                        duration: 2000
                      });

                      this.action.isWatched = false;
                    }
                  },
                  err => {
                    this.$Loading.error();
                    this.$message({
                      message: "取消约拍失败:服务器异常",
                      type: "error",
                      center: true,
                      duration: 2000
                    });
                    // setTimeout(
                    //   function() {
                    //     this.action.isWatched = true;
                    //   }.bind(this),
                    //   2000
                    // );
                  }
                );
            },
            () => {
              // this.action.isWatched = true;
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     * 修改动态
     */
    modify() {
      //判断权限
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        this.$router.push("/write");
        //传递参数
        localStorage.setItem("actionId", this.action.actionId);
        localStorage.setItem("title", this.action.title);
        localStorage.setItem("address", this.action.address);
        localStorage.setItem("cost", this.action.cost);
        localStorage.setItem("content", this.action.content);
        localStorage.setItem("permission", true);
        localStorage.setItem("tags", JSON.stringify(this.action.tags));
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     *删除动态
     */
    remove() {
      //判断权限
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        this.$confirm("确认删除该动态吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //加载条开始
          this.$Loading.start();

          let data = {
            author: {
              userId: this.$store.state.userInfo.userId
            },
            actionId: this.action.actionId
          };

          this.$http
            .delete(this.globalApi.DeleteActionApi, { body: data })
            .then(
              response => {
                //加载条结束
                this.$Loading.finish();
                // console.log(response.data);
                if (response.data.errorCode != null) {
                  //failed
                  this.$message({
                    message: response.data.errorMessage,
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                } else {
                  //success
                  this.$message({
                    message: "删除成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });

                  //从vuex中删除该动态
                  // this.$store.commit("addMyActions", "");
                  // this.$store.commit("addActions", "");

                  //清空vuex
                  this.$store.commit("addActions", "");
                  this.$store.commit("addMyActions", "");

                  this.$router.push("/main");
                }
              },
              err => {
                this.$Loading.error();
                this.$message({
                  message: "删除动态失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
              }
            );
        });
      }
    },

    /**
     * 收藏动态
     */
    collect() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        setTimeout(
          function() {
            this.action.isCollected = false;
          }.bind(this),
          500
        );
        return;
      }

      //权限判断
      if (this.action.author.userId != this.$store.state.userInfo.userId) {
        //收藏动态
        if (this.action.isCollected == true) {
          this.$Loading.start();
          let data = {
            userId: this.$store.state.userInfo.userId,
            actionId: this.action.actionId
          };

          this.$http
            .post(this.globalApi.CreateActionCollectionApi, data, {
              emulateJSON: true
            })
            .then(
              response => {
                this.$Loading.finish();
                // console.log(response.data);
                if (response.data.errorCode != null) {
                  this.$message({
                    message: response.data.errorMessage,
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                  setTimeout(
                    function() {
                      this.action.isCollect = false;
                    }.bind(this),
                    2000
                  );
                } else {
                  //success
                  this.$message({
                    message: "收藏成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });
                }
              },
              err => {
                this.$Loading.error();
                // this.isCollect = false;
                this.$message({
                  message: "收藏动态失败,服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                setTimeout(
                  function() {
                    this.action.isCollect = false;
                  }.bind(this),
                  2000
                );
              }
            );
        } else {
          //取消收藏
          this.$confirm("确认取消收藏吗", "提示", {
            confirmButtonText: "真滴",
            cancelButtonText: "手滑啦",
            type: "warning"
          }).then(
            () => {
              //加载条开始
              this.$Loading.start();
              let data = {
                userId: this.$store.state.userInfo.userId,
                actionId: this.action.actionId
              };
              this.$http
                .delete(this.globalApi.DeleteActionCollectionApi, {
                  params: data
                })
                .then(
                  response => {
                    this.$Loading.finish();
                    // console.log(response.data);
                    if (response.data.errorCode != null) {
                      this.$message({
                        message: response.data.errorMessage,
                        type: "error",
                        center: true,
                        duration: 2000
                      });
                      setTimeout(
                        function() {
                          this.action.isCollect = true;
                        }.bind(this),
                        2000
                      );
                    } else {
                      //success
                      this.$message({
                        message: "取消收藏成功",
                        type: "success",
                        center: true,
                        duration: 2000
                      });
                    }
                  },
                  err => {
                    this.$Loading.error();
                    this.$message({
                      message: "取消收藏动态失败:服务器异常",
                      type: "error",
                      center: true,
                      duration: 1000
                    });
                    setTimeout(
                      function() {
                        this.action.isCollect = true;
                      }.bind(this),
                      2000
                    );
                  }
                );
            },
            () => {
              this.action.isCollect = true;
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    }
  },
  mounted() {
    this.showCard = true;

    this.getAction();

    //接收刷新动态页面请求
    //不知道为什么会发送4次请求
    // EventVue.$on("refresh", message => {
    //   this.getAction();
    // });
  },
  computed: {
    permisstion: function() {
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.card-action-details {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 800px;
}
#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}

.main {
  min-height: 500px;
}

.header {
  width: 100%;
  height: 60px;
}
.user {
  width: 30%;
  float: left;
}
.avatar {
  width: 50px;
  float: left;
  border-radius: 50%;
}
.user-info {
  float: left;
  height: 60px;
}
#name {
  float: left;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  vertical-align: top;
}
#sex {
  float: left;
  margin-left: 10px;
}
.sex-img {
  width: 26px;
}
#type {
  clear: both;
  font-size: 16px;
  margin-left: 10px;
  text-align: left;
}
#address {
  width: 25%;
  font-size: 18px;
  float: left;
  color: #e24545;
}

#cost {
  width: 25%;
  font-size: 18px;
  float: left;
  color: #e24545;
}

#time {
  width: 20%;
  float: right;
  font-size: 18px;
  color: rgb(124, 71, 19);
}

.text {
  width: 80%;
  margin: 0 auto;
  font-size: 20px;
  color: #000000;
  font-weight: bold;
}
.img {
  margin-left: 5px;
  margin: 10px auto;
}
.btn {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 20%;
  height: 50px;
}
#name:hover {
  color: brown;
  text-decoration: underline;
}
#type {
  clear: both;
  font-size: 16px;
  margin-left: 10px;
  text-align: left;
  font-weight: bold;
  color: #7e0656;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* .content >>> img {
  max-width: 100%;
} */

.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 20px;
}

.tag {
  margin-bottom: 20px;
}
</style>
