export const TICKET_REGEX = {
  ISSUINGDATE:
    /(?:D-)(?<issuingDate>(?<year>\d{2})(?<month>\d{2})(?<day>\d{2}))/,
  ITINERARY:
    /(?:H-\d{3};[\dA-Z]{4})(?<itinerary>(?<from>[A-Z]{3})(?:;[A-Z\s]{1,};)(?<to>[A-Z]{3}))/,
  CURRENCY: /(?:K[A-Z]{3};.?)(?<currency>[A-Z]{3})/,
  AMOUNT: /(?:K[A-Z]{3};.?[A-Z]{3})(?<amount>\d+.\d{2})/,
  PASSENGERNAME: /(?:I-\d{3};\d{2})(?<passengerName>[A-Z\/\s]+)/,
  AIRLINE: /(?:T-K)(?<airline>\d+)/,
  TICKETNUMBER: /(?:T-K\d+-)(?<ticketNumber>\d+)/,
};

export const FILE_DATA_MANDATORY_FIELDS = [
  'issuingDate',
  'itinerary',
  'currency',
  'amount',
  'passengerName',
  'airline',
  'ticketNumber',
];

export const FILE_DATA_FIELDS_NO_PARSE = [
  'currency',
  'airline',
  'passengerName',
  'ticketNumber',
];

export const SEARCHABLE_FIELDS = [
  'issuingDate',
  'itinerary',
  'currency',
  'amount',
  'passengerName',
  'airline',
  'ticketNumber',
  'type',
];

export const SEARCH_REGEX = {
  ISSUINGDATE:
    /^(?<day>\d{2}) (?<month>(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)) (?<year>\d{4})$/,
  AMOUNT: /^\d+(.\d{2})?$/,
};

export enum MONTH_NUMBER {
  JAN,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
}
