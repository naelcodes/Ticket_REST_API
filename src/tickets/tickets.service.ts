import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { searchQuery } from './Helpers';
import { SEARCHABLE_FIELDS } from './constants';
import { TicketDTO, UpdateTicketDto } from './dtos';
import { ValidFileInfoDTO } from './interfaces';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async saveTicket(ticketInfo: TicketDTO) {
    return await this.prisma.ticket.create({
      data: ticketInfo,
      select: { id: true, ticketNumber: true },
    });
  }

  async saveTickets(ticketsInfo: ValidFileInfoDTO[]) {
    const invalid_files = [];
    const processed_files_info = [];

    for (const { filename, dto } of ticketsInfo) {
      const { ticketNumber } = dto;
      const result = await this.prisma.ticket.findUnique({
        where: { ticketNumber },
      });

      if (result !== null) {
        invalid_files.push({ filename, ticketNumber });
      } else {
        const result = await this.prisma.ticket.create({
          data: dto,
          select: { id: true },
        });
        processed_files_info.push({ filename, id: result.id });
      }
    }
    return { invalid_files, processed_files_info };
  }

  async searchTickets(search: string) {
    const search_query = searchQuery(search, SEARCHABLE_FIELDS);
    return await this.prisma.ticket.findMany({
      where: { ...search_query },
    });
  }

  async getTicket(id: string) {
    return await this.prisma.ticket.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAllTickets() {
    return await this.prisma.ticket.findMany();
  }

  async updateTicket(id: string, updateInfo: UpdateTicketDto) {
    return await this.prisma.ticket.update({
      where: { id },
      data: updateInfo,
      select: { id: true },
    });
  }

  async removeTicket(id: string) {
    return await this.prisma.ticket.delete({
      where: { id },
      select: { id: true },
    });
  }
}
