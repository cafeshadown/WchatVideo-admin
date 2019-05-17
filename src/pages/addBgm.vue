<template>
  <div id="addBgm">
    <el-row class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home/homaepage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加bgm</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <div class="login-form-box">
    <el-form ref="form" :model="form">
      <el-form-item>
        <span>bgm上传</span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name" placeholder="作者"></el-input>
      </el-form-item>
      <el-form-item class="password-item">
        <el-input v-model="form.author" placeholder="姓名" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="path">
        <el-upload
          ref="upload"
          action="/admin/video/bgmUpload"
          multiple
          name="path"
          :limit="1"
          :on-exceed="onExceed"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">确定上传</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          name: ''
          , author: ''
          , path: ''
        }
      }
    },
    methods: {

      beforeUpload(file) {
        const isJPG = file.type === 'audio/mp3';
        const isGIF = file.type === 'file.type == \'audio/ogg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG && !isGIF) {
          this.$message.error('上传图片必须是mp3/ogg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG ||  isGIF ) && isLt2M;
      },
      handleSuccess(res, file) {
        this.$message({
          type: 'info',
          message: file.response.msg,
          duration: 6000
        });
        if (file.response.status !== 200) {
          this.form.path = file.response.msg; //将返回的文件储存路径赋值picture字段
        }
      },
      login() {
        let bgm = {"name": this.form.name, "author": this.form.author,
        "path":this.form.path
        };
        this.$http.post('/admin/video/addBgm', bgm)
        //then获取成功；response成功后的返回值（对象）
          .then(response => {
            if (response.data.status === 200) {
              this.$router.push({
                path: '/home'
              })
            } else if (response.data.status === 500) {
              alert(response.data.msg)
            } else {
              alert(response.data.data)
            }
          })
          //获取失败
          .catch(error => {
            console.log(error.data.msg);
            alert(error.data.msg);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .page-title {
    font-size: 32px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .breadcrumb {
    background-color: white;
    padding: 0.5rem;
    margin-bottom: 25px;
  }

  .table-container {
    border: 1px solid #4f4f54;

  }

  .form-container {
    padding: 10px;
  }

  .form-title {
    background-color: #4f4f54;
    color: white;
    padding: 0.5rem;
    text-align: left;
    margin-bottom: 5px;
  }

  .btn-container {
    overflow: hidden;
    .el-button {
      float: left;
    }
  }

  .search-input {
    width: 300px;
    float: left;
    margin-left: 10px;
    margin-right: 5px;
  }
  .login-form-box {
    height: 280px;
    width: 400px;
    padding: 30px;
    background-color: white;
    box-shadow: 0 0 6px 5px #DCDCDC;
    border-radius: 4px;
    position: absolute;
    left: 35%;
    top: 50%;
    span {
      font-family: Arial;
      font-weight: bold;
    }
  }
</style>


