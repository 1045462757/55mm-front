<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="show" shadow="hover">
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
.avatar {
  width: 40%;
  height: 450px;
  float: left;
}
.img {
  border-radius: 50%;
  width: 280px;
  margin-top: 80px;
}
.info {
  width: 60%;
  height: 450px;
  float: right;
  letter-spacing: 10px;
}
#name {
  margin-top: 80px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
#name-text,
#type-text,
#sex-text,
#introduction-text {
  color: brown;
}
#sex,
#type,
#introduction {
  margin-top: 30px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
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
