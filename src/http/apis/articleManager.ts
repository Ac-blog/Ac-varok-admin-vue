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
