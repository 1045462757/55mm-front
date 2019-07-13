<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-admin" shadow="never" v-show="showCard">
      <div slot="header">
        <span id="title">后台管理</span>
      </div>
      <div v-loading="loading" element-loading-text="玩命加载中..." class="main">
        <div v-if="loadingSuccess">
          <el-table :data="userList" style="width: 100%" border height="600">
            <el-table-column prop="userId" label="用户Id" width="80"></el-table-column>
            <el-table-column prop="account" label="账号" width="100"></el-table-column>
            <el-table-column prop="registerTime" label="注册时间" width="180"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间" width="180"></el-table-column>
            <el-table-column prop="name" label="昵称" width="80"></el-table-column>
            <el-table-column prop="sex" label="性别" width="80"></el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="birthday" label="生日" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
            <el-table-column prop="qq" label="qq" width="120"></el-table-column>
            <el-table-column prop="weChat" label="微信" width="120"></el-table-column>
          </el-table>

          <Tip :tip="tip"></Tip>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="refresh()"></Tip>
      </div>
    </el-card>
  </transition>
</template>

<script>
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
export default {
  name: "Admin",
  store,
  components: { Tip },
  data() {
    return {
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyFans: false
      },

      showCard: false,

      userList: []
    };
  },
  methods: {
    refresh() {
      //状态初始化
      this.loading = true;
      this.loadingSuccess = false;
      this.userList = [];
      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";

      let data = {
        // userId: this.$store.state.userInfo.userId
      };

      this.$http.get(this.globalApi.GetAllUsersApi, { params: data }).then(
        response => {
          console.log(response.data);
          this.loading = false;
          this.loadingSuccess = true;
          if (response.data.errorCode != null) {
            console.log(response.data.errorMessage);
            this.tip.show = true;
            this.tip.businessError = true;
            this.tip.errorMessage = response.data.errorMessage;
          } else {
            if (response.data.length == 0) {
              this.tip.show = true;
              this.tip.emptyFans = true;
            } else {
              this.userList = response.data;

              //存入vuex;
              // this.$store.commit("addFans", response.data.data);
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
    }
  },
  mounted() {
    this.showCard = true;

    this.refresh();
  }
};
</script>

<style scoped>
.card-admin {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 500px;
}

.main {
  width: 95%;
  /* max-width: 950px; */
  margin: 0 auto;
  min-height: 500px;
}

#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}
</style>
