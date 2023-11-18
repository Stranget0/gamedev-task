import { deleteUser } from '@/api/userQueries'
import { useMutation, type MutationOptions, type UseMutationReturnType } from '@tanstack/vue-query'
import { toValue } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useDeleteUser(
  userId: () => number | string | undefined,
  options?: MutationOptions<null, Error, string | number, unknown>
): UseMutationReturnType<null, Error, string | number, unknown> {
  const $toast = useToast()

  return useMutation({
    ...options,
    mutationKey: ['deleteUser', userId()],
    mutationFn: async () => {
      const id = toValue(userId)
      if (id === undefined) return null
      await deleteUser(id)
      return null
    },
    onSuccess: (data, variables, ctx) => {
      $toast.success('User deleted successfully!')
      options?.onSuccess?.(data, variables, ctx)
    },
    onError: (error, variables, ctx) => {
      $toast.error(`Error deleting user ${error.message}`)
      options?.onError?.(error, variables, ctx)
    }
  })
}
