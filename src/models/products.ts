import mongoose, { Schema, Document } from "mongoose";

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId | mongoose.Schema.Types.ObjectId[];
}

const productSchema = new Schema<Product>({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Replace 'Category' with the actual name of your Category model
  },
},{timestamps:true});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
