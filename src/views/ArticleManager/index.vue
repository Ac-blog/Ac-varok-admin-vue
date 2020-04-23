<template>
  <div class="article-manager-container">
    <div class="filter-wrap">
      <el-row type="flex" justify="space-between" class="table-top-wrap">
        <div class="article-status-filter">
          <div
            v-for="(item, index) in articleStatusConfig"
            :key="item.value"
            class="status-item"
            :class="{ active: index === currentStatusItemIndex }"
            @click="articleStatusFilter(item.value, index)"
          >
            <span v-if="item.value !== ''" class="total-num" :class="item.customClass">{{
              item.value === 1 ? publishedNum : unpublishedNum
            }}</span>
            {{ item.text }}
          </div>
        </div>
        <div>
          <el-button
            class="send-article-btn"
            type="primary"
            @click="$router.push('/articleManager/add')"
            v-if="true"
          >
            去发文
          </el-button>
        </div>
      </el-row>
      <el-row :gutter="20" style="margin-top: 24px;" class="filter-form-wrap">
        <el-form ref="form" :model="filterFormData" label-width="80px" label-suffix=": ">
          <el-col :span="6">
            <el-form-item label="文章标题">
              <el-input
                v-model="filterFormData.title"
                placeholder="请输入"
                clearable
                @input="
                  handleFilterEvent({
                    withDebounce: true,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文章类型">
              <el-select
                style="width: 100%;"
                v-model="filterFormData.article_channel"
                @change="handleFilterEvent"
              >
                <el-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="article-list" style="margin-top: 34px;">
      <el-table :data="articleData" style="width: 100%">
        <el-table-column fixed prop="release" label="状态" width="80">
          <template slot-scope="scope">
            <span class="article-status" :class="{ 'is-published': scope.row.release }">{{
              scope.row.release ? '已发布' : '未发布'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者" width="120"> </el-table-column>
        <!-- <el-table-column prop="body" label="内容"> </el-table-column> -->
        <el-table-column prop="articleType" label="分类">
          <template slot-scope="scope">
            {{ scope.row.articleType | channelOptionsFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="readNumber" label="阅读量"></el-table-column>
        <el-table-column prop="like" label="点赞量" width="120"> </el-table-column>
        <el-table-column prop="updated" label="更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.release"
              @click="publishTheArticle(scope.row._id)"
              type="text"
            >
              取消发布
            </el-button>
            <el-button v-else @click="cancelTheArticle(scope.row._id)" type="text">发布</el-button>
            <el-button type="text" @click="$router.push(`/articleManager/edit/${scope.row._id}`)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pageBean="pageBean" @to-page="toPage" />
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getArticleList } from '@/http/apis/articleManager'
import channelOptions from '@/config/articleChannelOptions'
import { Pagination } from '@/components'
interface ArticleList {
  success: boolean
  results: object
}

interface FilterOption {
  withDebounce?: boolean
}

interface FilterFormDataInterface {
  page: number
  size: number
  title?: string
  article_channel?: number | string
}

@Component({
  name: 'ArticleManager',
  components: {
    Pagination,
  },
  filters: {
    channelOptionsFilter(value: string | number): string {
      return channelOptions.find((item: any) => item.id === value).name
    },
  },
})
export default class ArticleManager extends Vue {
  // 头部操作栏目
  private articleStatusConfig: any[] = [
    {
      text: '全部文章',
      value: '',
      customClass: '',
    },
    {
      text: '已发布',
      value: 1,
      customClass: 'published',
    },
    {
      text: '未发布',
      value: 0,
      customClass: 'unPublished',
    },
  ]

  private currentStatusItemIndex: number = 0

  // 文章分类配置
  private channelOptions: any[] = channelOptions

  // 已发布文章数
  private publishedNum: number = 0

  // 未发布文章数
  private unpublishedNum: number = 0

  // 分页器数据
  private pageBean: any = {}

  // 过滤表单
  private filterFormData: FilterFormDataInterface = {
    page: 1,
    size: 10,
    title: '',
    article_channel: '',
  }

  private articleData: any[] = []

  // debounceTimer
  private debounceTimer: any = null

  @Watch('$route', {
    immediate: true,
  })
  onrRouteChange(to: any, from: any) {
    /** 监听 Router 动态路由参数的变化，调整 tab 切换的数据  */
    this.init(to.query)
  }

  /**
   * 函数防抖
   * @param {function} fn - 执行函数
   * @param {number} wait - 等待时间
   */
  debounce(fn: any, wait = 300) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    this.debounceTimer = setTimeout(() => {
      fn()
      this.debounceTimer = null
    }, wait)
  }

  /**
   * 获取文章列表
   */
  async fetchLatestArticleList(query: any): Promise<void> {
    const articleListRes: any = await getArticleList({
      ...this.filterFormData,
      ...query,
    })
    if (articleListRes.success) {
      this.articleData = articleListRes.data.items
      this.publishedNum = articleListRes.data.publishedNum
      this.unpublishedNum = articleListRes.data.unpublishedNum
      this.pageBean = articleListRes.data.pageBean
    }
  }

  queryUpdate() {
    const query: any = Object.assign({}, this.filterFormData)
    this.$router.push({
      query,
    })
  }

  /**
   * 过滤触发方法
   */
  handleFilterEvent(opt: FilterOption) {
    this.$nextTick(() => {
      if (opt.withDebounce) {
        this.debounce(() => {
          this.queryUpdate()
        }, 300)
      } else {
        this.queryUpdate()
      }
    })
  }

  /**
   * 发布文章
   */
  publishTheArticle(articleId: number) {
    console.log(articleId)
  }

  /**
   * 取消发布文章
   */
  cancelTheArticle(articleId: number) {
    console.log(articleId)
  }

  /**
   * 分页
   */
  toPage(page: number) {
    this.filterFormData.page = page
    this.queryUpdate()
  }

  /**
   * 初始化
   */
  init(query: any) {
    this.fetchLatestArticleList(query)
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/var.less';
.article-manager-container {
  .filter-wrap {
    width: 100%;
    .table-top-wrap {
      padding: 0 24px 0 16px;
      border-bottom: 1px solid #dcdfe6;
      width: 100%;
      height: 65px;
      line-height: 65px;
      .article-status-filter {
        display: flex;
        .status-item {
          position: relative;
          margin-left: 52px;
          padding: 0 4px;
          font-size: 18px;
          color: @colorSecondary;
          font-weight: 500;
          cursor: pointer;
          &:nth-of-type(1) {
            margin-left: 0;
          }
          &.active {
            color: @colorMain;
            &::after {
              content: '';
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 100%;
              height: 1px;
              background-color: @colorPrimary;
            }
          }
          .total-num {
            position: absolute;
            top: 8px;
            right: 0;
            transform: translateX(100%);
            padding: 0 6px;
            border-radius: 5px;
            height: 12px;
            line-height: 12px;
            text-align: center;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: @white;
            &.published {
              background: @colorSuccess;
            }
            &.unPublished {
              background: @colorWarning;
            }
          }
        }
      }
      .send-article-btn {
        border-color: @colorPrimary;
        width: 90px;
        height: 40px;
        background-color: @colorPrimary;
      }
    }
    .filter-form-wrap {
      /deep/.el-form-item {
        margin-bottom: 0;
      }
    }
  }

  /deep/ .el-table {
    &__row {
      .article-status {
        color: @colorWarning;
        &.is-published {
          color: @colorSuccess;
        }
      }
      .el-button--text {
        color: @colorNormal;
        &:hover {
          color: @colorPrimary;
        }
      }
    }
  }
}
</style>
