import { Module } from '@nestjs/common';
import { TicketService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [TicketsController],
  providers: [TicketService],
})
export class TicketsModule {}
