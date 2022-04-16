import { zeroPad } from "./zeroPad";

export function formatDate(date: Date | string | null) {
  if (date === null) {
    return "n/a";
  }

  const useDate = date instanceof Date ? date : new Date(date.toString());

  if (isNaN(useDate.getTime())) {
    return "invalid date";
  }

  return `${useDate.getFullYear()}-${zeroPad(useDate.getMonth() + 1)}-${zeroPad(useDate.getDate())}`;
}
