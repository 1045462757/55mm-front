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

    <!--空数据(动态)-->
    <div v-if="tip.emptyAction" class="error">
      <span>咦,没有动态呀</span>
      <br>
      <span>^_^</span>
      <br>
      <br>
      <el-button type="primary" @click="writeAction()" round icon="el-icon-edit">去写一个?</el-button>
    </div>

    <!--空数据(消息)-->
    <div v-if="tip.emptyMessage" class="error">
      <span>咦,没有消息呀</span>
      <br>
      <span>^_^</span>
    </div>

    <!--空数据(关注)-->
    <div v-if="tip.emptyFocus" class="error">
      <span>咦,没有关注呀</span>
      <br>
      <span>^_^</span>
    </div>

    <!--空数据(粉丝)-->
    <div v-if="tip.emptyFans" class="error">
      <span>咦,没有粉丝呀</span>
      <br>
      <span>^_^</span>
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
    },
    writeAction() {
      this.$router.push("/write");
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
