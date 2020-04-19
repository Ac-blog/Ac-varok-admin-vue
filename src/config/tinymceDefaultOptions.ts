import ENV from '@/config/env'
const dxyAssetsUrl = '//assets.dxycdn.com/gitrepo/business-admin-v2'
export default {
  // 选择器配置
  selector: '.tinyTextarea',
  // 隐藏技术支持
  branding: false,
  // 隐藏元素路径
  elementpath: false,
  // 中文语言包
  language: 'zh_CN',
  // 禁止调整编辑器大小
  resize: false,
  // 自动获取焦点
  auto_focus: true,
  // 粘贴保留样式
  paste_retain_style_properties: 'all',
  // 转XML
  encoding: 'xml',
  base_url: `${dxyAssetsUrl}${ENV === 'dynamic' ? '_dynamic' : ''}/dist/tinymce/`,
  /**
   * 使用 content_css 自定义可编辑区域
   * http://tinymce.ax-z.cn/general/customize-ui.php
   */
  content_css: '//file1.dxycdn.com/2020/0403/421/3405696333897202930-2.css',
  /**
   * 菜单栏配置
   * http://tinymce.ax-z.cn/general/basic-setup.php
   */
  menubar: false,
  /**
   * 插件配置
   * 参考：https://www.tiny.cloud/docs/plugins/
   */
  plugins: `
    print
    preview
    searchreplace
    autolink
    directionality
    visualblocks
    visualchars
    fullscreen
    image
    imagetools
    link
    media
    template
    code
    codesample
    table
    charmap
    hr
    pagebreak
    nonbreaking
    anchor
    insertdatetime
    advlist
    lists wordcount
    textpattern
    help
    paste
    emoticons
    autosave`, // 插件按需加载 字符串方式/数组方式

  /**
   * 工具栏配置
   * 参考：http://tinymce.ax-z.cn/general/basic-setup.php
   */
  toolbar: [
    'code | undo redo restoredraft | forecolor backcolor bold italic underline strikethrough link | bullist numlist | alignleft aligncenter alignright alignjustify outdent indent',
    'styleselect fontselect fontsizeselect | table image media emoticons hr insertdatetime | preview',
  ],

  height: 550,
  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
  font_formats:
    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;',
  importcss_append: true,
  // 时间日期格式
  template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
  image_caption: true,
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph',
}
