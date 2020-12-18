<template>
  <div class="ele">
    <div class="login-box">
      <div class="loginImg">
        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
      </div>
      <el-form class="loginForm" :model="form" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input placeholder="请输入登陆名称" v-model="form.username" prefix-icon="el-icon-user-solid" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入登陆密码" v-model="form.password" prefix-icon="el-icon-star-on" show-password></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="theLogin">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      form:{
        username:'admin',
        password:'12345678'
      },
      rules:{
        username:[
          {required: true,message: '请输入用户名称',trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password:[
          {required: true,message: '请输入用户密码',trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    reset(){
      this.$refs.form.resetFields()
    },
    theLogin(){
      // validate 表单验证，参数为valid
      this.$refs.form.validate( async valid =>{
        // 如果验证失败，停止执行
        if(!valid){return}
        //  验证成功，进行数据请求，如果数据中状态返回码为200，则提示登录成功，并将数据返回的token值保存到临时存储中。且跳转到home主页。
        let { data: res} = await this.$ajax.get('https://api-hmugo-web.itheima.net/api/public/v1/home/catitems');
        // 无后台数据支持，增加用户名的验证。
        if(res.meta.status == 200 &&this.form.username == 'admin'){
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token',res.meta.msg)
          this.$router.push('/home')
        }else{
          this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>


<style scoped lang='scss'>
 .ele{
   width: 100%;
   height: 100%;
   background-color: rgb(181, 196, 236);
   position: relative;
 }
 .login-box{
   width: 600px;
   height: 400px;
   box-sizing: border-box;
   padding: 10px 20px 20px;
   background-color: #fff;
   border-radius: 5px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
  .submit{
    display: flex;
    justify-content: flex-end;
  }
  .loginImg{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 10px;
    background-color: rgba(235, 240, 189, 0.3);
    border: 1px solid rgba(235, 240, 189, 0.6); 
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .loginForm{
    box-sizing: border-box;
    padding-top: 140px;
  }
 }
</style>
