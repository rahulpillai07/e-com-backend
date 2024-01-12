import mongoose, { Schema } from "mongoose";

interface Category{
    name: string;
}

const categorySchema=new Schema<Category>({
    name:{
        required:true,
        type:String
    },
}, {timestamps:true}
);
export const Category=mongoose.models.Category || mongoose.model('Category',categorySchema)