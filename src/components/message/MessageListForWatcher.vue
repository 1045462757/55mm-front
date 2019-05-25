<template>
  <el-card class="card-message-list" shadow="hover">
    <!--头部-->
    <div class="header">
      <!--用户信息-->
      <div class="user">
        <img class="avatar" :src="message.action.author.avatar">
        <div class="user-info">
          <router-link :to="{path:'/userDetails',query: {userId: message.action.author.userId}}">
            <span id="name">{{message.action.author.name}}</span>
          </router-link>
          <div id="sex">
            <img class="sex-img" src="@/assets/male.png" v-if="message.action.author.sex=='男'">
            <img class="sex-img" src="@/assets/female.png" v-else>
          </div>
          <div id="type">{{message.action.author.type}}</div>
        </div>
      </div>

      <!--时间-->
      <span id="time">
        <Time :time="message.time"></Time>
      </span>
    </div>

    <!--动态标题-->
    <div class="action-title">
      <router-link :to="{path:'/actionDetails',query: {actionId: message.action.actionId}}">
        <span id="action-name">{{message.action.title}}</span>
      </router-link>
    </div>

    <!--底部操作按钮-->
    <div class="bottom">
      <div v-if="message.isAccept=='未读'">
        <span id="tip">对方还未答复你哦！</span>
      </div>
      <div v-else-if="message.isAccept=='拒绝'">
        <el-alert
          class="alert"
          title="您被拒绝了哦 ┭┮﹏┭┮"
          type="error"
          effect="dark"
          :closable="false"
          show-icon
          center
        ></el-alert>
      </div>
      <div v-else-if="message.isAccept=='接受'">
        <el-alert
          class="alert"
          title="对方接受了您的约拍请求"
          type="success"
          effect="dark"
          :closable="false"
          show-icon
          center
        ></el-alert>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "MessageListForAuthor",
  data() {
    return {};
  },
  props: {
    message: Object
  },
  methods: {
    accept() {
      this.$emit("accept");
    },
    refuse() {
      this.$emit("refuse");
    }
  },
  mounted() {}
};
</script>

<style scoped>
.card-message-list {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 950px;
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
  width: 60px;
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
  font-weight: bold;
  color: #7e0656;
}

#time {
  width: 20%;
  float: right;
  font-size: 18px;
  color: #a04747;
}

.action-title {
  width: 100%;
  margin: 0px auto;
  margin-bottom: 20px;
}

#action-name {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.bottom {
  width: 100%;
  margin: 0 auto;
}

#name:hover,
#action-name:hover {
  color: brown;
  text-decoration: underline;
}

#tip {
  font-size: 24px;
  font-weight: bold;
}

.btn {
  margin-top: 20px;
  width: 10%;
  height: 50px;
}

.alert {
  width: 30%;
  margin: 0 auto;
  height: 50px;
}
</style>
