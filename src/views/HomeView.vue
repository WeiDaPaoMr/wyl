
<template>
  <div></div>
</template>

<script>
// import request from "../utils/request";
// import axios from "axios";
import TestApi from "../api/api";
// console.log(request);
export default {
  name: "",
  components: {},
  data() {
    return {
      page: 10,
      size: 1,
    };
  },
  created() {
    //http://timemeetyou.com:8889/api/private/v1/

    // request({
    //   url: process.env.VUE_APP_BASE_API + "/",
    //   mounted: "GET",
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //http://vue.mengxuegu.com/pro-api/member/list/search/1/20

    TestApi.getlist(this.page, this.size)
      .then((response) => {
        console.log(response);
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
