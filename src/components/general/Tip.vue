<template>
  <!--提示信息-->
  <div v-if="tip.show">
    <!--网络错误-->
    <div v-if="tip.netError" class="error">
      <span>呀,服务器出错了</span>
      <br>
      <span>┭┮﹏┭┮</span>
      <br>
      <br>
      <el-button type="primary" @click="refresh()" round icon="el-icon-refresh">刷新试试</el-button>
    </div>

    <!--业务错误-->
    <div v-if="tip.businessError" class="error">
      <span>呀,好像失败了啊</span>
      <br>
      <span>{{tip.errorMessage}}</span>
    </div>
  </div>
</template>

<script>
import EventVue from "@/utils/EventVue.js";
export default {
  name: "Tip",
  data() {
    return {
      // tip: {
      //   //是否显示提示
      //   show: false,
      //   //是否网络错误
      //   netError: false,
      //   //业务是否成功
      //   businessError: false,
      //   //业务失败消息
      //   errorMessage: "",
      // }
    };
  },
  props: {
    tip: Object
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style scoped>
.error {
  font-size: 40px;
  color: crimson;
  /* margin-top:  20px; */
}
</style>
