
<template>
  <div></div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {
    this.$axios({
      url: process.env.VUE_APP_BASE_API + "/",
      mounted: "GET",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
</style>
