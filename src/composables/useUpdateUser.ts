import { updateUser } from '@/api/userQueries'
import type { UserFormData } from '@/api/userTypes'
import { useMutation, type MutationOptions, type UseMutationReturnType } from '@tanstack/vue-query'
import { toValue } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useUpdateUser(
  userIdToUpdate: () => number | string | undefined,
  options?: MutationOptions<null | undefined, Error, UserFormData, unknown>
): UseMutationReturnType<null, Error, UserFormData, unknown> {
  const $toast = useToast()

  return useMutation({
    ...options,
    mutationKey: ['updateUser', toValue(userIdToUpdate)],
    mutationFn: async (values: UserFormData) => {
      const userId = toValue(userIdToUpdate)
      if (userId === undefined) return null
      await updateUser(userId, values)
      return null
    },
    onSuccess: (...args) => {
      $toast.success('User updated successfully!')
      options?.onSuccess?.(...args)
    },
    onError: (error, ...args) => {
      $toast.error(`Error updating user ${error.message}`)
      options?.onError?.(error, ...args)
    }
  })
}
