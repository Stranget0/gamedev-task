<template>
  <form @submit.prevent="onSubmit">
    <SplitLayout
      title="Add user"
      leftContainerClass="flex flex-col justify-between relative"
      rightContainerClass="max-md:row-start-1"
    >
      <template #default>
        <div class="flex gap-4">
          <UserInput name="first_name" required>First Name</UserInput>
          <UserInput name="last_name" required>Last Name</UserInput>
        </div>
        <AppButton
          :type="createOrUpdateIsPending ? 'button' : 'submit'"
          variant="solid"
          class="w-fit mt-20"
        >
          {{ createOrUpdateIsPending ? 'Loading...' : 'Update details' }}
        </AppButton>
        <AppButton v-if="props.id !== undefined" @click="deleteThisUser">Delete</AppButton>
        <Icon
          v-if="isLoading"
          icon="svg-spinners:clock"
          class="w-16 h-16 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
        <AppTypography v-else-if="error && !isLoading" error bold>{{ error }}</AppTypography>
      </template>
      <template #aside>
        <img
          :src="userAvatar"
          width="128"
          height="128"
          class="mx-auto rounded-full border-2 border-slate-300"
        />
        <AppButton
          as="input"
          type="file"
          name="avatar"
          variant="outline"
          class="gap-2 w-full mt-20"
        >
          <Icon class="min-w-fit" icon="material-symbols:photo-camera-rounded" />
          <span>Change photo</span>
        </AppButton>
      </template>
    </SplitLayout>
  </form>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import UserInput from '@/components/UserInput.vue'
import { Icon } from '@iconify/vue'
import SplitLayout from '@/layouts/SplitLayout.vue'
import type { User, UserFormData } from '@/api/userTypes'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'
import { createUser, getUser, updateUser, deleteUser } from '@/api/userQueries'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

type UserIdObj = {
  userId: string
}

const props = defineProps<Partial<User & UserIdObj>>()
const router = useRouter()

const mutationKey = computed(() => ('id' in props ? ['updateUser', props.id] : ['createUser']))

const { data, isLoading, error } = useQuery({
  queryKey: ['getUser', props.userId],
  queryFn: () => {
    if (props.userId !== undefined) {
      return getUser(props.userId)
    }
    return null
  }
})

const { handleSubmit, resetForm, setValues } = useForm({
  initialValues: { avatar: '/assets/avatar_default.svg' },
  validationSchema: toTypedSchema(
    object({
      first_name: string(),
      last_name: string(),
      avatar: string().optional()
    })
  )
})

const $toast = useToast()

watch(data, () => {
  if (!data.value) return
  setValues(data.value.data)
})

const { mutate: createOrUpdate, isPending: createOrUpdateIsPending } = useMutation({
  mutationKey,
  mutationFn: async (values: UserFormData) => {
    if (props.id !== undefined) {
      await updateUser(props.id, values)
    } else {
      await createUser(values)
    }
  },
  onSuccess: () => {
    resetForm()
    $toast.success('User added!')
  },
  onError: (e) => {
    $toast.error(e.message)
  }
})

const onSubmit = handleSubmit((data) => {
  createOrUpdate(data)
})

const { value: userAvatar } = useField<string | undefined>('avatar')


const {mutate: deleteThisUser} = useMutation({
  mutationKey: ['userDelete', props.id],
  mutationFn: async () => {
    if (props.id === undefined) return null
    await deleteUser(props.id)
  },
	onSuccess:()=>{
		$toast.success("User deleted!")
		router.back()
	}
})
</script>
