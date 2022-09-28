
<template>
  <div>
    <el-form
      :inline="true"
      ref="queryForm"
      :model="value"
      class="demo-form-inline"
    >
      <template v-for="(item, index) in formItem">
        <el-form-item
          v-if="item.type === 'input'"
          :key="index"
          :prop="item.prop"
        >
          <el-input
            v-model="value[item.prop]"
            :placeholder="item.placeholder"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="item.type === 'slot'" :prop="item.prop">
          <slot :name="item.slot_name"></slot>
        </el-form-item>
      </template>
      <!-- <el-form-item prop="linkman">
        <el-input v-model="value.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="value.mobile" placeholder="练习电话"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    formItem: {
      type: Array,
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
    handleResetForm() {
      this.$refs["queryForm"].resetFields();
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
