<template>
  <div class="home">
    <el-container class="head-box">
      <el-header class="home-header" style="height:100px">
        <div class="head-title">
          <i class="el-icon-office-building"></i>
          <span>鲁班后台管理系统(OMS)</span>
        </div>
        <div class="exit-box">
          <el-button class="exit" @click="exit" type="info">退出</el-button>
        </div> 
      </el-header>
    </el-container>
    <el-container class="main-box">
      <el-aside class="home-aside" :width="collapseStatus ? '80px': '200px'">
        <div class="collapse" @click="triggerCollapse">
          <i class="el-icon-sunny"></i>
        </div>
        <el-menu class="aside-menu" 
          text-color="#fff" 
          background-color="#545c64" 
          active-text-color="#ffd04b"
          unique-opened
          :collapse='collapseStatus'
          :collapse-transition = 'false'
          router
        >
          <el-submenu :index='item1.id + " " ' v-for="item1 in menusList" :key="item1.id"> 
            <template slot="title" class="item-title">
              <i :class="iconLists[item1.id-1]"></i>
              <span>{{item1.authName}}</span>
            </template>
            <div v-for="item2 in item1.children" :key="item2.id">
              <el-menu-item :index=" '/' + item2.path" class="item" style="padding-left: 60px;">{{item2.authName}}</el-menu-item>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-contain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name:'home',
  data(){
    return{
      menusList:[],
      iconLists:[
        'el-icon-s-custom',
        'el-icon-s-order',
        'el-icon-menu',
        'el-icon-s-marketing',
        'el-icon-s-data'
      ],
      collapseStatus:false,
    }
  },
  mounted(){
    this.getMenus()
  },
  methods:{
    exit(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus(){
      let {data:res} =  await this.$ajax.get('/menus')
      this.menusList = res.data.menus;
    },
    triggerCollapse(){
      this.collapseStatus = !this.collapseStatus
    }
  }
}
</script>

<style scoped lang='scss'>
$fontColor:#fff;
 .home{
   width: 100%;
   height: 100%;
 }
 .head-box{
   width: 100%;
   height: 100px;
   line-height: 100px;
   background-color: #4a5158;
   font-size: 30px;
   color: rgb(238, 237, 237);
   font-weight: 500;
 }
 .home-header{
   display: flex;
   justify-content: center;
   align-items: center;
   .head-title{
    flex: 4;
  }
  .exit-box{
    flex: 1;
    text-align: right;
  }
 }
 .main-box{
   display: flex;
   height: 100%;
 }
 .home-aside{
   width: 200px;
   height: 100%;
   background-color: #545c64;
   .collapse{
     width: 100%;
     height: 30px;
     line-height: 30px;
     font-size: 14px;
     color: $fontColor;
     text-align: center;
     background-color: #666a6d;
   }
   .aside-menu{
     width: 100%;
     height: 100%;
   }
 }
 .home-contain{
   flex: 1;
   height: 100%;
   background-color: rgba(227, 221, 221, 0.6);
 }
</style>