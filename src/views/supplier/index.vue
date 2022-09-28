<template>
  <div class="mt_2">
    <!-- <el-form
      :inline="true"
      ref="queryForm"
      :model="supplierQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input
          v-model="supplierQueryParams.name"
          placeholder="供应商名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input
          v-model="supplierQueryParams.linkman"
          placeholder="联系人"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="supplierQueryParams.mobile"
          placeholder="练习电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form> -->

    <queryform
      ref="queryForm"
      v-model.sync="supplierQueryParams"
      :formItem="formItem"
    >
      <template v-slot:query>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </template>
    </queryform>

    <!-- <el-table :data="SupplierList" border style="width: 100%" height="700">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        v-bind="item"
      ></el-table-column> -->
    <baseTable
      :currentPage="currentPage"
      :total="total"
      :pageSize="pageSize"
      :SupplierList="SupplierList"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:opteration="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleOpenDialog(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </baseTable>
    <!-- <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column> -->
    <!-- <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delSupplier(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    <!-- </el-table> -->
    <!--分页-->
    <!-- <el-pagination
      class="mt_2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->

    <tankuang
      :dialogRules="dialogRules"
      :dialogConfig="dialogConfig"
      labelWidth="120px"
      :dialogFormItem="dialogFormItem"
      :dialogVisible.sync="dialogVisible"
      v-model.sync="dialogForm"
      @submit="handleSubmit"
    ></tankuang>

    <!-- <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        :model="dialogFormParams"
        ref="dialogForm"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model="dialogFormParams.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="dialogFormParams.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="determine('dialogForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import tankuang from "../../components/dialog.vue";
import queryform from "../../components/queryForm.vue";
import SupplierApi from "../../api/supplier";
import baseTable from "../../components/baseTable.vue";
import { Input } from "element-ui";
export default {
  name: "",
  components: {
    baseTable,
    queryform,
    tankuang,
  },
  data() {
    return {
      dialogVisible: false,
      page: 1,
      size: 10,
      dialogForm: {
        name: "",
        linkman: "",
        remark: "",
        mobile: "",
      },
      dialogConfig: {
        title: "供应商新增",
        width: "500px",
        formWidth: "400",
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "供应商不能为空",
            trigger: "blur",
          },
        ],
        linkman: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogFormItem: [
        {
          label: "供应商名称",
          type: "input",
          prop: "name",
        },
        {
          label: "联系人",
          type: "input",
          prop: "linkman",
        },
        {
          label: "联系电话",
          type: "input",
          prop: "mobile",
        },
        {
          label: "备注",
          type: "input",
          prop: "remark",
        },
        {
          type: "slot",
          slot_name: "query",
        },
      ],
      // 优化
      columns: [
        {
          label: "序号",
          type: "index",
          sequence: true,
        },
        {
          label: "供应商名称",
          prop: "name",
        },
        {
          label: "联系人",
          prop: "linkman",
        },
        {
          label: "联系电话",
          prop: "mobile",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "操作",
          slot_name: "opteration",
          type: "caozuo",
        },
      ],
      formItem: [
        {
          type: "input",
          placeholder: "供应商名称",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "联系人",
          prop: "linkman",
        },
        {
          type: "input",
          placeholder: "联系电话",
          prop: "mobile",
        },
        {
          type: "slot",
          slot_name: "query",
        },
      ],
      //页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 查询的参数
      supplierQueryParams: {
        linkman: "",
        name: "",
        mobile: "",
      },
      //页码渲染的数据
      SupplierList: [],
      // 控制弹框的显示隐藏
      dialogFormVisible: false,
      //  弹框的数据
      dialogFormParams: {
        mobile: "",
        name: "",
        linkman: "",
        remark: "",
      },
      //弹框的标题
      dialogTitle: "",
      //弹框的正则校验
      dialogRules: {
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getSupplierList();
  },
  methods: {
    //获取供应商列表的数据
    async getSupplierList() {
      try {
        const response = await SupplierApi.supplierList(
          this.currentPage,
          this.pageSize,
          this.supplierQueryParams
        );
        this.SupplierList = response.rows;
        this.total = response.count;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分配每页条数
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      // this.getSupplierList();
      // this.getSupplierList = this.getSupplierList.slice(0, val);
      this.getSupplierList();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSupplierList();
    },
    //查询
    searchQuery() {
      this.currentPage = 1;
      this.getSupplierList();
    },
    //重置表单
    reset() {
      this.$refs["queryForm"].handleResetForm();
    },
    //打开弹框

    handleOpenDialog(id) {
      this.dialogVisible = true;

      if (typeof id === "number") {
        this.handleFind(id);
        this.dialogConfig.title = "供应商编辑";
        return;
      }

      this.dialogConfig.title = "供应商新增";
    },
    handleSubmit() {
      if (this.dialogForm.id) {
        this.handleEdit();
      } else {
        this.handleAdd();
      }
    },
    async handleAdd() {
      try {
        const resposne = await SupplierApi.addSupplier(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getSupplierList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const response = await SupplierApi.editSupplier(
          this.dialogForm.id,
          this.dialogForm
        );
        this.dialogVisible = false;
        this.$message.success("编辑成功");
        this.getSupperList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const supplier = await SupplierApi.findSupplier(id);
        this.dialogForm = supplier;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await SupplierApi.delSupplier(id);
            this.$message.success("删除成功");
            this.getSupplierList();
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      // openDialog(id) {
      //   this.dialogFormVisible = true;
      //   if (typeof id === "number") {
      //     this.findSupplierId(id);
      //     this.dialogTitle = "供应商编辑";
      //   } else {
      //     this.dialogTitle = "供应商添加";
      //   }
      // },
      // //关闭弹框
      // cancelDialog() {
      //   this.reset("dialogForm");
      //   this.dialogFormVisible = false;
      // },
      // //弹框确定按钮
      // determine() {
      //   this.$refs["dialogForm"].validate((valid) => {
      //     if (!valid) return;
      //     this.dialogFormParams.id
      //       ? this.handleEdidSupplier()
      //       : this.handleAddSupplier();
      //   });
      // },
      // //删除单个按钮
      // delSupplier(id) {
      //   this.$confirm("确认删除这条记录吗?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   })
      //     .then(async () => {
      //       try {
      //         const response = await SupplierApi.delSupplier(id);
      //         this.$message.success("删除成功");
      //         this.getSupplierList();
      //       } catch (error) {
      //         console.log(error.message);
      //       }
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "已取消删除",
      //       });
      //     });
      // },
      // //供应商添加
      // async handleAddSupplier() {
      //   try {
      //     const response = await SupplierApi.addSupplier(this.dialogFormParams);
      //     this.reset("dialogForm");
      //     this.getSupplierList();
      //     this.dialogFormVisible = false;
      //     this.$message.success("添加成功");
      //   } catch (error) {
      //     console.log(error.maessage);
      //   }
      // },
      // async findSupplierId(id) {
      //   try {
      //     const response = await SupplierApi.findSupplier(id);
      //     // console.log(response);
      //     this.dialogFormParams = response;
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // },
      // //供应商编辑
      // async handleEdidSupplier() {
      //   try {
      //     const response = await SupplierApi.editSupplier(
      //       this.dialogFormParams.id,
      //       this.dialogFormParams
      //     );
      //     this.getSupplierList();
      //     this.reset("dialogForm");
      //     this.$message.success("编辑成功");
      //     this.dialogFormVisible = false;
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // },
    },
  },
};
</script>
<style scoped lang="scss"></style>
