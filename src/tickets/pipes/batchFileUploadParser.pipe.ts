import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FileInfo, FilesParserInfo } from '../classes';
import { TicketDTO } from '../dtos';
import { FileParser } from '../Helpers/fileParser';

import { FileData } from '../classes/index';
import { mapFileToTicketDTO } from '../Helpers';
import { InvalidFileInfo, ValidFileInfoDTO } from '../interfaces';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FilesParserPipe
  implements
    PipeTransform<Array<Express.Multer.File>, Promise<FilesParserInfo>>
{
  constructor(private readonly prisma: PrismaService) {}
  async transform(
    value: Array<Express.Multer.File>,
    metadata: ArgumentMetadata,
  ): Promise<FilesParserInfo> {
    const files_info: FileInfo[] = FileParser.extractDataFromFiles(value);
    const invalid_files_info: InvalidFileInfo[] = [];
    const valid_files_data: FileData[] = [];
    const valid_files_info_dto: ValidFileInfoDTO[] = [];

    //extract valid and invalid files info
    for (const fileInfo of files_info) {
      const { filename, missing_fields, data } = fileInfo;
      if (fileInfo.missing_fields.length > 0) {
        invalid_files_info.push({
          filename,
          info: `Could not create a ticket from the file. The following fields are missing : ${missing_fields}`,
        });
      } else {
        valid_files_info_dto.push({
          filename,
          dto: <TicketDTO>mapFileToTicketDTO(data),
        });
      }
    }

    const filesParserInfo = new FilesParserInfo(
      valid_files_info_dto,
      invalid_files_info,
    );

    return filesParserInfo;
  }
}
