<script setup lang="ts">
import type { RecordItem } from './models';

const store = useRecordsStore()

const records = ref([...store.records] as (RecordItem & { id?: string })[]);
const add = () => records.value.push({
  id: crypto.randomUUID(),
  labels: "",
  type: "Локальная",
  login: "",
  password: "",
});

const remove = (id: string) => {
  console.log(records.value);
  store.removeRecord(id);
  records.value = records.value.filter(r => r.id !== id);
  console.log(records.value);

}

const update = (record: RecordItem) => {
  records.value = records.value.map(r => r.id === record.id ? record : r);

  if (recordValidate(record).length === 0) {
    store.updateRecord(record)
  }

}

</script>

<template>
  <UApp>
    <div class="flex gap-4">
      <h1 class="text-2xl ">Учетные записи</h1>
      <UButton @click="add()" icon="i-heroicons-plus" color="primary" variant="solid" />
    </div>

    <div class="flex items-center gap-2 rounded-md bg-gray-50 p-2 text-sm text-gray-700">
      <UIcon name="i-heroicons-question-mark-circle" class="h-5 w-5 text-gray-400 shrink-0" />
      <p>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель <code>;</code>
      </p>
    </div>

    <div v-for="(record, index) in records" :key="record.id" class="flex gap-2 items-center">
      <RecordItem :record="record" :index="index" @remove="remove(record.id)" @update="update($event)" />
    </div>
  </UApp>
</template>
