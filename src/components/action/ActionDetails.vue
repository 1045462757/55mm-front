<template>
  <transition name="el-zoom-in-center">
    <el-card class="card-action-details" v-show="showCard" shadow="hover">
      <div slot="header">
        <span id="title">约拍详情</span>
      </div>

      <div class="main" v-loading="loading" element-loading-text="玩命加载中...">
        <div v-if="loadingSuccess">
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
                  <img class="sex-img" src="@/assets/female.png" v-else>
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
            <p>{{action.title}}</p>
          </div>

          <!--正文-->
          <div class="image">
            <!-- <div v-html="action.content"></div> -->
            <el-image
              class="img"
              fit="fill"
              v-for="(image,index) in action.images"
              :key="index"
              :src="image"
            ></el-image>
          </div>
          <div v-if="!permisstion">
            <el-button
              type="primary"
              round
              class="btn"
              @click="watch()"
              :disabled="action.isWatched"
              v-if="!action.isWatched"
            >约拍TA</el-button>

            <el-button
              type="danger"
              round
              class="btn"
              @click="removeWatch()"
              :disabled="!action.isWatched"
              v-else
            >取消约拍</el-button>
          </div>
          <div v-else>
            <el-button type="primary" round class="btn" @click="modify()">修改</el-button>
            <el-button type="danger" round class="btn" @click="remove()">删除</el-button>
          </div>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="getAction()" class="tip"></Tip>
      </div>
      <BackTop :height="100" :bottom="30" :duration="1500">
        <div class="top">返回顶端</div>
      </BackTop>
    </el-card>
  </transition>
</template>

<script>
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
import EventVue from "@/utils/EventVue.js";
export default {
  name: "ActionDetails",
  store,
  components: {
    Tip
  },
  data() {
    return {
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: ""
      },

      showCard: false,
      action: {
        isWatched: false
      },
      actions: [
        {
          actionId: 1,
          avatar:
            "http://www.shehuishe.com/files/2016/02/57a3bfaf-c52f-462a-a5da-f41c888f4d2c_T100x100.jpg",
          name: "瑾逸小七",
          sex: "女",
          type: "摄影师",
          address: "河北 秦皇岛",
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
          cost: 150,
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
    this.showCard = true;

    this.getAction();

    //接收刷新动态页面请求
    //不知道为什么会发送4次请求
    // EventVue.$on("refresh", message => {
    //   this.getAction();
    // });
  },
  methods: {
    /**
     * 获取动态
     *  */
    getAction() {
      //vuex存在数据
      if (this.$store.state.myActions.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;

        var actionId = this.$route.query.actionId;

        for (var i = 0; i < this.$store.state.myActions.length; i++) {
          if (this.$store.state.myActions[i].actionId == actionId) {
            this.action = this.$store.state.myActions[i];
          }
        }
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.action = {};
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";

        //判断是否登录
        var existUserId = null;
        if (this.$store.state.userInfo.userId) {
          var existUserId = this.$store.state.userInfo.userId;
        }

        let data = {
          actionId: this.$route.query.actionId,
          userId: existUserId
        };

        this.$http.get(this.globalApi.RetrieveActionApi, { params: data }).then(
          response => {
            // console.log(response.data);
            this.loading = false;
            this.loadingSuccess = true;
            if (response.data.status != 200) {
              console.log(response.data.message);
              this.tip.show = true;
              this.tip.businessError = true;
              this.tip.errorMessage = response.data.message;
            } else {
              this.action = response.data.data;

              //如未登录则设isWatched为false
              if (existUserId == null) {
                this.action.isWatched = false;
              }

              //存入vuex;
              // this.$store.commit("addActions", response.data.data);
            }
          },
          err => {
            this.loading = false;
            this.loadingSuccess = false;
            this.tip.show = true;
            this.tip.netError = true;
          }
        );
      }
    },

    /**
     * 约拍
     */
    watch() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        return;
      }

      //判断权限
      if (this.action.author.userId != this.$store.state.userInfo.userId) {
        if (this.action.isWatched == false) {
          this.$Loading.start();

          let data = {
            watcher: {
              userId: this.$store.state.userInfo.userId
            },
            action: {
              actionId: this.action.actionId,
              author: {
                userId: this.action.author.userId
              }
            }
          };

          this.$http.post(this.globalApi.CreateActionWatchApi, data).then(
            response => {
              this.$Loading.finish();
              // console.log(response.data);
              if (response.data.status != 200) {
                //failed
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 2000
                });
              } else {
                //success
                this.$message({
                  message: "约拍成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });

                this.action.isWatched = true;
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "约拍失败,服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     * 取消约拍
     */
    removeWatch() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //跳转登录
        EventVue.$emit("login");
        return;
      }

      //判断权限
      if (this.action.author.userId != this.$store.state.userInfo.userId) {
        if (this.action.isWatched == true) {
          //取消约拍
          this.$confirm("确认取消约拍吗", "提示", {
            confirmButtonText: "真滴",
            cancelButtonText: "手滑啦",
            type: "warning"
          }).then(
            () => {
              this.$Loading.start();

              let data = {
                watcher: {
                  userId: this.$store.state.userInfo.userId
                },
                action: {
                  actionId: this.action.actionId
                }
              };

              this.$http
                .delete(this.globalApi.DeleteActionWatchApi, { body: data })
                .then(
                  response => {
                    //加载条结束
                    this.$Loading.finish();
                    // console.log(response.data);
                    if (response.data.status != 200) {
                      //failed
                      this.$message({
                        message: response.data.message,
                        type: "error",
                        center: true,
                        duration: 2000
                      });
                      // setTimeout(
                      //   function() {
                      //     this.action.isWatched = true;
                      //   }.bind(this),
                      //   2000
                      // );
                    } else {
                      //success
                      this.$message({
                        message: "取消约拍成功",
                        type: "success",
                        center: true,
                        duration: 2000
                      });

                      this.action.isWatched = false;
                    }
                  },
                  err => {
                    this.$Loading.error();
                    this.$message({
                      message: "取消约拍失败:服务器异常",
                      type: "error",
                      center: true,
                      duration: 2000
                    });
                    // setTimeout(
                    //   function() {
                    //     this.action.isWatched = true;
                    //   }.bind(this),
                    //   2000
                    // );
                  }
                );
            },
            () => {
              // this.action.isWatched = true;
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     * 修改动态
     */
    modify() {
      //判断权限
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        this.$router.push("/write");
        //传递参数
        localStorage.setItem("actionId", this.action.actionId);
        localStorage.setItem("title", this.action.title);
        localStorage.setItem("address", this.action.address);
        localStorage.setItem("cost", this.action.cost);
        localStorage.setItem("content", this.action.content);
        localStorage.setItem("permission", true);
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    /**
     *删除动态
     */
    remove() {
      //判断权限
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        this.$confirm("确认删除该动态吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //加载条开始
          this.$Loading.start();

          let data = {
            author: {
              userId: this.$store.state.userInfo.userId
            },
            actionId: this.action.actionId
          };

          this.$http
            .delete(this.globalApi.DeleteActionApi, { body: data })
            .then(
              response => {
                //加载条结束
                this.$Loading.finish();
                // console.log(response.data);
                if (response.data.status != 200) {
                  //failed
                  this.$message({
                    message: response.data.message,
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                } else {
                  //success
                  this.$message({
                    message: "删除成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });

                  //从vuex中删除该动态
                  // this.$store.commit("addMyActions", "");
                  // this.$store.commit("addActions", "");

                  //清空vuex
                  this.$store.commit("addActions", "");
                  this.$store.commit("addMyActions", "");

                  this.$router.push("/main");
                }
              },
              err => {
                this.$Loading.error();
                this.$message({
                  message: "删除动态失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
              }
            );
        });
      }
    }
  },
  computed: {
    permisstion: function() {
      if (this.action.author.userId == this.$store.state.userInfo.userId) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.card-action-details {
  width: 95%;
  margin: 20px auto;
  border-radius: 20px;
  max-width: 1200px;
  min-height: 800px;
}
#title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}

.main {
  min-height: 500px;
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
  margin: 10px auto;
}
.btn {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 20%;
  height: 50px;
}
#name:hover {
  color: brown;
  text-decoration: underline;
}
#type {
  clear: both;
  font-size: 16px;
  margin-left: 10px;
  text-align: left;
  font-weight: bold;
  color: #7e0656;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
