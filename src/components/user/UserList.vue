<template>
  <el-card class="card-action-list" shadow="hover">
    <!--头部-->
    <div class="header">
      <!--用户信息-->
      <div class="user">
        <img class="avatar" :src="user.avatar">
        <div class="user-info">
          <router-link :to="{path:'/userDetails',query: {userId: user.userId}}">
            <span id="name">{{user.name}}</span>
          </router-link>
          <div id="sex">
            <img class="sex-img" src="@/assets/male.png" v-if="user.sex=='男'">
            <img class="sex-img" src="@/assets/female.png" v-else-if="user.sex=='女'">
          </div>
          <div id="type">{{user.type}}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {};
  },
  props: {
    user: Object
  },
  mounted() {}
};
</script>

<style scoped>
.card-action-list {
  width: 100%;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 950px;
}

.header {
  width: 100%;
  height: 60px;
}
.user {
  width: 30%;
  float: left;
}
.avatar {
  width: 60px;
  float: left;
  border-radius: 50%;
}
.user-info {
  float: left;
  height: 60px;
}
#name {
  float: left;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  vertical-align: top;
}
#sex {
  float: left;
  margin-left: 10px;
}
.sex-img {
  width: 26px;
}
#type {
  clear: both;
  font-size: 16px;
  margin-left: 10px;
  text-align: left;
  font-weight: bold;
  color: #7e0656;
}

#name:hover {
  color: brown;
  text-decoration: underline;
}

.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>
