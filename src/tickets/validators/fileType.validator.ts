import { ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';

export const fileTypeValidator = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'air' })
  .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });
