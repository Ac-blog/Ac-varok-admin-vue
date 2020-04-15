<template>
<div class="app-wapper">
  <el-container style="height: 500px; border: 1px solid #eee">
    <Aside />
    <el-container>
      <Header />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Header, Aside } from '../components'

@Component({
  components: {
    Header,
    Aside,
  },
})
export default class Layout extends Vue {
  private item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
  }

  private tableData: string[] = Array(20).fill(this.item)
}
</script>

<style lang="less" scoped>
.app-wapper {
  width: 100%;
  height: 100%;
  /deep/.el-container {
    flex-wrap: wrap;
    border: none!important;
    height: 100%!important;
    .el-main {
      height: calc(100% - 60px);
    }
  }
}

</style>