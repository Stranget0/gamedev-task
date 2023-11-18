import { getUser } from '@/api/userQueries'
import type { UserResponse } from '@/api/userTypes'
import { useQuery, type DefaultError, type UseQueryReturnType } from '@tanstack/vue-query'
import { toValue } from 'vue'

export default function useUserQuery(
  userId: () => number | string | undefined
): UseQueryReturnType<UserResponse, DefaultError> {
  return useQuery({
    queryKey: ['getUser', userId()],
    queryFn: () => {
      const id = toValue(userId)
      if (id === undefined) {
        return null
      }
      return getUser(id)
    }
  })
}
