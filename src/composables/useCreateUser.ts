import { createUser } from '@/api/userQueries'
import type { UserFormData } from '@/api/userTypes'
import { useMutation, type MutationOptions, type UseMutationReturnType, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'

export default function useCreateUser(
  options?: MutationOptions<void, Error, UserFormData, unknown>
): UseMutationReturnType<void, Error, UserFormData, unknown> {
  const $toast = useToast()
	const qc = useQueryClient()

  return useMutation({
    ...options,
    mutationKey: ['createUser'],
    mutationFn: async (values: UserFormData) => {
      await createUser(values)
    },
    onSuccess: (data, variables, ctx) => {
      $toast.success('User created successfully!')
      options?.onSuccess?.(data, variables, ctx)
			qc.invalidateQueries({queryKey: ["userList"]})
    },
    onError: (error, variables, ctx) => {
			$toast.error(`Error creating user ${error.message}`)
			options?.onError?.(error, variables, ctx)
    }
  })
}
