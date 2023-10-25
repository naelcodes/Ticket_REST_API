import { TicketDTO } from '../dtos';

export interface InvalidFileInfo {
  filename: string;
  info: string;
}

export interface ValidFileInfoDTO {
  filename: string;
  dto: TicketDTO;
}
