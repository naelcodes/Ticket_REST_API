import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { FileInfo } from '../classes';
import { TicketDTO } from '../dtos';
import { FileParser } from '../Helpers/fileParser';
import { mapFileToTicketDTO } from '../Helpers/file-TicketDTO-mapper';

@Injectable()
export class FileParserPipe
  implements PipeTransform<Express.Multer.File, TicketDTO>
{
  transform(value: Express.Multer.File, metadata: ArgumentMetadata): TicketDTO {
    const file_info: FileInfo = FileParser.extractDataFromFile(value);
    if (file_info.missing_fields.length > 0) {
      throw new ForbiddenException(
        `Could not create a ticket from the file - ${file_info.filename}, the following information is missing : [${file_info.missing_fields}]`,
      );
    }
    return <TicketDTO>mapFileToTicketDTO(file_info.data);
  }
}
