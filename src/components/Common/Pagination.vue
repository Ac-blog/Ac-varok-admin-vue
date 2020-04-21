<template>
  <el-row type="flex" justify="space-between" align="middle" class="pagination-wrap">
    <div class="total-count">共 {{ pageBean.totalCount }} 篇</div>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pageBean.pageNo"
      :page-szie="pageBean.pageSize"
      :total="pageBean.totalCount"
      @current-change="toPage"
    >
    </el-pagination>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

interface PaginationInterface {
  pageNo: number
  pageSize: number
  totalCount: number
}
@Component({
  name: 'Pagination',
})
export default class Pagination extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,
      }
    },
  })
  pageBean!: PaginationInterface

  @Emit()
  toPage(page: number) {
    console.log(page)
    return page
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.pagination-wrap {
  margin: 20px 0;
  .total-count {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: rgba(146, 149, 154, 1);
  }
  /deep/.el-pager li:not(.disabled).active {
    background-color: @colorPrimary;
  }
}
</style>
