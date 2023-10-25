import { PartialType } from '@nestjs/mapped-types';
import { TicketDTO } from './ticket.dto';

export class UpdateTicketDto extends PartialType(TicketDTO) {}
