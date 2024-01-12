import mongoose, { Schema, Document } from "mongoose";
import { Category } from "./category";
import { ApiError } from "../utils/ApiError";

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

productSchema.pre('save', async function(next) {
  try {
    // Find the corresponding category and update its products array
    const updatedCategory = await Category.findByIdAndUpdate(
      this.category,
      { $addToSet: { products: this._id } },
      { new: true }
    );

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    next();
  } catch (error) {
    throw new ApiError(401,'something went wrong');
  }
});
const ProductModel = mongoose.model<Product>('Product', productSchema);



export default ProductModel;
