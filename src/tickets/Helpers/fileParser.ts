import { FileInfo } from '../classes';
import { TICKET_REGEX } from '../constants';
import { FileDataTransformer } from './transform';

export class FileParser {
  static extractDataFromFile(file: Express.Multer.File): FileInfo {
    const file_data: string = file.buffer.toString();
    const lines: string[] = file_data.split('\r');
    const file_fields_data = [];

    for (const fieldRegex in TICKET_REGEX) {
      for (const line of lines) {
        if (TICKET_REGEX[fieldRegex].test(line)) {
          file_fields_data.push(TICKET_REGEX[fieldRegex].exec(line).groups);
        }
      }
    }

    const transformData = FileDataTransformer.transform(file_fields_data);
    const fileInfo = new FileInfo();
    fileInfo.filename = file.originalname;
    fileInfo.data = transformData.data;
    fileInfo.missing_fields = transformData.missing_fields;

    return fileInfo;
  }

  static extractDataFromFiles(
    files: Array<Express.Multer.File>,
  ): Array<FileInfo> {
    const filesInfo: Array<FileInfo> = [];

    files.forEach((file) => {
      filesInfo.push(this.extractDataFromFile(file));
    });

    return filesInfo;
  }
}
