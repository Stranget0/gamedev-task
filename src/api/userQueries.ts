import type { UserFormData, UserListResponse, UserResponse } from './userTypes'
import { appFetch } from './utils'

const baseUrl = 'https://reqres.in/api'

export async function getUsers(page = 1) {
  return await appFetch<UserListResponse>(`${baseUrl}/users?page=${page}`)
}

export async function getUser(userId: string | number) {
  return await appFetch<UserResponse>(`${baseUrl}/users/${userId}`)
}

export async function deleteUser(userId: string | number) {
  return await appFetch<UserListResponse>(`${baseUrl}/users/${userId}`)
}

export async function createUser(data: UserFormData) {
  return await appFetch(`${baseUrl}/users`, { method: 'POST', body: JSON.stringify(data) })
}

export async function updateUser(userId: number | string, data: UserFormData) {
  return await appFetch(`${baseUrl}/users/${userId}`, { method: 'PUT', body: JSON.stringify(data) })
}
