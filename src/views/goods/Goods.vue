/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查看高校</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model.trim="strName" placeholder="输入学校名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column sortable prop="editTime" label="大学图标" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.strIcon" alt />
        </template>
      </el-table-column>
      <el-table-column sortable prop="strName" label="大学名称" width="300"></el-table-column>
      <el-table-column sortable prop="strId" label="大学id" width="300"></el-table-column>
      <el-table-column sortable prop="strLocProvince" label="省份" width="300"></el-table-column>
      <el-table-column sortable prop="strObey" label="所属部门" width="300"></el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
  </div>
</template>

<script>
import { datacheck } from "../../api/school";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      strName: "",
      title: "添加",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      }
    };
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata() {
      this.loading = true;
      // 模拟数据开始
      // let res = {
      //   code: 0,
      //   msg: null,
      //   count: 5,
      //   data: [
      //     {
      //       addUser: null,
      //       editUser: null,
      //       addTime: 1521062371000,
      //       editTime: 1526700200000,
      //       deptId: 2,
      //       deptName: 'XX分公司',
      //       deptNo: '1',
      //       parentId: 1
      //     },
      //     {
      //       addUser: null,
      //       editUser: null,
      //       addTime: 1521063247000,
      //       editTime: 1526652291000,
      //       deptId: 3,
      //       deptName: '上海测试',
      //       deptNo: '02',
      //       parentId: 1
      //     },
      //     {
      //       addUser: null,
      //       editUser: null,
      //       addTime: 1526349555000,
      //       editTime: 1526349565000,
      //       deptId: 12,
      //       deptName: '1',
      //       deptNo: '11',
      //       parentId: 1
      //     },
      //     {
      //       addUser: null,
      //       editUser: null,
      //       addTime: 1526373178000,
      //       editTime: 1526373178000,
      //       deptId: 13,
      //       deptName: '5',
      //       deptNo: '5',
      //       parentId: 1
      //     },
      //     {
      //       addUser: null,
      //       editUser: null,
      //       addTime: 1526453107000,
      //       editTime: 1526453107000,
      //       deptId: 17,
      //       deptName: 'v',
      //       deptNo: 'v',
      //       parentId: 1
      //     }
      //   ]
      // }
      // this.loading = false
      // this.listData = res.data
      // this.pageparm.currentPage = this.formInline.page
      // this.pageparm.pageSize = this.formInline.limit
      // this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      datacheck({ strName: this.strName })
        .then(res => {
          this.loading = false;
          this.listData = res.data;
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page;
          this.pageparm.pageSize = this.formInline.limit;
          this.pageparm.total = res.data.length;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("菜单加载失败，请稍后再试！");
        });
    },
    resetForm() {
      this.strName = '';
      this.getdata();
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata();
    }
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

 
 