export const TYPE_OPTIONS = ["Локальная", "LDAP"] as const;
export type TypeOptions = (typeof TYPE_OPTIONS)[number];

export interface RecordItem {
  labels: string;
  type: TypeOptions;
  login: string;
  password: string | null;
}
