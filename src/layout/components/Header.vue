<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="user-name">Allen 周嘉炜</span>
  </el-header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Header',
})
export default class Header extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.el-header {
  width: 100%;
  line-height: 60px;
  color: @colorMain;
  background-color: @black_level_1;
  /deep/.el-dropdown {
    color: @white;
  }
  .user-name {
    color: @white;
  }
}
</style>
