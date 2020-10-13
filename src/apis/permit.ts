import request from '@/utils/request'

export const permitDetail = async () => {
  return request.get('/boss/permission/getUserPermissions')
}
