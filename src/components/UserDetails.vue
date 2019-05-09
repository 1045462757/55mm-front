<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="show">
      <h1>用户信息</h1>
      <h2>尚在开发</h2>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: "ActionDetails",
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped>
.action-details {
  width: 95%;
  margin: 20px auto;
  border-radius: 20px;
  height: 1200px;
  max-width: 1200px;
}

.header {
  width: 100%;
  height: 60px;
}
</style>
