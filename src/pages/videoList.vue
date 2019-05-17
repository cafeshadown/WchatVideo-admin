<template>
  <div id="videoList">
    <el-row class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home/homaepage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>短视频管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="table-container">
      <el-row>
        <div class="form-title"><i class="el-icon-edit"></i>短视频管理</div>
      </el-row>
      <div class="form-container">
        <el-row>
          <div class="btn-container">
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
            <el-table-column align="center" prop="id" label="ID">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.id" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.id}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" prop="userId" label="用户ID">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" v-if="isPopover">
                  <p>最近采集时间：{{scope.row.videoWidth}}</p>
                  <p>本次采集时间：{{scope.row.coverPath}}</p>
                  <div v-if="!showEdit[scope.$index]" slot="reference" class="name-wrapper">{{ scope.row.userId }}
                  </div>
                </el-popover>
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.userId" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index] && !isPopover">{{scope.row.userId}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="coverPath" label="封面">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.coverPath" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]"><img :src="'http://localhost:8081'+scope.row.coverPath" width="100%"/></span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="videoDesc" label="简述">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.videoDesc" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.videoDesc}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" prop="videoSeconds" label="时长">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.videoSeconds" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.videoSeconds}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="videoWidth" label="长宽比">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.videoWidth" size="small"
                          placeholder="请输入内容"></el-input>
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.videoHeight" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]">{{scope.row.videoWidth}}*{{scope.row.videoHeight}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="videoPath" label="观看地址"  width="150%">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.videoPath" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]"><video :src="'http://localhost:8081'+scope.row.videoPath" width="100%" controls preload="none"></video></span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="状态">
              <template slot-scope="scope">
                <el-input v-if="showEdit[scope.$index]" v-model="scope.row.status" size="small"
                          placeholder="请输入内容"></el-input>
                <span v-if="!showEdit[scope.$index]" class="stat">{{scope.row.status===1?'正常':'禁止'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150%">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><span class="edit-btn">禁止播放</span>
                </el-button>
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
    name: "videoList",
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
          this.tableData.splice(this.tableData.indexOf(value), 1);
        }, this)
      },
      handleAdd() {
        this.tableData.push({});
      },
      handleSearch() {
        if (this.input === '') {
          this.axios.get('/admin/video/list')
          //then获取成功；response成功后的返回值（对象）
            .then(response => {
              console.log(response);
              this.allTableData = response.data.rows;
            });
          this.tableData = this.allTableData
        }
        else {
          this.tableData = [];
          this.allTableData.forEach(function (dataItem, index) {
            if (dataItem.userId.indexOf(this.input) !== -1) {
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
          url:'/admin/video/delVideo',
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
        this.tableData.splice(index, 1);
      },
      handleEdit(index, row) {
        var editBtn = document.getElementsByClassName('edit-btn')[index];

        if (editBtn.innerHTML === '禁止播放') {
          editBtn.innerHTML = '确定';
          this.$set(this.showEdit, index, true)
        }else if (editBtn.innerHTML==='确定'){
          var params = new URLSearchParams();
          params.append('videoId', row.id);
          this.axios({
            method:"post",
            url:'/admin/video/forbidVideo',
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
          editBtn.innerHTML = '禁止播放';
          alert(index);

          this.$set(this.showEdit, index, false)
        }
      },
      selectionChange(selection) {
        this.checked = selection;
      }
    },
    mounted() {
      this.$http.get('/admin/video/list')
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
          this.axios.get('/admin/video/list')
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
            if (dataItem.userId.indexOf(this.input) !== -1) {
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
