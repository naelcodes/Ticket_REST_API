import { FileData } from '../classes';
import { TicketDTO } from '../dtos';

export function mapFileToTicketDTO(
  data: FileData | FileData[],
): TicketDTO | TicketDTO[] {
  if (!Array.isArray(data)) {
    return createTicketDTO(data);
  } else {
    const newTicketsDTO: TicketDTO[] = [];
    for (const fileData of data) {
      newTicketsDTO.push(createTicketDTO(fileData));
    }
    return newTicketsDTO;
  }
}

function createTicketDTO(data: FileData): TicketDTO {
  const {
    airline,
    amount,
    currency,
    issuingDate,
    itinerary,
    passengerName,
    ticketNumber,
  } = data;

  const newTicket = new TicketDTO();
  newTicket.airline = airline;
  newTicket.amount = amount;
  newTicket.currency = currency;
  newTicket.issuingDate = issuingDate;
  newTicket.itinerary = itinerary;
  newTicket.passengerName = passengerName;
  newTicket.ticketNumber = ticketNumber;
  newTicket.type = 'flight';

  return newTicket;
}
