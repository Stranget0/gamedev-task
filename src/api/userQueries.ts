import type { UserListResponse } from './userTypes'
import { appFetch } from './utils'

const baseUrl = 'https://reqres.in/api'

export async function getUsers(page = 1) {
  return await appFetch<UserListResponse>(`${baseUrl}/users?page=${page}`)
}
