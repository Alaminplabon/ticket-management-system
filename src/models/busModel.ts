import mongoose, { Schema, Document } from 'mongoose';

export interface IBus extends Document {
  name: string;
  seats: number;
  route: string;
}

const BusSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    route: { type: String, required: true },
  },
  { timestamps: true }
);

const Bus = mongoose.model<IBus>('Bus', BusSchema);
export default Bus;
