<template>
  <transition name="el-zoom-in-center">
    <div v-show="show">
      <!--搜索-->
      <el-card class="search" shadow="hover">
        <div id="city">
          <span>地区:</span>
          <el-cascader placeholder="选择城市" :options="options" filterable change-on-select></el-cascader>
        </div>

        <div id="money">
          <span>费用:</span>
          <el-cascader placeholder="选择费用" :options="money"></el-cascader>
        </div>

        <div id="type">
          <span>身份:</span>
          <el-cascader placeholder="选择身份" :options="type"></el-cascader>
        </div>

        <div id="sex">
          <span>性别:</span>
          <el-cascader placeholder="选择性别" :options="sex"></el-cascader>
        </div>
        <div class="clear"></div>
        <el-button type="primary" round id="btn" @click="search()">搜索</el-button>
      </el-card>
      <div class="main" v-loading="loading" element-loading-text="玩命加载中..." shadow="hover">
        <div v-if="loadingSuccess">
          <ActionList :action="action" v-for="(action,index) in actionPages" :key="index"></ActionList>
          <!--分页-->
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="actions.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
            ></el-pagination>
          </div>
        </div>
        <Tip v-else :tip="tip" v-on:refresh="refresh()"></Tip>
      </div>
      <BackTop :height="100" :bottom="30" :duration="1500">
        <div class="top el-icon-top"></div>
      </BackTop>
    </div>
  </transition>
</template>

<script>
import ActionList from "@/components/action/ActionList";
import Tip from "@/components/general/Tip";
import store from "@/vuex/store.js";
export default {
  name: "Main",
  store,
  components: { ActionList, Tip },
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

      currentPage: 1,
      show: false,
      actions: [],
      actionPages: [],
      options: [
        {
          value: "全部",
          label: "全部"
          // children: []
        },
        {
          value: "北京",
          label: "北京"
          // children: []
        },
        {
          value: "天津",
          label: "天津"
          // children: []
        },
        {
          value: "上海",
          label: "上海"
          // children: []
        },
        {
          value: "重庆",
          label: "重庆"
          // children: []
        },
        {
          value: "河北",
          label: "河北"
          // children: []
        },
        {
          value: "山西",
          label: "山西"
          // children: []
        },
        {
          value: "辽宁",
          label: "辽宁"
          // children: []
        },
        {
          value: "吉林",
          label: "吉林"
          // children: []
        },
        {
          value: "黑龙江",
          label: "黑龙江"
          // children: []
        },
        {
          value: "江苏",
          label: "江苏"
          // children: []
        },
        {
          value: "浙江",
          label: "浙江"
          // children: []
        },
        {
          value: "安徽",
          label: "安徽"
          // children: []
        },
        {
          value: "福建",
          label: "福建"
          // children: []
        },
        {
          value: "江西",
          label: "江西"
          // children: []
        },
        {
          value: "山东",
          label: "山东"
          // children: []
        },
        {
          value: "河南",
          label: "河南"
          // children: []
        },
        {
          value: "湖北",
          label: "湖北"
          // children: []
        },
        {
          value: "湖南",
          label: "湖南"
          // children: []
        },
        {
          value: "广东",
          label: "广东"
          // children: []
        },
        {
          value: "海南",
          label: "海南"
          // children: []
        },
        {
          value: "四川",
          label: "四川"
          // children: []
        },
        {
          value: "贵州",
          label: "贵州"
          // children: []
        },
        {
          value: "云南",
          label: "云南"
          // children: []
        },
        {
          value: "陕西",
          label: "陕西"
          // children: []
        },
        {
          value: "甘肃",
          label: "甘肃"
          // children: []
        },
        {
          value: "青海",
          label: "青海"
          // children: []
        },
        {
          value: "台湾",
          label: "台湾"
          // children: []
        },
        {
          value: "内蒙古",
          label: "内蒙古"
          // children: []
        },
        {
          value: "广西",
          label: "广西"
          // children: []
        },
        {
          value: "西藏",
          label: "西藏"
          // children: []
        },
        {
          value: "宁夏",
          label: "宁夏"
          // children: []
        },
        {
          value: "新疆",
          label: "新疆"
          // children: []
        },
        {
          value: "香港",
          label: "香港"
          // children: []
        },
        {
          value: "澳门",
          label: "澳门"
          // children: []
        }
      ],
      money: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "0-50",
          label: "0-50"
        },
        {
          value: "50-200",
          label: "50-200"
        },
        {
          value: "200-500",
          label: "200-500"
        },
        {
          value: "500-1000",
          label: "500-1000"
        },
        {
          value: "1000--",
          label: "1000以上"
        }
      ],
      type: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "摄影师",
          label: "摄影师"
        },
        {
          value: "模特",
          label: "模特"
        },
        {
          value: "修图师",
          label: "修图师"
        },
        {
          value: "化妆师",
          label: "化妆师"
        },
        {
          value: "绘图师",
          label: "绘图师"
        },
        {
          value: "服装供应商",
          label: "服装供应商"
        },
        {
          value: "场地供应商",
          label: "场地供应商"
        }
      ],
      sex: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "male",
          label: "男"
        },
        {
          value: "female",
          label: "女"
        }
      ]
    };
  },
  methods: {
    //分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.actionPages = this.actions.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },

    //搜索
    search() {
      this.$message({
        message: "尚在开发",
        type: "info",
        center: true,
        duration: 2000
      });
    },

    //获取动态
    refresh() {
      //vuex存在数据
      if (this.$store.state.actions.length != 0) {
        this.loading = false;
        this.loadingSuccess = true;
        this.actions = this.$store.state.actions;
        this.actionPages = this.actions.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10
        );
      } else {
        //从服务器获取数据

        //状态初始化
        this.loading = true;
        this.loadingSuccess = false;
        this.actions = [];
        this.actionPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";

        let data = {
          type: 2
        };

        this.$http
          .get(this.globalApi.RetrieveActionListApi, { params: data })
          .then(
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
                this.actions = response.data.data;
                this.actionPages = this.actions.slice(
                  (this.currentPage - 1) * 10,
                  this.currentPage * 10
                );
                //存入vuex;
                this.$store.commit("addActions", response.data.data);
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
    }
  },
  mounted() {
    this.show = true;

    this.refresh();
  }
};
</script>

<style scoped>
#menu {
  margin-top: 20px;
}
.search {
  width: 95%;
  margin: 20px auto;
  max-width: 950px;
  border-radius: 10px;
}
#city,
#type {
  width: 50%;
  float: left;
  margin-top: 10px;
}
#money,
#sex {
  width: 50%;
  float: right;
  margin-top: 10px;
}
#city span,
#money span,
#type span,
#sex span {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.clear {
  clear: both;
}
.main {
  width: 95%;
  max-width: 950px;
  margin: 0 auto;
  min-height: 500px;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
