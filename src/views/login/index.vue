
<template>
  <div class="bigbox">
    <div class="login">
      <h2 class="title">积云会员管理系统</h2>
      <el-form :rules="rules" ref="form" :model="loginForm" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
        {{ this.$store.state.token }}
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from "../../api/user";
export default {
  name: "",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "请输入3～12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleLoginSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.handleLogin();
        this.$router.push("/");
        this.$message({
          message: "登陆成功",
          type: "success",
        });
      });
    },
    async handleLogin() {
      try {
        const response = await login(this.loginForm);
        console.log(response);
        this.$store.dispatch("DIS_SET_TOKEN", response.token);

        const userInfo = await getUserInfo();
        console.log(userInfo);
      } catch (e) {
        console.log(e.message);
        9;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.bigbox {
  width: 100%;
  height: 100%;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}
.login {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 160px auto;
  border-radius: 20px;
  padding: 28px;
}
.title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding-top: 20px;
}
.el-form {
  margin-top: 20px;
}
</style>
