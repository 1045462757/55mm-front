<template>
  <transition name="el-zoom-in-top">
    <el-card class="card-writeAction" v-show="showCard" shadow="hover">
      <div slot="header">
        <span id="card-title">发表你的约拍</span>
      </div>

      <el-form
        :model="ActionForm"
        :rules="rules"
        ref="ActionForm"
        label-width="100px"
        class="action-form"
      >
        <el-form-item label="标题" prop="title" id="title">
          <el-input
            v-model="ActionForm.title"
            placeholder="请输入标题"
            maxlength="50"
            minlength="2"
            clearable
          ></el-input>
        </el-form-item>

        <div id="select">
          <el-form-item label="地区" prop="address" id="address">
            <el-select v-model="ActionForm.address" placeholder="请选择地区" style="width: 100%;">
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="天津" value="天津"></el-option>
              <el-option label="重庆" value="重庆"></el-option>
              <el-option label="河北" value="河北"></el-option>
              <el-option label="山西" value="山西"></el-option>
              <el-option label="辽宁" value="辽宁"></el-option>
              <el-option label="吉林" value="吉林"></el-option>
              <el-option label="黑龙江" value="黑龙江"></el-option>
              <el-option label="江苏" value="江苏"></el-option>
              <el-option label="浙江" value="浙江"></el-option>
              <el-option label="安徽" value="安徽"></el-option>
              <el-option label="福建" value="福建"></el-option>
              <el-option label="江西" value="江西"></el-option>
              <el-option label="山东" value="山东"></el-option>
              <el-option label="河南" value="河南"></el-option>
              <el-option label="湖北" value="湖北"></el-option>
              <el-option label="湖南" value="湖南"></el-option>
              <el-option label="广东" value="广东"></el-option>
              <el-option label="海南" value="海南"></el-option>
              <el-option label="四川" value="四川"></el-option>
              <el-option label="贵州" value="贵州"></el-option>
              <el-option label="云南" value="云南"></el-option>
              <el-option label="陕西" value="陕西"></el-option>
              <el-option label="甘肃" value="甘肃"></el-option>
              <el-option label="青海" value="青海"></el-option>
              <el-option label="台湾" value="台湾"></el-option>
              <el-option label="内蒙古" value="内蒙古"></el-option>
              <el-option label="广西" value="广西"></el-option>
              <el-option label="西藏" value="西藏"></el-option>
              <el-option label="宁夏" value="宁夏"></el-option>
              <el-option label="新疆" value="新疆"></el-option>
              <el-option label="香港" value="香港"></el-option>
              <el-option label="澳门" value="澳门"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="价格" prop="cost" id="cost">
            <el-input
              v-model.number="ActionForm.cost"
              placeholder="请输入价格"
              maxlength="50"
              minlength="2"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <div class="clear"></div>

        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          name="image"
          :headers="header"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload"
        ></el-upload>
        <quill-editor
          v-model="ActionForm.content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="onEditorChange($event)"
          id="editor"
        ></quill-editor>

        <div class="btn">
          <el-button
            type="primary"
            round
            @click="submitForm('ActionForm',1)"
            icon="el-icon-edit"
            v-if="!permission"
          >发表</el-button>
          <el-button
            type="primary"
            round
            @click="submitForm('ActionForm',2)"
            icon="el-icon-edit"
            v-else
          >修改</el-button>
          <!-- <el-button type="warning" round @click="submitForm('ActionForm',3)" icon="el-icon-edit">草稿</el-button> -->
        </div>
      </el-form>
    </el-card>
  </transition>
</template>

<script>
import store from "@/vuex/store.js";
const toolbarOptions = [
  // ["bold", "italic", "underline", "strike"], // toggled buttons
  // [{ header: 1 }, { header: 2 }], // custom button values
  // [{ list: "ordered" }, { list: "bullet" }],
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction
  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  // [{ align: [] }],
  // ["link", "image"],
  // ["clean"]
  ["image"]
];
export default {
  name: "WriteAction",
  store,
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      } else if (value <= 0) {
        return callback(new Error("请输入正整数"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      showCard: false,
      permission: false,
      ActionId: "",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      serverUrl: this.globalApi.CreateActionImageApi, // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        address: [{ required: true, message: "请选择地区", trigger: "blur" }],
        cost: [{ validator: checkAge, trigger: "blur" }]
      },
      ActionForm: {
        actionId: "",
        title: "",
        address: "",
        cost: "",
        content: ""
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      // console.log("---内容改变事件---");
      this.content = html;
      // console.log(html);
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      // console.log(res);
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.status == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.data为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败,大小不能超过2M");
    },

    submitForm(formName, typeNum) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (typeNum == 1) {
            this.submit();
          } else if (typeNum == 2) {
            this.modifyAction();
          } else {
            this.draft();
          }
        } else {
          return false;
        }
      });
    },

    //发表动态
    submit() {
      if (
        this.ActionForm.content == null ||
        this.ActionForm.content == undefined ||
        this.ActionForm.content == ""
      ) {
        this.$message({
          message: "请输入内容",
          type: "warning",
          center: true,
          duration: 1000
        });
      } else {
        this.$Loading.start();

        let data = {
          author: {
            userId: this.$store.state.userInfo.userId
          },
          title: this.ActionForm.title,
          address: this.ActionForm.address,
          cost: this.ActionForm.cost,
          content: this.ActionForm.content
        };

        this.$http.post(this.globalApi.CreateActionApi, data).then(
          response => {
            this.$Loading.finish();
            // console.log(response.data);
            if (response.data.status != 200) {
              //failed
              this.$message({
                message: response.data.message,
                type: "error",
                center: true,
                duration: 1000
              });
            } else {
              //success
              this.$message({
                message: "发表成功",
                type: "success",
                center: true,
                duration: 1000
              });
              this.ActionForm.title = "";
              this.ActionForm.address = "";
              this.ActionForm.cost = "";
              this.ActionForm.content = "";
              this.$router.push("/main");

              // var newAction = response.data.data;
              // newAction.author.name = this.$store.state.userInfo.name;
              // newAction.author.sex = this.$store.state.userInfo.sex;
              // newAction.author.type = this.$store.state.userInfo.type;
              // newAction.author.avatar = this.$store.state.userInfo.avatar;

              // console.log(newAction);

              //新增的动态添加至vuex
              // this.$store.commit("addMyActions", newAction);
              // this.$store.commit("addActions", newAction);

              //清空vuex
              this.$store.commit("addActions", "");
              this.$store.commit("addMyActions", "");
            }
          },
          err => {
            this.$Loading.error();
            this.$message({
              message: "发表动态失败:服务器异常",
              type: "error",
              center: true,
              duration: 2000
            });
          }
        );
      }
    },

    //修改动态
    modifyAction() {
      this.$confirm("确认修改吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.ActionForm.content == null) {
          this.$message({
            message: "请输入内容",
            type: "warning",
            center: true,
            duration: 2000
          });
        } else {
          //开始修改
          this.$Loading.start();

          let data = {
            author: {
              userId: this.$store.state.userInfo.userId
            },
            actionId: this.ActionForm.actionId,
            title: this.ActionForm.title,
            address: this.ActionForm.address,
            cost: this.ActionForm.cost,
            content: this.ActionForm.content
          };

          this.$http.put(this.globalApi.UpdateActionApi, data).then(
            response => {
              this.$Loading.finish();
              // console.log(response.data);
              if (response.data.status != 200) {
                //failed
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 1000
                });
              } else {
                //success
                this.$message({
                  message: "修改成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });
                this.$router.push("/main");

                //修改后的动态替换vuex
                // this.$store.commit("addMyActions", "");
                // this.$store.commit("addActions", "");

                //清空vuex
                this.$store.commit("addActions", "");
                this.$store.commit("addMyActions", "");
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "修改动态失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
        }
      });
    },

    //加入草稿
    draft() {
      this.$message({
        message: "不给草稿",
        type: "info",
        center: true,
        duration: 2000
      });
    }
  },
  mounted() {
    this.showCard = true;

    //接收参数
    this.ActionForm.actionId = localStorage.getItem("actionId");
    this.ActionForm.title = localStorage.getItem("title");
    this.ActionForm.address = localStorage.getItem("address");
    //转换数据类型
    if (localStorage.getItem("cost")) {
      this.ActionForm.cost = parseInt(localStorage.getItem("cost"));
    }
    this.ActionForm.content = localStorage.getItem("content");
    this.permission = localStorage.getItem("permission");
    localStorage.removeItem("actionId");
    localStorage.removeItem("title");
    localStorage.removeItem("address");
    localStorage.removeItem("cost");
    localStorage.removeItem("content");
    localStorage.removeItem("permission");
  }
};
</script>

<style scoped>
.card-writeAction {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  min-height: 800px;
  max-width: 1200px;
}

#card-title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 10px;
}

#title {
  width: 50%;
  margin: 0 auto;
}

#select {
  width: 50%;
  margin: 0 auto;
}

#address {
  width: 50%;
  margin: 30px auto;
  float: left;
}

#cost {
  width: 50%;
  margin: 30px auto;
  float: right;
}

.clear {
  clear: both;
}

#editor {
  height: 500px;
  width: 90%;
  margin: 0 auto;
}

.btn {
  margin-top: 50px;
}

.action-form {
  width: 95%;
  margin: 20px auto;
}
</style>
