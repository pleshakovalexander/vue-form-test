import { defineStore } from "pinia";
import type { LabelSerializeType, RecordItem } from "~/models";

export const useRecordsStore = defineStore("records", {
  state: () => ({
    records: [] as RecordItem[],
  }),
  actions: {
    addRecord() {
      this.records.push(newRecord());
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
  persist: {
    serializer: {
      deserialize: (data: string) => {
        const state = JSON.parse(data);
        if (state?.records && Array.isArray(state.records)) {
          const returnValue: { records: RecordItem[] } = { records: [] };

          for (const record of state.records) {
            returnValue.records.push({
              ...record,
              labels: (record.labels as LabelSerializeType[])
                .map(({ text }) => text)
                .join(";"),
            });
          }

          return returnValue;
        }

        return { records: [] };
      },
      serialize: (data) => {
        const result = {
          records: (data as { records: RecordItem[] }).records.map((r) => ({
            ...r,
            labels: r.labels
              .split(";")
              .map((text): LabelSerializeType => ({ text })),
          })),
        };

        return JSON.stringify(result);
      },
    },
  },
});
