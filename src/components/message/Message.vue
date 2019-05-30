<template>
  <transition name="el-zoom-in-center">
    <el-card class="main-card" v-show="showCard" shadow="never">
      <div class="user-left">
        <MessageMenu></MessageMenu>
      </div>

      <div class="user-right">
        <router-view></router-view>
      </div>
      <BackTop :height="100" :bottom="30" :duration="1500">
        <div class="top el-icon-top"></div>
      </BackTop>
    </el-card>
  </transition>
</template>

<script>
import MessageMenu from "@/components/message/MessageMenu";
export default {
  name: "Message",
  components: { MessageMenu },
  data() {
    return {
      showCard: false
    };
  },
  mounted() {
    this.showCard = true;
  }
};
</script>

<style scoped>
.main-card {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 800px;
}
.user-left {
  width: 10%;
  margin-top: 20px;
  float: left;
}
.user-right {
  width: 90%;
  float: right;
}

.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>