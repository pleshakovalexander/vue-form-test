import { defineStore } from "pinia";
import type { RecordItem } from "~/models";

export const useRecordsStore = defineStore("records", {
  state: () => ({
    records: [] as RecordItem[],
  }),
  actions: {
    addRecord() {
      this.records.push({
        labels: "",
        type: "Локальная",
        login: "",
        password: "",
      });
    },
    removeRecord(index: number) {
      this.records.splice(index, 1);
    },
    updateRecord(index: number, payload: RecordItem) {
      const updatedRecord = this.records[index];

      if (updatedRecord) {
        this.records[index] = payload;
      } else {
        this.records.push(payload);
      }
    },
  },
  persist: true,
});
