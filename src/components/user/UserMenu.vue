<template>
  <el-menu default-active="2" @select="handleSelect" :collapse="true">
    <el-submenu index="1" class="menu-mainItem">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span class="menu-item">用户</span>
      </template>
      <el-menu-item-group title="我">
        <el-menu-item index="1-1" class="menu-minItem el-icon-user-solid">个人信息</el-menu-item>
        <el-menu-item index="1-2" class="menu-minItem el-icon-edit">修改密码</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="其他">
        <el-menu-item index="1-3" class="menu-minItem el-icon-star-on">我的关注</el-menu-item>
        <el-menu-item index="1-4" class="menu-minItem el-icon-s-check">我的粉丝</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2" class="menu-mainItem">
      <template slot="title">
        <i class="el-icon-camera-solid"></i>
        <span class="menu-item">约拍</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" class="menu-minItem el-icon-star-off">我的收藏</el-menu-item>
        <el-menu-item index="2-2" class="menu-minItem el-icon-camera-solid">我的约拍</el-menu-item>
        <!-- <el-menu-item index="2-3" class="menu-minItem el-icon-camera-solid">我发起的约拍</el-menu-item> -->
        <!-- <el-menu-item index="2-4" class="menu-minItem el-icon-document">我的草稿</el-menu-item> -->
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  methods: {
    handleSelect(key, keyPath) {
      //  console.log(key, keyPath);
      if (key == "1-1") {
        this.$router.push("/user/information");
      } else if (key == "1-2") {
        this.$router.push("/user/modifyPassword");
      } else if (key == "1-3") {
        this.$router.push("/user/focus");
      } else if (key == "1-4") {
        this.$router.push("/user/fans");
      } else if (key == "2-1") {
        this.$router.push("/user/collections");
      } else if (key == "2-2") {
        this.$router.push("/user/myActions");
      } else if (key == "2-3") {
        // this.$router.push("/user/myCollection");
      }
    }
  }
};
</script>

<style scoped>
.menu-item {
  font-size: 24px;
  font-weight: bold;
  color: purple;
}
.menu-minItem {
  font-size: 18px;
  font-weight: bold;
}
</style>

