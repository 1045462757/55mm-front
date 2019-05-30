<template>
  <el-card class="card-action-list" shadow="hover">
    <!--头部-->
    <div class="header">
      <!--用户信息-->
      <div class="user">
        <img class="avatar" :src="action.author.avatar">
        <div class="user-info">
          <router-link :to="{path:'/userDetails',query: {userId: action.author.userId}}">
            <span id="name">{{action.author.name}}</span>
          </router-link>
          <div id="sex">
            <img class="sex-img" src="@/assets/male.png" v-if="action.author.sex=='男'">
            <img class="sex-img" src="@/assets/female.png" v-else-if="action.author.sex=='女'">
          </div>
          <div id="type">{{action.author.type}}</div>
        </div>
      </div>

      <!--地区-->
      <span id="address">{{action.address}}</span>

      <!--价格-->
      <span id="cost">{{action.cost}}元</span>

      <!--时间-->
      <span id="time">
        <Time :time="action.time"></Time>
      </span>
    </div>

    <!--文字介绍-->
    <div class="text">
      <router-link :to="{path:'/actionDetails',query: {actionId: action.actionId}}">
        <span id="title">{{action.title}}</span>
      </router-link>
    </div>

    <!--图片-->
    <div class="image">
      <el-image
        class="img"
        fit="fill"
        v-for="(image,index) in images"
        :key="index"
        :src="image"
        lazy
      ></el-image>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ActionList",
  data() {
    return {
      images: []
    };
  },
  props: {
    action: Object
  },
  mounted() {
    if (this.action.images != null) {
      this.images = this.action.images.slice(0, 3);
    }
  }
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
#address {
  width: 25%;
  font-size: 18px;
  float: left;
  color: #e24545;
}

#cost {
  width: 25%;
  font-size: 18px;
  float: left;
  color: #e24545;
}

#time {
  width: 20%;
  float: right;
  font-size: 18px;
  color: #a04747;
}

.text {
  width: 80%;
  margin: 20px auto;
  font-size: 20px;
}
#title:hover,
#name:hover {
  color: brown;
  text-decoration: underline;
}
#title {
  color: #000000;
  font-weight: bold;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}

.image {
  width: 100%;
  margin-top: 20px;
}
.img {
  width: 200px;
  height: 200px;
  margin-left: 10px;
}
</style>
