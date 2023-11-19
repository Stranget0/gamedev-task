import { getUsers } from '@/api/userQueries'
import type { UserListResponse } from '@/api/userTypes'
import { useQuery, type DefaultError, type UseQueryReturnType } from '@tanstack/vue-query'
import { toValue } from 'vue'

export default function useUsersQuery(
  page: () => number
): UseQueryReturnType<UserListResponse, DefaultError> {
  return useQuery({
    queryKey: ['userList', toValue(page)],
    queryFn: () => getUsers(toValue(page))
  })
}
