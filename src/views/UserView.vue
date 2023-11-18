<template>
  <form @submit.prevent="onSubmit">
    <input type="hidden" />
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

        <div class="flex justify-between mt-20" v-if="!isUserLoading && !isPendingDelete">
          <AppButton type="submit" variant="solid">
            {{ createOrUpdateIsPending ? 'Loading...' : 'Update details' }}
          </AppButton>
          <AppButton variant="outline" v-if="props.id !== undefined" @click="deleteThisUser">Delete</AppButton>
        </div>
        <Icon
          v-else
          icon="svg-spinners:clock"
          class="w-16 h-16 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
        <AppTypography v-if="userError" error bold>{{ userError }}</AppTypography>
      </template>
      <template #aside>
        <img
          :src="avatar"
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
import AppTypography from '@/components/AppTypography.vue'
import UserInput from '@/components/UserInput.vue'
import { Icon } from '@iconify/vue'
import SplitLayout from '@/layouts/SplitLayout.vue'
import type { User } from '@/api/userTypes'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import useUserQuery from '@/composables/useUserQuery'
import useCreateUser from '@/composables/useCreateUser'
import useUpdateUser from '@/composables/useUpdateUser'
import useDeleteUser from '@/composables/useDeleteUser'

const props = defineProps<Partial<User>>()
const router = useRouter()

const { data: userData, isLoading: isUserLoading, error: userError } = useUserQuery(() => props.id)
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

watch(userData, () => {
  if (!userData.value) return
  setValues(userData.value.data)
})

const { mutate: mutateCreateUser, isPending: isPendingCreateUser } = useCreateUser({
  onSuccess: () => resetForm()
})
const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } = useUpdateUser(() => props.id)
const { mutate: deleteThisUser, isPending: isPendingDelete } = useDeleteUser(() => props.id, {
  onSuccess: () => router.back()
})

const createOrUpdateIsPending = computed(
  () => isPendingCreateUser.value || isPendingUpdateUser.value
)

const onSubmit = handleSubmit((data) => {
  if (props.id !== undefined) mutateCreateUser(data)
  else mutateUpdateUser(data)
})

const { value: avatar } = useField('avatar')
</script>
