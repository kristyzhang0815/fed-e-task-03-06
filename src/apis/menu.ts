import request from '@/utils/request'

export interface Menu {
  href: string
  icon?: string
  id: number
  level: number
  orderNum: number
  parentId: number
  name: string
  shown: boolean
  subMenuList?: Array<Menu>
}

export const allMenu = async () => {
  return request.get('/boss/menu/getAll')
}
