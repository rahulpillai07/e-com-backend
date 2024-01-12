import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface UserCartType extends Document {
  items: CartItem[];
  userId: Schema.Types.ObjectId;
}

const userCartSchema = new Schema<UserCartType>({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1 // Adjust as needed
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export const UserCart = mongoose.models.UserCart || mongoose.model<UserCartType>('UserCart', userCartSchema);
