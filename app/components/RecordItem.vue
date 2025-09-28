<script setup lang="ts">
import { TYPE_OPTIONS, type RecordItem } from '~/models';

const emit = defineEmits<{
    (e: 'remove'): void
    (e: 'update', value: RecordItem): void

}>()

const { record } = defineProps<{ record: RecordItem }>()

const formState = reactive<RecordItem>({ ...record })

const showPassword = ref(false);
const typeOptions = [...TYPE_OPTIONS];

const remove = () => {
    emit('remove');
}
const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

const validate = recordValidate

watch(
    () => formState,
    (val) => emit('update', val),
    { deep: true, immediate: true }
)

</script>

<template>
    <UForm :validate-on="['blur']" :validate="validate" :state="formState" class="flex">

        <UInput v-model="formState.labels" maxlength="50" placeholder="Метки" />

        <USelect v-model="formState.type" :items="typeOptions" />

        <UFormField name="login">
            <UInput v-model="formState.login" maxlength="100" placeholder="Логин" />
        </UFormField>

        <div v-if="formState.type === 'Локальная'" class="flex items-center gap-1 flex-1">
            <UFormField name="password">
                <UInput v-model="formState.password" placeholder="Password" :type="showPassword ? 'text' : 'password'"
                    :ui="{ trailing: 'pe-1' }">
                    <template #trailing>
                        <UButton color="neutral" variant="link" size="sm"
                            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                            :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword"
                            aria-controls="password" @click="togglePassword()" />
                    </template>
                </UInput>
            </UFormField>

        </div>

        <UButton icon="i-heroicons-trash" color="error" variant="ghost" @click="remove()" />
    </UForm>
</template>
