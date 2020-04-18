import $http from '../config'

export const getArticleList = (payload?: any) => {
  return $http({
    method: 'get',
    url: '/admin/v1/articles',
    payload,
  })
}
