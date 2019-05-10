<template>
  <transition name="el-zoom-in-bottom">
    <el-card class="box-card" v-show="showbox" shadow="hover">
      <div slot="header" class="clearfix">
        <span id="title">测试</span>
      </div>
      <a class="btn" @click="toggleShow">设置头像</a>
      <my-upload
        field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="200"
        :height="200"
        url="/upload"
        :params="params"
        :headers="headers"
        img-format="png"
      ></my-upload>
      <img :src="imgDataUrl">
    </el-card>
  </transition>
</template>

<script >
import myUpload from "vue-image-crop-upload";
export default {
  name: "About",
  components: {
    "my-upload": myUpload
  },
  data() {
    return {
      showbox: false,
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
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
}
</style>
