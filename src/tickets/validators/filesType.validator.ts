import {
  ArgumentMetadata,
  FileTypeValidator,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FilesTypeValidator
  implements
    PipeTransform<Array<Express.Multer.File>, Array<Express.Multer.File>>
{
  transform(
    files: Array<Express.Multer.File>,
    metadata: ArgumentMetadata,
  ): Array<Express.Multer.File> {
    const fileTypeValidator = new FileTypeValidator({ fileType: 'air' });
    for (const file of files) {
      if (!fileTypeValidator.isValid(file)) {
        throw new UnprocessableEntityException(
          "Batch Import Failed, all the files must be of type 'air' ",
        );
      }
    }
    return files;
  }
}
