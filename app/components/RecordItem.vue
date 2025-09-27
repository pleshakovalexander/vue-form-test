<script setup lang="ts">
import { TYPE_OPTIONS, type RecordItem } from '~/models';
import { useRecordsStore, } from '~/stores/records'

const store = useRecordsStore()

const { record, index } = defineProps<{ record: RecordItem, index: number }>()

const showPassword = ref(false);
const typeOptions = [...TYPE_OPTIONS];

const remove = (i: number) => store.removeRecord(i)
const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

</script>

<template>
    <UInput :model-value="record.labels" maxlength="50" placeholder="Метки" class="flex-1"
        @update:model-value="val => store.updateRecord(index, { labels: val })" />


    <USelect :model-value="record.type" :items="typeOptions" class="w-40" @update:model-value="val => store.updateRecord(index, {
        type: (val as any), password:
            val === 'LDAP' ? null : record.password
    })" />


    <UInput :model-value="record.login" maxlength="100" placeholder="Логин" class="flex-1"
        @update:model-value="val => store.updateRecord(index, { login: val })" />


    <div v-if="record.type === 'Локальная'" class="flex items-center gap-1 flex-1">
        <UInput :model-value="record.password" placeholder="Password"
            @update:model-value="val => store.updateRecord(index, { password: val })"
            :type="showPassword ? 'text' : 'password'" :ui="{ trailing: 'pe-1' }">
            <template #trailing>
                <UButton color="neutral" variant="link" size="sm"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword"
                    aria-controls="password" @click="togglePassword()" />
            </template>
        </UInput>
    </div>


    <UButton icon="i-heroicons-trash" color="error" variant="ghost" @click="remove(index)" />


</template>
