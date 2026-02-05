export interface Street {
  id: string;             // שימי לב: בלי קו תחתון, כי ככה זה חזר בפוסטמן
  street_name: string;
  title?: string;
  secondary_name?: string;
  street_type: string;
  neighborhood: string;
  ID_street?: string;
  is_active: boolean;
}