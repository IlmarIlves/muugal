export type DateRange = [Date, Date | null];

export function parseDateRange(dateRangeValue: string | undefined): DateRange | null {
  if (!dateRangeValue) {
    return null;
  }

  const dates = dateRangeValue.split(",");

  if (dates.length !== 2) {
    return null;
  }

  return [new Date(dates[0]), dates[1].length > 0 ? new Date(dates[1]) : null];
}
