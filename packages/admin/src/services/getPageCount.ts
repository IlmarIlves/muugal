import { config } from "../config";

export function getPageCount(itemCount: number, itemsPerPage = config.itemsPerPage) {
  return Math.ceil(itemCount / itemsPerPage);
}
