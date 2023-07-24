import express from "express";
import { messagesController } from '../controllers/messages.controller.js';

export const messagesRouter = express.Router();

messagesRouter.get('/', messagesController.getMessages);
