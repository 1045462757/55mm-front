<template>
  <div id="app">
    <!--头部导航栏-->
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import store from "@/vuex/store.js";
export default {
  name: "App",
  store,
  components: { Header, Footer },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("userInfo")) {
      this.$store.commit(
        "addUserInfo",
        JSON.parse(sessionStorage.getItem("userInfo"))
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(this.$store.state.userInfo)
      );
    });
  }
};
</script>

<style>
#app {
  font-family: "微软雅黑", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: #e0e0e0 !important;
}
* {
  padding: 0px;
  margin: 0px;
}
</style>
