import { Transform } from 'class-transformer';
import { convertToDate } from '../Helpers/dateConverter';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class TicketDTO {
  @IsString()
  @IsOptional()
  id;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => convertToDate(value))
  issuingDate: Date;

  @IsString()
  @IsNotEmpty()
  itinerary: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  passengerName: string;

  @IsString()
  @IsNotEmpty()
  airline: string;

  @IsString()
  @IsNotEmpty()
  ticketNumber: string;
}
