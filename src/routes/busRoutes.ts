import express from 'express';
import { createBus, updateBus, deleteBus } from '../controllers/busController';

const router = express.Router();

router.post('/', createBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

export default router;
