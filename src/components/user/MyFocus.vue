<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-myActions" shadow="never" v-show="showCard">
      <div slot="header">
        <span id="title">我的关注</span>
      </div>
      <div v-loading="loading" element-loading-text="玩命加载中..." class="main">
        <div v-if="loadingSuccess">
          <UserList :user="user" v-for="(user,index) in focusPages" :key="index"></UserList>
          <!--分页-->
          <div class="page" v-show="focusPage.showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="focus.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="focusPage.currentPage"
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
  name: "Myfocus",
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
        emptyfocus: false
      },

      focusPage: {
        showPage: false,
        currentPage: 1
      },

      showCard: false,
      focus: [],
      focusPages: []
    };
  },
  methods: {
    //分页
    handleCurrentChange(currentPage) {
      this.focusPage.currentPage = currentPage;
      this.focusPages = this.focus.slice(
        (this.focusPage.currentPage - 1) * 10,
        this.focusPage.currentPage * 10
      );
    },

    //获取动态
    refresh() {
      //vuex存在数据
      if (this.$store.state.focus.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;
        this.focus = this.$store.state.focus;
        this.focusPages = this.focus.slice(
          (this.focusPage.currentPage - 1) * 10,
          this.focusPage.currentPage * 10
        );
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.focus = [];
        this.focusPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.focusPage.showPage = false;

        let data = {
          userId: this.$store.state.userInfo.userId,
        };

        this.$http
          .get(this.globalApi.RetrieveFocusApi, { params: data })
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
                  this.tip.emptyFocus = true;
                } else {
                  this.focus = response.data.data;
                  this.focusPages = this.focus.slice(
                    (this.focusPage.currentPage - 1) * 10,
                    this.focusPage.currentPage * 10
                  );
                  this.focusPage.showPage = true;

                  //存入vuex;
                  this.$store.commit("addFocus", response.data.data);
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
