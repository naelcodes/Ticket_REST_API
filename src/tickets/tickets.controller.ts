import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TicketDTO, UpdateTicketDto } from './dtos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileTypeValidator } from './validators/fileType.validator';
import { FileParserPipe, FilesParserPipe } from './pipes';
import { FilesTypeValidator } from './validators';
import { TicketService } from './tickets.service';
import { FilesParserInfo } from './classes';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketService) {}
  @Post()
  async createTicket(@Body() createTicketDto: TicketDTO) {
    return await this.ticketService.saveTicket(createTicketDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTicket(
    @UploadedFile(fileTypeValidator, FileParserPipe)
    createticketFromFileDTO: TicketDTO,
  ) {
    return await this.ticketService.saveTicket(createticketFromFileDTO);
  }

  @Post('upload/batch')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadTickets(
    @UploadedFiles(FilesTypeValidator, FilesParserPipe)
    { ticketDTOInfoList, invalidFilesList }: FilesParserInfo,
  ) {
    const { invalid_files, processed_files_info } =
      await this.ticketService.saveTickets(ticketDTOInfoList);

    invalid_files.forEach(({ filename, ticketNumber }) => {
      invalidFilesList.push({
        filename,
        info: `Ticket could not be produced from file, because ticket Number : ${ticketNumber}, already exist`,
      });
    });

    return {
      NumberOfProcessFiles: processed_files_info.length,
      ProcessFilesInfo: processed_files_info,
      invalidFilesInfo: invalidFilesList,
    };
  }

  @Get()
  async getAllTickets(@Query('search') search?: string) {
    return search === undefined
      ? await this.ticketService.getAllTickets()
      : await this.ticketService.searchTickets(search);
  }

  @Get(':id')
  async getTicket(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.ticketService.getTicket(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return await this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.ticketService.removeTicket(id);
  }
}
