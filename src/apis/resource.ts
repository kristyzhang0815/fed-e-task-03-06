import request from '@/utils/request'

export interface ResourceListParams {
  categoryId?: string
  current: number
  name?: string
  size: number
  url?: string
}

export const resourceList = async (data: ResourceListParams) => {
  return request.post('/boss/resource/getResourcePages', data)
}

export const allCategory = async () => {
  return request.get('/boss/resource/category/getAll')
}
