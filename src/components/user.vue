<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home' }" >主页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容 -->
    <el-card>
      <!-- 搜索栏 -->
      <el-row :gutter="40">
        <el-col :span="12">
          <el-input placeholder="请输入搜索内容" v-model="userData.userName">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUserStatus = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格内容 -->
      <el-table :data="userData" border stripe >
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="140">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="140">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="120">
        </el-table-column>
        <el-table-column  label="状态" width="100">
          <!-- 作用域插槽，可以获取当前行的内容 == scope.row  -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.userStatus" @change="userStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <!--作用域插槽 -->
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable = false>
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable = false>
              <el-button type="warning" icon="el-icon-share"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable = false >
              <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
     
      </el-table>
      <!-- 底部分页 -->
      <el-pagination
        layout="total,prev, pager, next"
        :total="userData.length">
      </el-pagination>
      <!-- 添加用户表单 -->
      <el-dialog title="添加用户" :visible.sync="addUserStatus" @close='closeDialog'>
        <el-form :model="addUser" label-position='right' label-width="80px" :rules="addUserRules" ref="addUser">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addUser.userName" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" >
            <el-input v-model="addUser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" >
            <el-input v-model.number="addUser.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="addUserStatus = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

  </div>
</template>
<script>
export default {
  name:'user',
  data(){
    return {
      userData:[
        {userName:'admin',email:'766747781@qq.com',mobile:'13041041630',role:'超级管理员',userStatus:true},
        {userName:'lily',email:'766747781@qq.com',mobile:'13041041630',role:'管理员',userStatus:false},
        {userName:'张三三',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:true},
        {userName:'李思思',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:true},
        {userName:'王呜呜',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:true},
        {userName:'白溜溜',email:'766747781@qq.com',mobile:'13041041630',role:'管理员',userStatus:false},
        {userName:'胖乎乎',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:true},
        {userName:'杨爸爸',email:'766747781@qq.com',mobile:'13041041630',role:'管理员',userStatus:true},
        {userName:'东瞧瞧',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:true},
        {userName:'哦样也',email:'766747781@qq.com',mobile:'13041041630',role:'普通会员',userStatus:false}
      ],
      addUser:{
        userName:'',
        email:'',
        mobile:''
      },
      addUserStatus:false,
      addUserRules:{
        userName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        mobile:[
          { required: true, message: '手机号码不能为空'},
          { type: 'number', message: '手机号码必须为数字值'}
        ]
      }
    }
  },
  mounted(){
    // 进入页面之后初始化用户列表信息，并保存到localStorage中
   this.getStorage()
  },
  methods:{
    getStorage(){
      let storage = window.localStorage;
      if(storage.getItem('userData') == null){
        storage.setItem('userData',JSON.stringify(this.userData));
      }else{
        this.userData = JSON.parse(storage.getItem('userData'))
      }
    },
    // 用户状态修改
    userStatusChange(e){
      for(let item of this.userData){
        if(item.userName == e.userName){
          item.userStatus = e.userStatus
        }
      }
      window.localStorage.setItem('userData',JSON.stringify(this.userData))
      this.$message.success('状态修改成功');
    },
    // 删除用户操作
    delUser(e){
      console.log(e);
      if(e == undefined){return}
      for(let item of this.userData){
        if(item.userName == e.userName){
          let index = this.userData.indexOf(item)
          this.userData.splice(index,1)
        }
      }
      window.localStorage.setItem('userData',JSON.stringify(this.userData))
      this.$message.success('删除成功');
    },
    // 添加用户 == 关闭对话框数据重置操作
    closeDialog(){
      this.$refs.addUser.resetFields()
    },
    submit(){
      this.$refs.addUser.validate((vaild)=>{
        if(vaild === true){
          this.addUser.role = '普通会员'
          this.addUser.userStatus = true
          this.userData.push(Object.assign({},this.addUser));
          window.localStorage.setItem('userData',JSON.stringify(this.userData))
        }
      })
      this.addUserStatus = false
    }
  }
}
</script>
<style scoped lang='scss'>
 .el-breadcrumb,.el-row{
   margin-bottom: 20px;
 }
 .el-input{
   width: 460px;
 }
 
</style>