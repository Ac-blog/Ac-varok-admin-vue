<template>
  <div class="article-manager-container">
    <div class="article-list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { getArticleList } from '@/http/apis/articleManager'
interface ArticleList {
  success: boolean,
  results: object
}

@Component({
  name: 'ArticleManager',
  components: {},
})

export default class ArticleManager extends Vue {
  private tableData: any[] = []

  public async created(): Promise<void> {
    console.log('created')
    const articleListRes: any = await getArticleList()

    if (articleListRes.success) {
       this.tableData = articleListRes.results.items
    }
  }
}
</script>
