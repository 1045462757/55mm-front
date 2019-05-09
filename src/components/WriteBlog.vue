<template>
    <transition name="el-zoom-in-top">
      <el-card class="box-card" v-show="show">
        <div slot="header" class="clearfix">
          <span id="title">发表你的约拍</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title" class="title">
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入标题"
              maxlength="50"
              minlength="2"
              clearable
            ></el-input>
          </el-form-item>
          <br>
          <br>
          <el-form-item label="简介" prop="summary" class="summary">
            <el-input
              v-model="ruleForm.summary"
              placeholder="请输入简介"
              maxlength="80"
              minlength="10"
              clearable
            ></el-input>
          </el-form-item>
          <br>
          <br>
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="img"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
          ></el-upload>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            id="editor"
          ></quill-editor>

          <div class="btn">
            <el-button type="primary" round @click="submitForm('ruleForm',1)" icon="el-icon-edit">发表</el-button>
            <el-button type="warning" round @click="submitForm('ruleForm',3)" icon="el-icon-edit">草稿</el-button>
          </div>
        </el-form>
      </el-card>
    </transition>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];
export default {
  name: "WriteBlog",
  data() {
    return {
      show: false,
      permission: false,
      blogId: "",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
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
      serverUrl: "", // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        summary: [{ required: true, message: "请输入简介", trigger: "blur" }]
      },
      ruleForm: {
        title: "",
        summary: ""
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
      this.$message.error("图片插入失败");
    },

    submitForm(formName, typeNum) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (typeNum == 1) {
            this.submit();
          } else if (typeNum == 2) {
            this.modifyBlog();
          } else {
            this.draft();
          }
        } else {
          return false;
        }
      });
    },

    //发表博客
    submit() {
      this.$message({
        message: "不给发表",
        type: "info",
        center: true,
        duration: 2000
      });
    },

    //修改博客
    modifyBlog() {
      this.$message({
        message: "假装修改了",
        type: "info",
        center: true,
        duration: 2000
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
    this.show = true;
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  height: 1200px;
  max-width: 1200px;
}
.clearfix {
  font-size: 20px;
}
.ql-editor.ql-blank,
.ql-editor {
  height: 350px;
}
.title {
  width: 35%;
  margin: 0 auto;
}
.summary {
  width: 65%;
  margin: 0 auto;
}

#editor {
  height: 500px;
  width: 90%;
  margin: 0 auto;
}

.btn {
  margin-top: 50px;
}
.demo-ruleForm {
  width: 95%;
  margin: 0 auto;
}
#title{
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 5px;
}
</style>
