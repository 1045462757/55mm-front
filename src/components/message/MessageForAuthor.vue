<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-message" shadow="never" v-show="showCard">
      <div slot="header">
        <span id="card-title">收到的请求</span>
      </div>
      <div v-loading="loading" element-loading-text="玩命加载中..." class="main">
        <div v-if="loadingSuccess">
          <MessageListForAuthor
            :message="message"
            v-for="(message,index) in messagePages"
            :key="index"
          ></MessageListForAuthor>
          <!--分页-->
          <div class="page" v-show="messagePage.showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="messages.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="messagePage.currentPage"
            ></el-pagination>
          </div>
          <Tip :tip="tip"></Tip>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="getMessageForAuthor()"></Tip>
      </div>
    </el-card>
  </transition>
</template>

<script>
import MessageListForAuthor from "@/components/message/MessageListForAuthor";
import Tip from "@/components/general/Tip";
export default {
  name: "MessageForAuthor",
  components: {
    MessageListForAuthor,
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
        errorMessage: "",
        emptyMessage: false
      },

      showCard: false,
      messagePage: {
        showPage: false,
        currentPage: 1
      },
      messages: [],
      messagePages: []
    };
  },
  methods: {
    //分页
    handleCurrentChange(currentPage) {
      this.messagePage.currentPage = currentPage;
      this.actionPages = this.actions.slice(
        (this.messagePage.currentPage - 1) * 10,
        this.messagePage.currentPage * 10
      );
    },

    /**
     * 获取约拍消息
     */
    getMessageForAuthor() {
      //状态初始化

      this.loading = true;
      this.loadingSuccess = false;
      this.messages = [];
      this.messagePages = [];
      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";
      this.tip.emptyMessage = "";
      this.messagePage.showPage = false;

      let data = {
        actionAuthorId: this.$store.state.userInfo.userId
      };

      this.$http
        .get(this.globalApi.RetrieveMessageForActionAuthorApi, { params: data })
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
              if (response.data.data.messageList.length == 0) {
                this.tip.show = true;
                this.tip.emptyMessage = true;
              } else {
                this.messages = response.data.data.messageList;
                this.messagePages = this.messages.slice(
                  (this.messagePage.currentPage - 1) * 10,
                  this.messagePage.currentPage * 10
                );
                this.messagePage.showPage = true;
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
    this.getMessageForAuthor();
  }
};
</script>

<style scoped>
.card-message {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 500px;
}

#card-title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}

.main {
  width: 95%;
  max-width: 950px;
  margin: 0 auto;
  min-height: 500px;
  border-radius: 20px;
}
</style>
