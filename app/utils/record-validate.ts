import type { FormError } from "@nuxt/ui";
import type { RecordItem } from "~/models";

export const recordValidate = (state: RecordItem): FormError[] => {
  const errors: FormError[] = [];

  if (state.login == null || state.login === "" || state.login.length > 100) {
    errors.push({ name: "login", message: " " });
  }

  if (
    state.type === "Локальная" &&
    (state.password == null ||
      state.password === "" ||
      state.password.length > 100)
  ) {
    errors.push({ name: "password", message: " " });
  }

  return errors;
};
