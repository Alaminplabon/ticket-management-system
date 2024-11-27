import { Request, Response } from 'express';
import Bus from '../models/busModel';

// Create a new bus
export const createBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await Bus.create(req.body); // Assumes validation is handled in the model or middleware
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ message: 'Error creating bus', error: error instanceof Error ? error.message : error });
  }
};

// Get all buses
export const viewBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching buses', error: error instanceof Error ? error.message : error });
  }
};

// Update an existing bus
export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // `runValidators` ensures validation on update
    if (!updatedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: 'Error updating bus', error: error instanceof Error ? error.message : error });
  }
};

// Delete a bus
export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting bus', error: error instanceof Error ? error.message : error });
  }
};
