import { MONTH_NUMBER, SEARCH_REGEX } from '../constants/index';
import { convertToDate } from './dateConverter';

export function searchQuery(searchString: string, props: string[]) {
  const searchQuery = { OR: [] };
  for (const prop of props) {
    if (SEARCH_REGEX.AMOUNT.test(searchString)) {
      searchQuery.OR.push({ ['amount']: { in: [parseFloat(searchString)] } });
    }

    if (SEARCH_REGEX.ISSUINGDATE.test(searchString)) {
      const match = SEARCH_REGEX.ISSUINGDATE.exec(searchString).groups;
      const strDate = `${match['day']}-${MONTH_NUMBER[match['month']] + 1}-${
        match['year']
      }`;
      return { ['issuingDate']: { in: [convertToDate(strDate)] } };
    }

    if (!['amount', 'issuingDate'].includes(prop)) {
      searchQuery.OR.push({
        [prop]: { contains: searchString, mode: 'insensitive' },
      });
    }
  }

  return searchQuery;
}
