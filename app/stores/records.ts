import { defineStore } from "pinia";
import type { RecordItem } from "~/models";

export const useRecordsStore = defineStore("records", {
  state: () => ({
    records: [] as RecordItem[],
  }),
  actions: {
    addRecord() {
      this.records.push({
        id: crypto.randomUUID(),
        labels: "",
        type: "Локальная",
        login: "",
        password: "",
      });
    },
    removeRecord(id: string) {
      this.records = this.records.filter((r) => r.id !== id);
    },
    updateRecord(record: RecordItem) {
      const updatedRecord = this.records.find((r) => r.id === record.id);

      if (updatedRecord) {
        this.records = this.records.map((r) =>
          r.id === record.id ? record : r
        );
      } else {
        this.records.push(record);
      }
    },
  },
  persist: true,
});
