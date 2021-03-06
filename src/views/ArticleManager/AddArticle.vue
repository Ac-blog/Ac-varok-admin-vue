<template>
  <div class="add-article-wrap">
    <div class="form-content">
      <div class="top-bar">
        <div class="title">
          <h3>{{ isEdit ? '编辑文章' : '创建文章' }}</h3>
        </div>
        <div class="tools">
          <el-button @click="handleFormdataSubmit(isPublished, false)">{{
            isPublished ? '保存并更新' : '保存至草稿'
          }}</el-button>
          <el-button type="primary" @click="handleFormdataSubmit(!isPublished, true)">{{
            isPublished ? '取消发布' : '发布'
          }}</el-button>
        </div>
      </div>
      <el-form
        ref="articleForm"
        class="article-form"
        :model="articleForm"
        :rules="rules"
        label-suffix=":"
        label-width="90px"
      >
        <div class="form-items">
          <!-- 文章标题 -->
          <el-row style="margin-top: 24px;">
            <el-col :span="24">
              <el-form-item label="文章标题" prop="title">
                <el-input
                  type="text"
                  style="width: 100%"
                  v-model="articleForm.title"
                  maxlength="32"
                  show-word-limit
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 24px;" :gutter="40">
            <!-- 作者 -->
            <el-col :span="12">
              <el-form-item label="作者" prop="author">
                <el-input
                  style="width: 100%"
                  v-model="articleForm.author"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 分类 -->
            <el-col :span="12">
              <el-form-item label="文章分类" prop="articleType">
                <el-select
                  style="width: 100%"
                  v-model="articleForm.articleType"
                  placeholder="请选择"
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
          </el-row>
          <!-- 文章正文 -->
          <el-row style="margin-top: 24px;">
            <el-col :span="24">
              <el-form-item label="文章正文" prop="body">
                <!-- 富文本编辑器 -->
                <tiny-editor
                  :visible.sync="tinyEditor.visible"
                  ref="editor"
                  @init_finished="tinyEditorInitFinished"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import channelOptions from '@/config/articleChannelOptions'
import { TinyEditor } from '@/components'
import { addArticle, updateArticle, articleDetail } from '@/http/apis/articleManager'

interface ArticleFormInterface {
  title: string
  author: string
  articleType: number | string
  release: boolean
  body?: string
}

interface TinyEditorInterface {
  visible: boolean
  isInitFinished: boolean
}

@Component({
  components: {
    TinyEditor,
  },
})
export default class AddArticleVue extends Vue {
  /**
   * 解决 ts 无法识别 vue 中的 $refs
   */
  public $refs!: {
    editor: TinyEditor
    articleForm: HTMLFormElement
  }

  private isEdit: boolean = false

  private channelOptions: any[] = channelOptions

  // 文章表单
  private articleForm: ArticleFormInterface = {
    title: '',
    author: '',
    articleType: '',
    release: false,
    body: '',
  }

  // 富文本编辑器
  private tinyEditor: TinyEditorInterface = {
    visible: true,
    isInitFinished: false,
  }

  // 表单规则
  private rules = {
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    author: [{ required: true, message: '请输入文章作者', trigger: 'blur' }],
    articleType: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
  }

  // 当前编辑的文章 Id
  private currentSavedArticleId: string | number = ''

  /** computed */
  // 是否已经发布
  get isPublished(): boolean {
    return this.articleForm.release
  }

  /** watch */
  @Watch('$route', {
    immediate: true,
  })
  onRouteChange(to: any, from: any) {
    // 新建 or 编辑
    this.isEdit = to.path.indexOf('/edit/') !== -1
  }

  /** methods */
  /**
   * 获取文章详情页
   */
  async fetchArticleDetail(id: string): Promise<void> {
    const res: any = await articleDetail({
      _id: id,
    })
    if (res.success) {
      Object.assign(this.articleForm, res.results)
      // 富文本编辑器内容回显
      if (this.articleForm.body) {
        this.$refs.editor.setContent(this.articleForm.body)
      }
    }
  }

  /**
   * 富文本编辑器初始化完成回调
   */
  tinyEditorInitFinished() {
    console.log('初始化完成')
    if (this.isEdit) {
      console.log(this.isEdit)
      console.log(this.$route.params.id)
      this.fetchArticleDetail(this.$route.params.id)
    }
  }

  /**
   * 表单提交数据预处理
   * @param {boolean} release - 是否已经发布
   */
  formdataProcessing(release: boolean) {
    // 文章发布状态
    this.articleForm.release = release
    console.log('release', this.articleForm.release)
    // 文章内容
    this.articleForm.body = this.$refs.editor.getContent()
    console.log('body', this.articleForm.body)
  }

  /**
   * 发布或者保存更新
   * @param {boolean} release - 保存为草稿 false | 发布 true
   * @param {boolean} isJump - 是否跳转到列表页 跳转 true | 停在本页 false
   */
  handleFormdataSubmit(release: boolean, isJump: boolean) {
    console.log('isJump', isJump)
    this.formdataProcessing(release)
    this.$refs.articleForm.validate(async (valid: any) => {
      if (valid) {
        const submitRes: any = await (this.isEdit ? updateArticle : addArticle)({
          ...this.articleForm,
        })
        if (submitRes.success) {
          this.$message({
            message: '已保存成功！',
            type: 'success',
            duration: 1000,
            onClose: () => {
              if (isJump) {
                this.$router.push({ path: '/articleManager' })
              } else {
                this.currentSavedArticleId = submitRes.results.article_id || this.$route.params.id
                this.$router.push({
                  path: `/articleManager/edit/${this.currentSavedArticleId}`,
                })
              }
            },
          })
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.add-article-wrap {
  position: relative;
  display: flex;
  height: 100%;
  .form-content {
    width: 100%;
    height: 100%;
  }
  .top-bar {
    position: absolute;
    top: 17px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 24px 0 20px;
    border-bottom: 1px solid #dcdfe6;
    width: calc(100% - 32px);
    height: 60px;
    background-color: #fff;
    .title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
    }
    /deep/.el-button {
      &--primary {
        background-color: @colorPrimary;
        border-color: @colorPrimary;
      }
      &.disabled {
        color: #909399;
        background-color: #f0f2f5;
      }
    }
  }
  .article-form {
    padding: 76px 24px 40px;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    overflow-y: auto;
    .form-items {
      width: 100%;
      max-width: 1044px;
      /deep/ .el-form-item {
        margin: 0;
      }
    }
  }
}
</style>
