<template>
  <div class="footer">
    <span>© 2019 Design By tiga</span>
    <span id="copyright">
      <a href="http://www.miitbeian.gov.cn" target="_blank">渝ICP备19005367号</a>
    </span>
    <div class="about">
      <div class="tip">
        <router-link :to="{path:'/about'}">关于本站</router-link>
      </div>
      <div class="tip">
        <router-link :to="{path:'/about'}">联系我们</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  margin-top: 50px;
  font-size: 18px;
  height: 50px;
  width: 100%;
  /* position: fixed; */
  bottom: 0;
  text-align: center;
  line-height: 50px;
  color: teal;
}
a {
  color: teal;
  text-decoration: none;
}
#copyright {
  margin-left: 20px;
}
.about {
  width: 20%;
  margin: 0 auto;
}
.tip {
  width: 50%;
  float: left;
}
.tip:hover,
a:hover {
  color: brown;
  text-decoration: underline;
}
</style>