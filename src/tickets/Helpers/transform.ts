import { FileData } from '../classes';
import {
  FILE_DATA_FIELDS_NO_PARSE,
  FILE_DATA_MANDATORY_FIELDS,
} from '../constants';

export class FileDataTransformer {
  private static parseData: FileData; 
  private static detected_fields: Array<string>;
  private static missing_fields: Array<string>;

  private static init() {
    this.parseData = new FileData();
    this.detected_fields = [];
    this.missing_fields = [];
  }
  static transform(file_data: Array<any>): {
    data: FileData;
    missing_fields: Array<string>;
  } {
    this.init();
    for (const data of file_data) {
      const detected_field = this.detectField(Object.getOwnPropertyNames(data));
      this.setDetectedField(data, detected_field);
    }
    this.setMissingFields();
    return { data: this.parseData, missing_fields: this.missing_fields };
  }

  private static setMissingFields() {
    FILE_DATA_MANDATORY_FIELDS.forEach((field) => {
      if (!this.detected_fields.includes(field)) {
        this.missing_fields.push(field);
      }
    });
  }

  private static detectField(data_fields: string[]) {
    let detected_field: string;
    for (const field of data_fields) {
      if (
        FILE_DATA_MANDATORY_FIELDS.includes(field) &&
        !this.detected_fields.includes(field)
      ) {
        this.detected_fields.push(field);
        detected_field = field;
        break;
      }
    }

    return detected_field;
  }

  private static setDetectedField(data: any, detected_field: string) {
    switch (detected_field) {
      case 'issuingDate':
        this.parseDate(data);
        break;

      case 'itinerary':
        this.parseItinerary(data);
        break;

      case 'amount':
        this.parseAmount(data);
        break;

      default:
        if (FILE_DATA_FIELDS_NO_PARSE.includes(detected_field))
          this.parseData[detected_field] = data[detected_field];
    }
  }

  private static parseDate(data: any) {
    const date = new Date();
    date.setDate(parseInt(data['day']));
    date.setMonth(parseInt(data['month']) - 1);
    date.setFullYear(parseInt('20' + data['year']));
    this.parseData.issuingDate = date;
  }

  private static parseItinerary(data: any) {
    if (this.parseData.itinerary === undefined) {
      this.parseData.itinerary = Array.of(data['from'], data['to']).join(' ');
    }
    this.parseData.itinerary = Array.of(
      this.parseData.itinerary,
      data['from'],
      data['to'],
    ).join(' ');
  }

  private static parseAmount(data: any) {
    this.parseData.amount = parseFloat(data['amount']);
  }
}
