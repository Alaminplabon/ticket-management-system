import express from 'express';
import { viewBuses } from '../controllers/busController';
import { viewTickets, purchaseTicket } from '../controllers/ticketController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/buses', authenticate, viewBuses);
router.get('/tickets', authenticate, viewTickets);
router.post('/purchase', authenticate, purchaseTicket);

export default router;
