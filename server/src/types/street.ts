export interface Street {
  id: string;    
  street_name: string;
  title?: string | undefined;
  secondary_name?: string| undefined;
  street_type?: string| undefined;
  neighborhood?: string| undefined;
  ID_street?: string| undefined;
  is_active: boolean;
  [key: string]: any; 
}