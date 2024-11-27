import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  bus: mongoose.Schema.Types.ObjectId;
  price: number;
  time: Date;
  isAvailable: boolean;
}

const TicketSchema: Schema = new Schema(
  {
    bus: { type: Schema.Types.ObjectId, ref: 'Bus', required: true },
    price: { type: Number, required: true },
    time: { type: Date, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket ;
