import { Schema, model } from 'mongoose';
// import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  code: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    require: true,
    max: 100,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
    max: 100,
  },
});
// schema.plugin(monsoosePaginate);
export const TicketModel = model('ticket', schema);
