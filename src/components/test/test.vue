<template>
  <transition name="el-zoom-in-center">
    <el-card class="box-card" v-show="showbox" shadow="hover">
      <div slot="header" class="clearfix">
        <span id="title">测试</span>
      </div>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: "Test",
  components: {},
  data() {
    return {
      showbox: false
    };
  },
  methods: {
  },
  mounted() {
    this.showbox = true;
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
  min-height: 500px;
}
.clearfix {
  font-size: 20px;
}

.tip {
  width: 400px;
}

</style>
