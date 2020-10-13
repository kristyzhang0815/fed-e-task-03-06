import request from '@/utils/request'

export interface CourseListParams {
currentPage: number
  pageSize: number
  courseName?: string
  status?: string
}

export const courseList = async (data: CourseListParams) => {
  return request.post('/boss/course/getQueryCourses', data)
}
