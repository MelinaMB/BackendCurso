import { TicketModel } from '../models/ticket.model.js';

export class TicketDao {
  async createOne() {
    const ticketCreated = await TicketModel.create();
    return ticketCreated;
  }
}
