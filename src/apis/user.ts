import qs from 'qs'
import request from '@/utils/request'

export interface USer {
  phone: string
  password: string
}

export interface UserListParams {
  currentPage: number
  endCreateTime?: string
  pageSize: number
  phone?: string
  startCreateTime?: string
}

export const login = async (data: USer) => {
  return request.post('/front/user/login', qs.stringify(data), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export const mine = async () => {
  return request.get('/front/user/getInfo')
}

export const userList = async (data: UserListParams) => {
  return request.post('/boss/user/getUserPages', data)
}
