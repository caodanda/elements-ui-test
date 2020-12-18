<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home' }" ></el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadLists" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name:'breadCrumb',
  data(){
    breadLists:['','','']
  }
}
</script>