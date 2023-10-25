import { InvalidFileInfo, ValidFileInfoDTO } from '../interfaces';

export class FileData {
  issuingDate: Date;
  itinerary: string;
  currency: string;
  amount: number;
  passengerName: string;
  airline: string;
  ticketNumber: string;
}

export class FileInfo {
  filename: string;
  data: FileData;
  missing_fields: Array<string>;
}

export class FilesParserInfo {
  constructor(
    public ticketDTOInfoList: Array<ValidFileInfoDTO>,
    public invalidFilesList: InvalidFileInfo[],
  ) {}
}
