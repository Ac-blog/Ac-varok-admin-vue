<template>
<div class="app-wapper">
  <el-container>
    <Aside />
    <el-container class="inner-container">
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

}
</script>

<style lang="less" scoped>
.app-wapper {
  width: 100%;
  height: 100%;
  /deep/.el-container {
    flex-wrap: wrap;
    border: none!important;
    width: 100%;
    height: 100%!important;
    .inner-container {
      width: calc(100% - 200px);
    }
    .el-main {
      height: calc(100% - 60px);
    }
  }
}

</style>