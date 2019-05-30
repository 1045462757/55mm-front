<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-myActions" shadow="never" v-show="showCard">
      <div slot="header">
        <span id="title">我的粉丝</span>
      </div>
      <div v-loading="loading" element-loading-text="玩命加载中..." class="main">
        <div v-if="loadingSuccess">
          <UserList :user="user" v-for="(user,index) in fansPages" :key="index"></UserList>
          <!--分页-->
          <div class="page" v-show="fansPage.showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="fans.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="fansPage.currentPage"
            ></el-pagination>
          </div>
          <Tip :tip="tip"></Tip>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="refresh()"></Tip>
      </div>
    </el-card>
  </transition>
</template>

<script>
import UserList from "@/components/user/UserList";
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
export default {
  name: "MyFans",
  store,
  components: { UserList, Tip },
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

      fansPage: {
        showPage: false,
        currentPage: 1
      },

      showCard: false,
      fans: [],
      fansPages: []
    };
  },
  methods: {
    //分页
    handleCurrentChange(currentPage) {
      this.fansPage.currentPage = currentPage;
      this.fansPages = this.fans.slice(
        (this.fansPage.currentPage - 1) * 10,
        this.fansPage.currentPage * 10
      );
    },

    //获取动态
    refresh() {
      //vuex存在数据
      if (this.$store.state.fans.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;
        this.fans = this.$store.state.fans;
        this.fansPages = this.fans.slice(
          (this.fansPage.currentPage - 1) * 10,
          this.fansPage.currentPage * 10
        );
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.fans = [];
        this.fansPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.fansPage.showPage = false;

        let data = {
          userId: this.$store.state.userInfo.userId,
        };

        this.$http
          .get(this.globalApi.RetrieveFansApi, { params: data })
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
                if (response.data.data.length == 0) {
                  this.tip.show = true;
                  this.tip.emptyFans = true;
                } else {
                  this.fans = response.data.data;
                  this.fansPages = this.fans.slice(
                    (this.fansPage.currentPage - 1) * 10,
                    this.fansPage.currentPage * 10
                  );
                  this.fansPage.showPage = true;

                  //存入vuex;
                  this.$store.commit("addFans", response.data.data);
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
    }
  },
  mounted() {
    this.showCard = true;

    this.refresh();
  }
};
</script>

<style scoped>
.card-myActions {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 500px;
}

.main {
  width: 95%;
  max-width: 950px;
  margin: 0 auto;
  min-height: 500px;
}

#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}
</style>
