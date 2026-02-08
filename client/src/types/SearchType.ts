export const SearchMode = {
  FREE: 'FREE',
  EXACT: 'EXACT',
  PHRASE: 'PHRASE'
} as const;

export type SearchModeType = typeof SearchMode[keyof typeof SearchMode];

export interface SearchOption {
  id: SearchModeType;
  label: string;
  placeholder: string;
}