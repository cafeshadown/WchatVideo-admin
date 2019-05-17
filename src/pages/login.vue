<template>
  <div id="login">
    <div class="login-form-box">
      <el-form ref="form" :model="form">
        <el-form-item>
          <span>用户登录</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item class="password-item">
          <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group class="remember" v-model="form.check">
            <el-checkbox checked="true" label="记住密码" name="check"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
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
          username: ''
          , password: ''
        }
      }
    },
    methods: {
      login() {
        let user = {"userName": this.form.username, "passWord": this.form.password};
        this.$http.post('/admin/users/login', user)
        //then获取成功；response成功后的返回值（对象）
          .then(response => {
            if (response.data.status === 200) {
              this.$router.push({
                path: '/home'
              })
            }else if (response.data.status === 500){
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
  .login-form-box {
    height: 280px;
    width: 400px;
    padding: 30px;
    background-color: white;
    box-shadow: 0 0 6px 5px #DCDCDC;
    border-radius: 4px;
    position: absolute;
    left: 45%;
    top: 40%;
    margin-left: -200px;
    margin-top: -140px;
    span {
      font-family: Arial;
      font-weight: bold;
    }
  }

  .password-item {
    margin-bottom: 5px;
  }

  .remember {
    float: left;
  }
</style>
