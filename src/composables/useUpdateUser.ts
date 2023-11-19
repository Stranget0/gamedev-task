import { updateUser } from '@/api/userQueries'
import type { UserFormData } from '@/api/userTypes'
import { useMutation, type MutationOptions, type UseMutationReturnType, useQueryClient } from '@tanstack/vue-query'
import { toValue } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useUpdateUser(
  userId: () => number | string | undefined,
  options?: MutationOptions<null | undefined, Error, UserFormData, unknown>
): UseMutationReturnType<null, Error, UserFormData, unknown> {
  const $toast = useToast()
	const qc = useQueryClient()


  return useMutation({
    ...options,
    mutationKey: ['updateUser', toValue(userId)],
    mutationFn: async (values: UserFormData) => {
      const id = toValue(userId)
      if (id === undefined) return null
      await updateUser(id, values)
      return null
    },
    onSuccess: (...args) => {
      $toast.success('User updated successfully!')
      qc.invalidateQueries({ queryKey: ['userList'] })
      qc.invalidateQueries({ queryKey: ['user', toValue(userId)] })
      options?.onSuccess?.(...args)
    },
    onError: (error, ...args) => {
      $toast.error(`Error updating user ${error.message}`)
      options?.onError?.(error, ...args)
    }
  })
}
