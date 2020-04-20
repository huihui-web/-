/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>增加高校</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleEdit">
          新增
          <i class="el-icon-circle-plus-outline el-icon--right"></i>
        </el-button>
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
      <el-table-column sortable prop label="大学图标" width="100">
        <template slot-scope="scope">
          <img class="icon" :src="scope.row.strIcon" alt />
        </template>
      </el-table-column>
      <el-table-column sortable prop="strName" label="大学名称" width="300"></el-table-column>
      <el-table-column sortable prop="strId" label="大学strId" width="300"></el-table-column>
      <el-table-column sortable prop="intId" label="大学intId" width="300"></el-table-column>
      <el-table-column sortable prop="strLocProvince" label="省份" width="300"></el-table-column>
      <el-table-column sortable prop="strObey" label="所属部门" width="300"></el-table-column>
    </el-table>
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
        <el-form-item label="大学strId" prop="strId">
          <el-input size="small" v-model="editForm.strId" auto-complete="off" placeholder="请输入大学strId"></el-input>
        </el-form-item>
        <el-form-item label="大学intId" prop="intId">
          <el-input size="small" v-model="editForm.intId" auto-complete="off" placeholder="请输入大学intId"></el-input>
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
import { dataAdd } from "../../api/school";
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      strName: "",
      title: "添加",
      editForm: {
        strId: "",
        strId: "",
        strName: "",
        strLocProvince: "",
        strIcon: "",
        strJianjie: "",
        strXuefei: "",
        strSchoolType: "",
        strObey: ""
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
        strId: [{ required: true, message: "请输入大学strId", trigger: "blur" }],
        intId: [{ required: true, message: "请输入大学intId", trigger: "blur" }],
        strIcon: [
          { required: true, message: "请输入图标地址", trigger: "blur" }
        ]
      },
      listData: [] //用户数据
    };
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    // this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata() {
      this.loading = true;
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      dataAdd(this.editForm)
        .then(res => {
          this.loading = false;
          console.log(this.editForm);
          if (res.data != "添加成功") {
            this.$message({
              type: "error",
              message: "大学新增失败！"
            });
            return;
          }
          this.listData.push(JSON.parse(JSON.stringify(this.editForm)));
          this.$message({
            type: "success",
            message: res.data
          });
          this.editForm.strLocProvince = "";
          this.editForm.strIcon = "";
          this.editForm.strName = "";
          this.editForm.intId = "";
          this.editForm.strId = "";
          this.editForm.strObey = "";
          this.editForm.strJianjie = "";
          this.editForm.strSchoolType = "";
          this.editForm.strXuefei = "";
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("菜单加载失败，请稍后再试！");
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
    // 添加事件
    //显示编辑界面
    handleEdit() {
      this.editFormVisible = true;
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.editFormVisible = false;
          this.getdata(this.editForm);
        } else {
          return false;
        }
      });
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
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
.el-select--small {
  width: 100%;
}
.icon {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

 
 