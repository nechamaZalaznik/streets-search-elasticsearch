import type { Street } from "../types/street";

export interface TableColumn {
  key: keyof Street | 'actions'; 
  label: string;
}

export const STREET_TABLE_COLUMNS: readonly TableColumn[] = [
  { key: 'street_name', label: 'שם הרחוב' },
  { key: 'secondary_name', label: 'שם משני' },
  { key: 'title', label: 'כותרת' },
  { key: 'neighborhood', label: 'שכונה' },
  { key: 'street_type', label: 'סוג רחוב' },
  { key: 'ID_street', label: 'מזהה רחוב' },
  { key: 'actions', label: 'מחק' },
] as const;