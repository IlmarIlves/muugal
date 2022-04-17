import { config } from "../config";

export function getSkipTake(currentPage: number, itemsPerPage = config.itemsPerPage) {
  return {
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  };
}
