<template>
  <transition name="el-zoom-in-bottom">
    <el-card class="box-card" v-show="show" shadow="hover">
      <div slot="header" class="clearfix">
        <span id="title">时间轨迹</span>
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2019/5/30" placement="top">
            <el-card class="card" shadow="hover">
              <h1>V1.0</h1>
              <span id="link">
                Github->
                <a href="https://github.com/1045462757/55mm" target="_Blank">55mm</a>
              </span>
              <br>
              <span id="time">2019年5月30日15:19:23</span>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </transition>
</template>

<script scoped>
export default {
  name: "About",
  data() {
    return {
      show: false
    };
  },
  methods: {},
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 1200px;
}
.clearfix {
  font-size: 20px;
}

.block {
  width: 95%;
  margin: 0 auto;
}

.card {
  margin-top: 20px;
}
.card:hover {
  background: #c8cfd4;
}
#tip {
  color: brown;
}
p {
  font-size: 18px;
}
a:hover {
  color: brown;
  text-decoration: underline;
}
#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 5px;
}

#link {
  font-size: 20px;
}

#time {
  font-size: 14px;
}
</style>