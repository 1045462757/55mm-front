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
export default {
  name: "App",
  components: { Header, Footer }
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
  background: #e0e0e0;
}
* {
  padding: 0px;
  margin: 0px;
}
</style>
