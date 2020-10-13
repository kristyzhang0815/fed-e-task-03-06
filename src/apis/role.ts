import request from '@/utils/request'

export interface RoleListParams {
    current: number
    name: string
    size: number
}

export const roleList = async (data: RoleListParams) => {
  return request.post('/boss/role/getRolePages', data)
}
