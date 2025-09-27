<script setup lang="ts">
const store = useRecordsStore()
const add = () => store.addRecord()

</script>

<template>
  <UApp>
    <div class="flex gap-4">
      <h1 class="text-2xl ">Учетные записи</h1>
      <UButton @click="add()" icon="i-heroicons-plus-20-solid" color="primary" variant="solid" />
    </div>

    <div class="flex items-center gap-2 rounded-md bg-gray-50 p-2 text-sm text-gray-700">
      <UIcon name="i-heroicons-question-mark-circle" class="h-5 w-5 text-gray-400 shrink-0" />
      <p>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель <code>;</code>
      </p>
    </div>

    <div v-for="(record, index) in store.records" :key="index" class="flex gap-2 items-center">
      <RecordItem :record="record" :index="index" />
    </div>

  </UApp>
</template>
