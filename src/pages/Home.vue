<template>
    <div id="home">
      <div class="aside-col">
        <el-menu class="menu" :default-active="$route.path" router :collapse="isCollapse" background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item @click="changeCollapse">
            <i><img src="../assets/icons/catalog.png" width="15px" height="15px" /></i>
          </el-menu-item>
          <el-menu-item index="/Home/homepage">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span slot="title">用户信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/user">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-phone-outline"></i>
              <span slot="title">举报管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/Home/report">举报列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-mobile-phone"></i>
              <span slot="title">短视频管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/videos">短视频列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span slot="title">BGM管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/bgm">BGM列表</el-menu-item>
              <el-menu-item index="/Home/addBgm">添加BGM</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/Home">
            <i class="el-icon-search"></i>
            <span slot="title">全文检索</span>
          </el-menu-item>
        </el-menu>
      </div>
        <div class="main-col">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
  data () {
      return{
        isCollapse:false
      }
  },
  methods:{
      changeCollapse () {
        var mainCol = document.getElementsByClassName('main-col')[0];
        this.isCollapse = !this.isCollapse
        if(this.isCollapse) {
          mainCol.style.left = '90px';
          mainCol.style.width='calc(100% - 110px)'
        }
        else {
          mainCol.style.left = '220px';
          mainCol.style.width = 'calc(100% - 240px)'
        }
      }
  }
}
</script>

<style scoped lang="less">
  .menu{
    height: 100vh;
  }
.el-menu-item{
  text-align: left;
  border-bottom: 1px solid gray;
}
  .el-submenu{
    text-align: left;
    border-bottom: 1px solid gray;
  }
.aside-col{
  display: inline-block;
  float: left;
  width: 200px;
}
.main-col{
  position: fixed;
  left: 220px;
  display: inline-block;
  width: calc(100% - 240px);
}
</style>
