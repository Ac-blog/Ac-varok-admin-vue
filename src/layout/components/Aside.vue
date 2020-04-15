<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <div class="logo-container"></div>
    <el-menu
      :default-openeds="['1']"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>资源管理
        </template>
        <router-link class="nav-link" to="/articleManager">
          <el-menu-item index="1-1">文章管理</el-menu-item>
        </router-link>
      </el-submenu>
      <router-link class="nav-link" to="/about">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i><span>关于我们</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Aside',
})
export default class Aside extends Vue {

}
</script>

<style lang="less" scoped>
.el-aside {
  color: #333;
  .logo-container {
    width: 100%;
    height: 60px;
    background-color: peru;
  }
  .nav-link {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>