<template>
  <transition name="el-zoom-in-bottom">
    <el-card class="box-card" v-show="showbox" shadow="hover">
      <div slot="header" class="clearfix">
        <span id="title">测试</span>
      </div>
      <!--动画引入animate.css库,icon引入font-awesome图标库  -->
      <VueStar animate="animated rubberBand" color="#F05654">
        <a slot="icon" class="el-icon-star-on tip" @click="handleClick"></a>
      </VueStar>
    </el-card>
  </transition>
</template>

<script>
import VueStar from "vue-star";
export default {
  name: "Test",
  components: {
    VueStar
  },
  data() {
    return {
      showbox: false
    };
  },
  methods: {
    handleClick() {
      //do something
    }
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

.tip{
  /* width: 40px; */
}
</style>
