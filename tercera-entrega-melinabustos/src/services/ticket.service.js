import { TicketDao } from '../DAO/classes/ticket.dao.js';
import { productService } from './products.service.js';
import UserService from './users.service.js';

const userService = new UserService();

const ticketDao = new TicketDao();

export class TicketService {
  async createOne(userId) {
    const user = userService.getUserById(userId);

    const total = products.reduce((suma, prod) => {
      const product = productService.getProductById(prod.id);
      return suma + product.price * product.quantity;
    }, 0);

    const code = Math.floor(Math.random() * 10000 + 1);

    const ticketCreated = await ticketDao.createOne({
        code,
        purchase_datetime: new Date.now(),
        amount: total,
        purchaser: user.email
    });
    return ticketCreated;
    
  };
}

