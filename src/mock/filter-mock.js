import { filter } from '../utils/filter-utils.js';

export function generateFilters(points) {
  return Object.entries(filter)
    .map(([filterType, filterPoints]) => ({
      type: filterType,
      hasPoints: filterPoints(points).length > 0
    }));
}
