import $http from '../config'

/**
 * 获取文章列表
 */
export const getArticleList = (payload?: any) => {
  return $http({
    method: 'get',
    url: '/admin/v1/articles',
    payload,
  })
}

/**
 * 新增文章
 */
interface AddArticleInterface {
  title: string
  author: string
  articleType: number | string
  release: boolean
  body?: string
}
export const addArticle = (payload: AddArticleInterface) => {
  return $http({
    method: 'post',
    url: '/admin/v1/article',
    payload,
  })
}

/**
 * 编辑文章
 */
interface UpdateArticleInterface {
  title: string
  author: string
  articleType: number | string
  release: boolean
  body?: string
  _id: number | string
}
export const updateArticle = (payload: UpdateArticleInterface) => {
  return $http({
    method: 'post',
    url: `/admin/v1/article/${payload._id}/edit`,
    payload,
  })
}

/**
 * 发布文章
 */
interface PublishArticleInterface {
  _id: number
}
export const publishArticle = (payload: PublishArticleInterface) => {
  return $http({
    method: 'post',
    url: '/admin/v1/article/publish',
    payload,
  })
}

/**
 * 取消发布
 */
interface UnpublishArticleInterface {
  _id: number
}
export const unpublishArticle = (payload: UnpublishArticleInterface) => {
  return $http({
    method: 'post',
    url: '/admin/v1/article/unpublish',
    payload,
  })
}

/**
 * 获取文章详情页
 */
interface ArticleDetailInterface {
  _id: string
}
export const articleDetail = (payload: ArticleDetailInterface) => {
  return $http({
    method: 'get',
    url: `/admin/v1/article/${payload._id}`,
    payload,
  })
}
