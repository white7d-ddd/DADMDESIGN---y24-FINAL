import { ConstructionProject, HistoryItem } from '../types';

/**
 * Extracts a numeric value from period strings (e.g., '2026.04.10', '2026.04 - 2026.05', '2025.11.20')
 * so projects/cases can be sorted by period in descending order (latest date first).
 */
export function parseSortablePeriod(period: string | undefined): number {
  if (!period) return 0;
  // If period contains a range like "2026.02 - 2026.05" or "2026.02 ~ 2026.05", take the end date part
  const parts = period.split(/[-~]/);
  const targetStr = (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim();

  const numbers = targetStr.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 0;

  const year = parseInt(numbers[0], 10) || 0;
  const month = numbers.length > 1 ? parseInt(numbers[1], 10) || 0 : 0;
  const day = numbers.length > 2 ? parseInt(numbers[2], 10) || 0 : 0;

  return year * 10000 + month * 100 + day;
}

/**
 * Sorts construction projects or installation cases by period descending (latest first).
 */
export function sortProjectsByPeriod(projects: ConstructionProject[]): ConstructionProject[] {
  return [...projects].sort((a, b) => parseSortablePeriod(b.period) - parseSortablePeriod(a.period));
}

/**
 * Sorts company history items by year descending (latest year first).
 */
export function sortHistoryByYear(historyList: HistoryItem[]): HistoryItem[] {
  return [...historyList].sort((a, b) => {
    const numA = parseInt(a.year, 10) || 0;
    const numB = parseInt(b.year, 10) || 0;
    return numB - numA;
  });
}
