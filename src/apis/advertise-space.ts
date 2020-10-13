import request from '@/utils/request'

export const allAdvertiseSpace = async () => {
  return request.get('/front/ad/space/getAllSpaces')
}
