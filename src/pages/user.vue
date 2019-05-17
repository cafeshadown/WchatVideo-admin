<template>
  <div id="user">
    <el-row class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home/homaepage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>短视频管理</el-breadcrumb-item>
        <el-breadcrumb-item>短视频列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="table-container">
      <el-row>
        <div class="form-title"><i class="el-icon-edit"></i>用户列表</div>
      </el-row>
      <div class="form-container">
        <el-row>
          <div class="btn-container">
            <el-button type="warning" size="small" @click="handleAdd">增加<i class="el-icon-plus"></i></el-button>
            <el-button type="danger" size="small" @click="checkedDelete">封号<i class="el-icon-delete"></i></el-button>
            <el-input class="search-input" v-model="input" placeholder="请输入搜索内容" size="small"></el-input>
            <el-button type="success" size="small" @click="handleSearch"><i class="el-icon-search"></i>搜索</el-button>
          </div>
        </el-row>
        <br/>
        <el-scrollbar>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" border stripe
                    height="450"
                    @selection-change="selectionChange">
            <el-table-column align="center" type="selection" width="50"></el-table-column>

            <el-table-column align="center" prop="id" label="id">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.id" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.id}}</span>

              </template>
            </el-table-column>

            <el-table-column align="center" prop="username" label="用户名">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" v-if="isPopover">
                  <p>赞：{{scope.row.receiveLikeCounts}}</p>
                  <p>关注：{{scope.row.followCounts}}</p>
                  <div v-if="!showEdit[scope.$index]" slot="reference" class="name-wrapper">{{ scope.row.username }}
                  </div>
                </el-popover>
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.username" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index] && !isPopover">{{scope.row.username}}</span>
              </template>
            </el-table-column>


            <el-table-column align="center" prop="faceImage" label="头像">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.faceImage" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]"><img :src="scope.row.faceImage"/></span>

              </template>
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.nickname" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.nickname}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="receiveLikeCounts" label="获赞数">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.receiveLikeCounts" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.receiveLikeCounts}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="followCounts" label="关注数">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.followCounts" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.followCounts}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fansCounts" label="粉丝数">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.fansCounts" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.fansCounts}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isActive" label="账号状态">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.isActive" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.isActive=true?'正常':'封禁'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150%">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><span class="edit-btn">编辑</span>
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">解封</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <div class="block">
          <el-pagination layout="prev,pager,next" :total="10" @current-change="currentChange"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "user",
    data() {
      return {
        input: '',
        isPopover: false,
        tableData: [],//渲染数据
        allTableData: [],
        checked: [],//表格行是否勾选
        showEdit: [false]
      }
    },
    methods: {
      currentChange(currentPage) {

      },
      checkedDelete() {

        this.checked.forEach(function (value) {
          var params = new URLSearchParams();
          params.append('id', value.id);
          this.axios({
            method:"post",
            url:'/admin/users/delete',
            data:params
          })
          //then获取成功；response成功后的返回值（对象）
            .then(response => {
              console.log(response);
              alert("操作成功");
            })//获取失败
            .catch(error => {
              console.log(error);
              alert(error);

            });
        }, this)

      },
      handleAdd() {
        this.tableData.push({});
      },
      handleSearch() {
        if (this.input === '') {
          this.axios.get('/admin/users/list')
          //then获取成功；response成功后的返回值（对象）
            .then(response => {
              console.log(response);
              alert("操作成功");
            })//获取失败
            .catch(error => {
              console.log(error);
              alert(error);

            });
          this.tableData = this.allTableData
        }
        else {
          this.tableData = [];
          this.allTableData.forEach(function (dataItem, index) {
            if (dataItem.username.indexOf(this.input) !== -1) {
              this.tableData.push(this.allTableData[index]);
            }
          }, this)
        }
      },

      handleDelete(index, row) {
        var params = new URLSearchParams();
        params.append('id', row.id);
        this.axios({
          method:"post",
          url:'/admin/users/delete',
          data:params
        })
        //then获取成功；response成功后的返回值（对象）
          .then(response => {
            console.log(response);
            alert("操作成功");
          })//获取失败
          .catch(error => {
            console.log(error);
            alert(error);

          });
      },
      handleEdit(index, row) {
        var editBtn = document.getElementsByClassName('edit-btn')[index];
        if (editBtn.innerHTML === '编辑') {
          editBtn.innerHTML = '确定';
          this.$set(this.showEdit, index, true)

        }
        else {
          editBtn.innerHTML = '编辑';
          this.axios({
            method:"post",
            url:'/admin/users/update',
            data:row
          })
          //then获取成功；response成功后的返回值（对象）
            .then(response => {
              console.log(response);
              alert("操作成功");
            })//获取失败
            .catch(error => {
              console.log(error);
              alert(error);

            });
          this.$set(this.showEdit, index, false)
        }
      },
      selectionChange(selection) {
        this.checked = selection;
      }
    },
    mounted() {
      this.$http.get('/admin/users/list')
      //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response);
          this.allTableData = response.data.rows;
          this.tableData = this.allTableData;
          if (document.documentElement.clientWidth < 1490) {
            this.$set(this, 'isPopover', true);
          }
          window.onresize = () => {
            var clientWidth = document.documentElement.clientWidth;
            if (clientWidth < 1490) {
              this.$set(this, 'isPopover', true);
            }
            else
              this.$set(this, 'isPopover', false)
          }
        })
        //获取失败
        .catch(error => {
          console.log(error);
          alert(error);

        });
    },
    watch: {
      'input': function inputChange() {
        if (this.input === '') {
          this.axios.get('/admin/users/list')
          //then获取成功；response成功后的返回值（对象）
            .then(response => {
              console.log(response);
              this.allTableData = response.data.rows;
            })
            //获取失败
            .catch(error => {
              console.log(error);
              alert(error);

            });
          this.tableData = this.allTableData;
        }
        else {
          this.tableData = [];
          this.allTableData.forEach(function (dataItem, index) {
            if (dataItem.username.indexOf(this.input) !== -1) {
              this.tableData.push(this.allTableData[index]);
            }
          }, this)
        }
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
</style>
