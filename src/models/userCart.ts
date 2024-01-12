import mongoose, { Schema } from "mongoose";

interface UserCartType {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
}

const userCartSchema = new Schema<UserCartType>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1 // Adjust as needed
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps:true});

export const UserCart = mongoose.models.UserCart || mongoose.model('UserCart', userCartSchema);
