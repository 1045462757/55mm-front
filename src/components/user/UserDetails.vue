<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="show" shadow="hover">
      <div class="avatar">
        <img
          src="http://image.shehuiapp.com/u/67840/67840_011250952_1555906562520.jpeg/s300"
          class="img"
        >
      </div>
      <div class="info">
        <div id="name">
          <span id="name-text">昵称:</span>薛
        </div>
        <div id="sex">
          <span id="sex-text">性别:</span>女
        </div>
        <div id="type">
          <span id="type-text">身份:</span>模特
        </div>
        <div id="introduction">
          <span id="introduction-text">简介:</span>欢迎互勉约拍，时间工作日晚或周末，拍摄300张以上，精修10张以上。下方是历史样片。
        </div>
      </div>
      <!-- <el-button type="primary" round @click="sure()" :disabled="click">关注TA</el-button> -->
      <div id="title">TA发布的约拍</div>
      <ActionList :action="action" v-for="(action,index) in actionPages" :key="index"></ActionList>
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
      actionPages: [
        {
          actionId: 10,
          avatar:
            "http://image.shehuiapp.com/u/67840/67840_017468121_1511951911922.jpeg/t150",
          name: "薛",
          sex: "女",
          type: "模特",
          address: "上海",
          time: "8天前",
          text: "身高165 想拍一组商务 （2张）",
          images: [
            "http://image.shehuiapp.com/u/67840/67840_011250952_1555906562520.jpeg/s300",
            "http://image.shehuiapp.com/u/67840/67840_018030161_1555906562513.jpeg/s300"
          ]
        }
      ]
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
  font-size: 28px;
  margin-top: 50px;
}
</style>
