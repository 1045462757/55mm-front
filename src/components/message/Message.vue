<template>
  <transition name="el-zoom-in-center">
    <el-card class="main-card" v-show="showCard" shadow="never">
      <div class="user-left">
        <MessageMenu></MessageMenu>
      </div>

      <div class="user-right">
        <router-view></router-view>
      </div>
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
  width: 20%;
  margin-top: 20px;
  float: left;
}
.user-right {
  width: 80%;
  float: right;
}
</style>