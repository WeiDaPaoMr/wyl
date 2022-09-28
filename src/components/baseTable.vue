
<template>
  <div>
    <el-table :data="SupplierList" border style="width: 100%" height="700">
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.sequence"
          :key="index"
          v-bind="item"
        ></el-table-column>
        <el-table-column v-bind="item" v-if="!item.type">
          <!-- <template v-slot="scope">
            <el-button type="primary" size="min">编辑</el-button>
            <el-button type="danger" size="min">删除</el-button>
          </template> -->
        </el-table-column>
        <el-table-column
          v-if="item.type === 'caozuo'"
          :label="item.label"
          v-bind="item"
        >
          <template v-slot="scope">
            <slot :name="item.slot_name" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="mt_2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    SupplierList: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总条数
    total: {
      type: Number,
      default: () => [],
    },
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
