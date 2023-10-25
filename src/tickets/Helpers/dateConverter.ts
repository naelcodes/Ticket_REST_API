export function convertToDate(dateValue: string): Date {
  const splitDate = dateValue.split('-');
  const _date = new Date();
  _date.setUTCDate(parseInt(splitDate[0]));
  _date.setUTCMonth(parseInt(splitDate[1]) - 1);
  _date.setUTCFullYear(parseInt(splitDate[2]));

  return _date;
}
