<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="show" shadow="hover">
      <div slot="header">
        <span id="card-title">用户信息</span>
      </div>
      <div id="title">敬请期待</div>
    </el-card>
  </transition>
</template>

<script>
import ActionList from "@/components/action/ActionList";
export default {
  name: "UserDetails",
  components: { ActionList },
  data() {
    return {
      show: false,
      actionPages: []
    };
  },
  methods: {
    sure() {
      this.$message({
        message: "关注成功",
        type: "success",
        ceter: "true",
        duration: 2000
      });
    }
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
  max-width: 1200px;
  min-height: 800px;
}
#card-title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}

#title {
  font-size: 68px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
}
</style>
