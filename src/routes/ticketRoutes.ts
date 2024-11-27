import express from 'express';
import { createTicket, updateTicket, deleteTicket } from '../controllers/ticketController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createTicket);
router.put('/:id', authenticate, authorize('admin'), updateTicket);
router.delete('/:id', authenticate, authorize('admin'), deleteTicket);

export default router;
