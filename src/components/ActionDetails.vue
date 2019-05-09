<template>
  <transition name="el-zoom-in-center">
    <el-card class="action-details" v-show="show">
      <!--头部-->
      <div class="header">
        <!--用户信息-->
        <div class="user">
          <img class="avatar" :src="action.avatar">
          <div class="user-info">
            <router-link :to="{path:'/userDetails',query: {userId: action.actionId}}">
              <span id="name">{{action.name}}</span>
            </router-link>
            <div id="sex">
              <img class="sex-img" src="@/assets/male.png" v-if="action.sex=='男'">
              <img class="sex-img" src="@/assets/female.png" v-else>
            </div>
            <div id="type">{{action.type}}</div>
          </div>
        </div>

        <!--地区-->
        <span id="address">{{action.address}}</span>

        <!--时间-->
        <span id="time">{{action.time}}</span>
      </div>

      <!--文字介绍-->
      <div class="text">
        <p>{{action.text}}</p>
      </div>

      <!--图片-->
      <div class="image">
        <!-- <img class="img" v-for="(image,index) in action.images" :key="index" :src="image"> -->
        <el-image
          class="img"
          fit="fill"
          v-for="(image,index) in action.images"
          :key="index"
          :src="image"
        ></el-image>
      </div>
      <el-button type="primary" round id="btn" @click="sure()" :disabled="click">约拍TA</el-button>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: "ActionDetails",
  data() {
    return {
      click: false,
      show: false,
      action: {},
      actions: [
        {
          actionId: 1,
          avatar:
            "http://www.shehuishe.com/files/2016/02/57a3bfaf-c52f-462a-a5da-f41c888f4d2c_T100x100.jpg",
          name: "瑾逸小七",
          sex: "女",
          type: "摄影师",
          address: "河北 秦皇岛",
          time: " 5分钟前",
          text:
            "北京丫头胶片女摄一枚~阿那亚胶片写真~不互免~胶片成本过高~北京地区长期约拍-付费拍胶片写真-送组数码写真 （6张）",
          images: [
            "http://image.shehuiapp.com/u/30926/30926_033778220_1555905247454.jpg/hd",
            "http://image.shehuiapp.com/u/30926/30926_038275641_1555905249304.jpg/hd",
            "http://image.shehuiapp.com/u/30926/30926_032829262_1555905250476.jpg/hd",
            "http://image.shehuiapp.com/u/30926/30926_030322113_1555905251657.jpg/hd",
            "http://image.shehuiapp.com/u/30926/30926_036491774_1555905253512.jpg/hd",
            "http://image.shehuiapp.com/u/30926/30926_030755205_1555905253934.jpg/hd"
          ]
        },
        {
          actionId: 2,
          avatar:
            "https://wx.qlogo.cn/mmopen/vi_32/hKGMDKBY0E1arHaj5SnXBFXDnhrRu6DGuLHAdKCEmmBAico1l7FKtSfncvzaKuiauyX460liaIzWmjaUWQPrD6LdA/132",
          name: "杨可人er",
          sex: "女",
          type: "模特",
          address: "山东 烟台",
          time: " 7分钟前",
          text: "适合各种风格 节假日 寒暑假有空 不接受私房暴露的 （5张）",
          images: [
            "http://image.shehuiapp.com/u/823670/823670_022193221_1555905751812.jpeg/hd",
            "http://image.shehuiapp.com/u/823670/823670_028528532_1555905751813.jpeg/hd",
            "http://image.shehuiapp.com/u/823670/823670_026391033_1555905751813.jpeg/hd",
            "http://image.shehuiapp.com/u/823670/823670_026620684_1555905751813.jpeg/hd",
            "http://image.shehuiapp.com/u/823670/823670_026012615_1555905751813.jpeg/hd"
          ]
        },
        {
          actionId: 3,
          avatar:
            "http://image.shehuiapp.com/u/69355/69355_035561410_1545828266668.jpg/t150",
          name: "老杰子",
          sex: "男",
          type: "摄影师",
          address: "北京 朝阳",
          time: " 13分钟前",
          text:
            "5.1假期我个人暂时没有安排约拍人像摄影的也可以，找我研究一下拍摄主题之类的。(7张)",
          images: [
            "http://image.shehuiapp.com/u/69355/69355_034278841_1555899281238.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_038656962_1555899291628.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_037101823_1555899299958.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_039754724_1555899308155.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_038707795_1555899355502.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_034746286_1555899419809.jpg/hd",
            "http://image.shehuiapp.com/u/69355/69355_032221998_1555899515132.jpg/hd"
          ]
        },
        {
          actionId: 4,
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6HVAP67T8ic6mOmibDGkHaGLbBickrONia5icnyH7WsUQaTKGNYPNcc8mKnrZjRSpf2oRuPLZDlia2cCQ/132",
          name: "Walter",
          sex: "男",
          type: "摄影师",
          address: "上海",
          time: "36分钟前",
          text:
            "本人曾是英国nousha工作室的全职商业摄影师目前回国做自由摄影师接收范围，约拍，旅拍，儿童，婴儿，婚纱，产品约拍的价格" +
            "600/2h/20张精修，800/3h，30张精修拍摄风格多变，可拍欧美风，日韩风如有旅拍短片和企业宣传片需求也可以找我，拍摄短片我们有五人专业团队设备专业，态度专业，价格合理",
          images: [
            "http://image.shehuiapp.com/u/823616/823616_030117770_1555815527090.jpg/hd",
            "http://image.shehuiapp.com/u/823616/823616_030330351_1555815623854.jpg/hd",
            "http://image.shehuiapp.com/u/823616/823616_030707132_1555815710527.jpg/hd",
            "http://image.shehuiapp.com/u/823616/823616_031929233_1555815870464.jpg/hd",
            "http://image.shehuiapp.com/u/823616/823616_030610534_1555815974241.jpg/hd"
          ]
        },
        {
          actionId: 5,
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6HVAP67T8ic6mOmibDGkHaGLbBickrONia5icnyH7WsUQaTKGNYPNcc8mKnrZjRSpf2oRuPLZDlia2cCQ/132",
          name: "一拍ls",
          sex: "男",
          type: "摄影爱好者",
          address: "河南郑州",
          time: "5小时前",
          text: "毕业季约拍，价格低 （9张）",
          images: [
            "http://image.shehuiapp.com/u/812328/812328_029942101_1555916629388.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_027734172_1555916629390.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_023711663_1555916629390.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_027111544_1555916629391.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_023467545_1555916629391.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_020805706_1555916629391.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_025845867_1555916629391.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_026981618_1555916629391.jpg/hd",
            "http://image.shehuiapp.com/u/812328/812328_025021619_1555916629391.jpg/hd"
          ]
        },
        {
          actionId: 6,
          avatar:
            "http://image.shehuiapp.com/u/65367/65367_030230680_1555654704910.jpg/t150",
          name: "Lion",
          sex: "女",
          type: "摄影师",
          address: "上海",
          time: "36分钟前",
          text:
            "女摄～不互勉！少女风格（清新，甜美，日系，轻私房，汉服，和服）喜欢的小仙女来约吧～最近是花季哦～ （9张）",
          images: [
            "http://image.shehuiapp.com/u/65367/65367_038417440_1555915906815.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_036367591_1555915912736.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_035599402_1555915917517.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_033732573_1555915919040.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_035365354_1555915934369.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_038968525_1555915935572.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_039193886_1555915936881.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_039373827_1555915939123.jpg/hd",
            "http://image.shehuiapp.com/u/65367/65367_033930208_1555915939458.jpg/hd"
          ]
        },
        {
          actionId: 7,
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSPKCcVHWKcBeYCB6QqOQxXqJNY2varlgfcDeMUZROZjMhAOmm4SvwMTs3NZicicgCBhzicZF87Wezw/132",
          name: ":P",
          sex: "男",
          type: "摄影师",
          address: "重庆沙坪坝",
          time: "两天前",
          text:
            "重庆大学建筑学学生一枚，有比较多的经验然后图虫签约摄影师 （6张）",
          images: [
            "http://image.shehuiapp.com/u/823680/823680_015839401_1555914564045.jpg/hd",
            "http://image.shehuiapp.com/u/823680/823680_016051422_1555914564050.jpg/hd",
            "http://image.shehuiapp.com/u/823680/823680_010992165_1555914564055.jpg/hd",
            "http://image.shehuiapp.com/u/823680/823680_019273716_1555914564057.jpg/hd",
            "http://image.shehuiapp.com/u/823680/823680_017196963_1555914564052.jpg/hd",
            "http://image.shehuiapp.com/u/823680/823680_016599634_1555914564054.jpg/hd"
          ]
        },
        {
          actionId: 8,
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq8zlTL0rUaKpWVEjiaU9JwDEv0LarPbA0ZedsLHgMUA46rPoHTxXyROvVfRp1HxkQXmkpoQmTBlGg/132",
          name: "凯迪",
          sex: "女",
          type: "模特",
          address: "湖北武汉",
          time: "3天前",
          text: "各种风格都可以驾驭，欢迎来找我约拍✨ （4张）",
          images: [
            "http://image.shehuiapp.com/u/823673/823673_027923541_1555910144395.jpg/hd",
            "http://image.shehuiapp.com/u/823673/823673_027817742_1555910144396.jpg/hd",
            "http://image.shehuiapp.com/u/823673/823673_028614983_1555910144396.jpg/hd",
            "http://image.shehuiapp.com/u/823673/823673_024798374_1555910144396.jpg/hd"
          ]
        },
        {
          actionId: 9,
          avatar:
            "http://image.shehuiapp.com/u/51440/51440_028788801_1520509374371.jpg/t150",
          name: "@夜喵munz",
          sex: "女",
          type: "摄影师",
          address: "北京",
          time: "5天前",
          text: "喜欢日系的bb们可以来约～不接创作 （3张）",
          images: [
            "http://image.shehuiapp.com/u/51440/51440_028272041_1555909461710.jpg/hd",
            "http://image.shehuiapp.com/u/51440/51440_025033162_1555909461710.jpg/hd",
            "http://image.shehuiapp.com/u/51440/51440_027644693_1555909461710.jpg/hd"
          ]
        },
        {
          actionId: 10,
          avatar:
            "http://image.shehuiapp.com/u/67840/67840_017468121_1511951911922.jpeg/t150",
          name: "薛",
          sex: "女",
          type: "模特",
          address: "上海",
          time: "8天前",
          text: "身高165 想拍一组商务 （2张）",
          images: [
            "http://image.shehuiapp.com/u/67840/67840_011250952_1555906562520.jpeg/hd",
            "http://image.shehuiapp.com/u/67840/67840_018030161_1555906562513.jpeg/hd"
          ]
        },
        {
          actionId: 11,
          avatar:
            "http://www.shehuishe.com/files/2017/03/1d9abd622ee54092b93ba5cac6eebc8e_T150x150.jpg",
          name: "栗子-不吃鱼",
          sex: "男",
          type: "摄影师",
          address: "北京",
          time: "11天前",
          text: "4.14周日拍摄一组胶片样图，有灵性衣服多的姑娘快点我 （6张）",
          images: [
            "http://image.shehuiapp.com/u/59021/59021_013291721_1555766813949.jpg/hd",
            "http://image.shehuiapp.com/u/59021/59021_017266732_1555766863283.jpg/hd",
            "http://image.shehuiapp.com/u/59021/59021_012024924_1555766904970.jpg/hd",
            "http://image.shehuiapp.com/u/59021/59021_015890393_1555766891025.jpg/hd",
            "http://image.shehuiapp.com/u/59021/59021_018267865_1555766921838.jpg/hd",
            "http://image.shehuiapp.com/u/59021/59021_015569416_1555766935744.jpg/hd"
          ]
        },
        {
          actionId: 12,
          avatar:
            "http://image.shehuiapp.com/u/822505/822505_036337370_1553935009948.jpg/t150",
          name: "猩猩",
          sex: "女",
          type: "模特",
          address: "北京海淀",
          time: "14天前",
          text: "约拍写真、旅拍、私房 这些是近期拍的一组 （9张）",
          images: [
            "http://image.shehuiapp.com/u/822505/822505_031884410_1555813052568.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_037334271_1555813054072.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_030388952_1555813055363.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_036402553_1555813056034.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_033876344_1555813057118.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_032674295_1555813058009.jpg/hd",
            "http://image.shehuiapp.com/u/822505/822505_030464466_1555813058435.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_039707287_1555813058878.JPG/hd",
            "http://image.shehuiapp.com/u/822505/822505_032736948_1555813059247.jpg/hd"
          ]
        }
      ]
    };
  },
  mounted() {
    var actionId = this.$route.query.actionId;
    for (var i = 0; i < this.actions.length; i++) {
      if (this.actions[i].actionId == actionId) {
        this.action = this.actions[i];
      }
    }
    this.show = true;
  },
  methods: {
    sure() {
      this.$message({
        message: "假装约拍成功",
        type: "success",
        center: "true",
        duration: 2000
      });
      this.click = true;
    }
  }
};
</script>

<style>
.action-details {
  width: 95%;
  margin: 20px auto;
  border-radius: 20px;
  max-width: 1200px;
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
  width: 50px;
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
}
#address {
  width: 45%;
  font-size: 18px;
  float: left;
  color: #e24545;
}
#time {
  width: 10%;
  float: right;
  font-size: 18px;
  color: rgb(124, 71, 19);
}

.text {
  width: 80%;
  margin: 0 auto;
  font-size: 20px;
  color: #000000;
  font-weight: bold;
}
.image {
  margin-top: 20px;
}
.img {
  margin-left: 5px;
}
#btn {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 20%;
  height: 50px;
}
</style>
