import mongoose, { Schema } from "mongoose";

interface Category{
    name: string;
    products:mongoose.Schema.Types.ObjectId[]
}

const categorySchema=new Schema<Category>({
    name:{
        required:true,
        type:String
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
      }],
    
}, {timestamps:true}
);
export const Category=mongoose.models.Category || mongoose.model('Category',categorySchema)