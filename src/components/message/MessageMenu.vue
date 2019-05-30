<template>
  <el-menu @select="handleSelect" :collapse="true">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message-solid"></i>
      </template>
      <el-menu-item index="1-1" class="menu-minItem el-icon-message-solid">收到的请求</el-menu-item>
      <el-menu-item index="1-2" class="menu-minItem el-icon-message-solid">发起的请求</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "MessageMenu",
  methods: {
    handleSelect(key, keyPath) {
      //  console.log(key, keyPath);
      if (key == "1-1") {
        this.$router.push("/message/forAuthor");
      } else if (key == "1-2") {
        this.$router.push("/message/forWatcher");
      }
    }
  }
};
</script>

<style scoped>
.menu-minItem {
  font-size: 18px;
  font-weight: bold;
}
</style>

