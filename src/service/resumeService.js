import request from '@/utils/request'

export async function getDataService() {
  const response = await request.get(`/test`)
  return response?.data
}
