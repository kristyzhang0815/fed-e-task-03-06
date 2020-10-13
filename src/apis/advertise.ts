import request from '@/utils/request'

export interface AdvertiseListParams {
  pageNum: number
  pageSize: number
}

export const advertiseList = async (params: AdvertiseListParams) => {
  return request.get('/front/ad/getAdList', { params })
}
