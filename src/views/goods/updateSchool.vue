/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>更新高校信息</el-breadcrumb-item>
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
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="大学名称" prop="strName">
          <el-input
            size="small"
            v-model="editForm.strName"
            auto-complete="off"
            placeholder="请输入大学名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="大学id" prop="strId">
          <el-input size="small" v-model="editForm.strId" auto-complete="off" placeholder="请输入大学id"></el-input>
        </el-form-item>
        <el-form-item label="大学图案" prop="strIcon">
          <el-input
            size="small"
            v-model="editForm.strIcon"
            auto-complete="off"
            placeholder="请输入图案地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="隶属部门" prop="strObey">
          <el-select size="small" v-model="editForm.strObey" placeholder="请选择隶属部门">
            <el-option label="教育部" value="教育部"></el-option>
            <el-option label="卫生部" value="卫生部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在省份" prop="strLocProvince">
          <el-input
            size="small"
            v-model="editForm.strLocProvince"
            auto-complete="off"
            placeholder="请输入所在省份"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="strSchoolType">
          <el-input
            size="small"
            v-model="editForm.strSchoolType"
            auto-complete="off"
            placeholder="请输入类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="大学简介" prop="strJianjie">
          <el-input
            size="small"
            v-model="editForm.strJianjie"
            auto-complete="off"
            placeholder="请输入简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="学费信息" prop="strXuefei">
          <el-input
            size="small"
            v-model="editForm.strXuefei"
            auto-complete="off"
            placeholder="请输入学费信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="submitForm('editForm')"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { datacheck, dataUpdate, dataDelete } from "../../api/school";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false,
      strName: "",
      title: "添加",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken")
      },
      editForm: {
        strId: "",
        strName: "",
        strLocProvince: "",
        strIcon: "",
        strJianjie: "",
        strXuefei: "",
        strSchoolType: "",
        strObey: "",
        id: ""
      },
      // rules表单验证
      rules: {
        strName: [
          { required: true, message: "请输入大学名称", trigger: "blur" }
        ],
        strLocProvince: [
          { required: true, message: "请输入所在省份", trigger: "blur" }
        ],
        strObey: [
          { required: true, message: "请选择隶属部门", trigger: "blur" }
        ],
        strId: [{ required: true, message: "请输入大学id", trigger: "blur" }],
        strIcon: [
          { required: true, message: "请输入图标地址", trigger: "blur" }
        ]
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
    // 获取大学列表
    getdata() {
      this.loading = true;
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
    updateSchool() {
      dataUpdate(this.editForm).then(res => {
        this.getdata();
        this.$message({
          message: res.data,
          type: "success"
        });
      });
    },
    resetForm() {
      this.strName = "";
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
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.editFormVisible = false;
          this.updateSchool(this.editForm);
        } else {
          return false;
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm.strObey = row.strObey;
      this.editForm.strName = row.strName;
      this.editForm.strSchoolType = row.strSchoolType;
      this.editForm.strId = row.strId;
      this.editForm.strIcon = row.strIcon;
      this.editForm.strJianjie = row.strJianjie;
      this.editForm.strXuefei = row.strXuefei;
      this.editForm.id = row.id;
      this.editForm.strLocProvince = row.strLocProvince;
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
    },
    // 删除大学
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dataDelete({ strName: row.strName })
            .then(res => {
              this.getdata();
              if (res.data !== "删除成功") {
                this.$message.error("大学删除失败，请稍后再试！");
                return;
              }
              this.$message({
                type: "success",
                message: res.data
              });
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("大学删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
</style>

 
 