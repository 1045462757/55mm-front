<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-myActions" shadow="never" v-show="showCard">
      <div slot="header">
        <span id="title">我的约拍</span>
      </div>
      <div v-loading="loading" element-loading-text="玩命加载中..." class="main">
        <div v-if="loadingSuccess">
          <ActionList :action="action" v-for="(action,index) in actionPages" :key="index"></ActionList>
          <!--分页-->
          <div class="page" v-show="myActionsPage.showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="actions.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="myActionsPage.currentPage"
            ></el-pagination>
          </div>
          <Tip :tip="tip"></Tip>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="refresh()"></Tip>
      </div>
    </el-card>
    <BackTop :height="100" :bottom="30" :duration="1500">
      <div class="top el-icon-top"></div>
    </BackTop>
  </transition>
</template>

<script>
import ActionList from "@/components/action/ActionList";
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
export default {
  name: "MyActions",
  store,
  components: { ActionList, Tip },
  data() {
    return {
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyAction: false
      },

      myActionsPage: {
        showPage: false,
        currentPage: 1
      },

      showCard: false,
      actions: [],
      actionPages: []
    };
  },
  methods: {
    //分页
    handleCurrentChange(currentPage) {
      this.myActionsPage.currentPage = currentPage;
      this.actionPages = this.actions.slice(
        (this.myActionsPage.currentPage - 1) * 10,
        this.myActionsPage.currentPage * 10
      );
    },

    //获取动态
    refresh() {
      //vuex存在数据
      if (this.$store.state.myActions.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;
        this.actions = this.$store.state.myActions;
        this.actionPages = this.actions.slice(
          (this.myActionsPage.currentPage - 1) * 10,
          this.myActionsPage.currentPage * 10
        );
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.actions = [];
        this.actionPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.myActionsPage.showPage = false;

        let data = {
          userId: this.$store.state.userInfo.userId,
          type: 1
        };

        this.$http
          .get(this.globalApi.RetrieveActionListApi, { params: data })
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
                  this.tip.emptyAction = true;
                } else {
                  this.actions = response.data.data;
                  this.actionPages = this.actions.slice(
                    (this.myActionsPage.currentPage - 1) * 10,
                    this.myActionsPage.currentPage * 10
                  );
                  this.myActionsPage.showPage = true;

                  //存入vuex;
                  this.$store.commit("addMyActions", response.data.data);
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
