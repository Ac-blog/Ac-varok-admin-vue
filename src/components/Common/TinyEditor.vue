<template>
  <div class="editor-container" v-if="visible">
    <div class="tiny-editor" :style="containerStyle">
      <div class="tips-line" v-show="!isInitFinished">
        <p>初始化中...</p>
      </div>
      <div v-show="isInitFinished">
        <textarea ref="tinyEditor" class="tinyTextarea" name="tinyTextarea"></textarea>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import tinymceDefaultOptions from '@/config/tinymceDefaultOptions.ts'
import ENV from '@/config/env'

interface Window {
  tinymce: any
}

declare var window: Window

@Component({
  name: 'TinyEditor',
})
export default class TinyEditor extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  visible?: boolean

  @Prop({
    type: Object,
    default: () => {
      return {
        width: '100%',
        height: 'auto',
      }
    },
  })
  containerStyle?: object

  // 编辑器是否初始化完成
  private isInitFinished: boolean = false

  // 编辑器实例
  private tinymce: any = null

  // 编辑器内容
  private editorContent: string = ''

  // 默认配置项
  private tinyDefault: object = {
    imageUrl: 'http://assets.dxycdn.com/gitrepo/bbs/img/bbs/logo.png',
  }

  getContent() {
    this.editorContent = this.tinymce[0].getContent()
    return this.editorContent
  }

  setContent(content: any) {
    this.tinymce[0].setContent(content)
  }

  getPreview() {
    this.tinymce[0].execCommand('mcePreview')
  }

  /**
   * 预览指令执行结束
   */
  mcePreviewCommandEvent() {
    this.$nextTick(() => {
      const previewtToxDialog: HTMLElement | null = document.querySelector('.tox-dialog')
      const previewDialogFooterStartEle: HTMLElement | null = document.querySelector(
        '.tox-dialog-wrap .tox-dialog__footer .tox-dialog__footer-start'
      )

      if (previewtToxDialog && previewDialogFooterStartEle) {
        previewtToxDialog.setAttribute('data-status', 'pc')
        previewDialogFooterStartEle.innerHTML = '点击切换预览视窗'

        // 预览的 iframe srcdoc 属性值，添加 <meta name="referrer" content="never"> 防止外源图片不显示
        // const previewIframe = document.getElementsByTagName('iframe')[1]
        // let srcDoc = previewIframe.getAttribute('srcdoc')
        // let temp = srcDoc.split('<head>')
        // let newSrcDoc = temp[0] + '<head><meta name="referrer" content="never">' + temp[1]
        // previewIframe.setAttribute('srcdoc', newSrcDoc)
        // window.frames[1].document.write(newSrcDoc)

        previewDialogFooterStartEle?.addEventListener('click', () => {
          const dataStatus = previewtToxDialog?.getAttribute('data-status')
          if (dataStatus === 'pc') {
            previewtToxDialog?.setAttribute('data-status', 'mobile')
          } else if (dataStatus === 'mobile') {
            previewtToxDialog?.setAttribute('data-status', 'pc')
          }
        })
      }
    })
  }

  /**
   * Fired after a command has executed
   * https://www.tiny.cloud/docs/advanced/events/
   * @param {string} commandType - 执行类型
   */
  commandEvent(commandType: string) {
    switch (commandType) {
      case 'mcePreview':
        this.mcePreviewCommandEvent()
        break
      default:
        return false
    }
  }

  mounted() {
    this.$nextTick(async () => {
      this.tinymce = await window.tinymce.init({
        ...tinymceDefaultOptions,
        // 初始化结束后执行
        init_instance_callback: (editor: any) => {
          this.isInitFinished = true
          this.$emit('init_finished')

          editor.on('ExecCommand', (e: any) => {
            console.log('富文本编辑器功能触发', e)
            this.commandEvent(e.command)
          })
        },
      })
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.editor-container {
  position: relative;
  width: 100%;
  .tiny-editor {
    background-color: #fff;
    .tips-line {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #d8dce6;
      width: 100%;
      height: 550px;
    }
  }
  /deep/.tox {
    &.tox-tinymce {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      .tox-toolbar__group {
        border-color: #dcdfe6;
      }
    }
    .tox-statusbar {
      border-top: none;
    }
  }
  .editor-actions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #fff;
    border-top: none;
    width: 100%;
    height: 35px;
    line-height: 35px;
    background-color: @colorPrimary;
    box-sizing: border-box;
    .editor-action-btn {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &:hover {
        &::after {
          position: absolute;
          content: ' ';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.2);
        }
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
