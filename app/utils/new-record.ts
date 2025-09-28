import type { RecordItem } from "~/models";

export const newRecord = (): RecordItem => ({
  id: crypto.randomUUID(),
  labels: "",
  type: "Локальная",
  login: "",
  password: "",
});
