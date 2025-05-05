export interface SutraData {
  shortSutra: string[];
  longSutra: string[];
}
export const loadSutras = async (): Promise<SutraData> => {
  const response = await fetch('/data/sutras.json');
  const data = await response.json();
  return data;
};