<script setup lang="ts">
import type { RecordItem } from './models';

const store = useRecordsStore()

const records = ref([...store.records] as (RecordItem & { id?: string })[]);
const add = () => records.value.push(newRecord());

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
    <div class="flex flex-col gap-4">

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

      <div class="records-table">
        <div>Метка</div>
        <div>Тип записи</div>
        <div>Логин</div>
        <div>Пароль</div>
        <div />

        <template v-for="(record, index) in records" :key="record.id">
          <RecordItem :record="record" :index="index" @remove="remove(record.id)" @update="update($event)" />
        </template>
      </div>

    </div>
  </UApp>
</template>

<style lang="css" scoped>
.records-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: .5rem;
}
</style>
