// get all the products
// create a product
// udpate an exisiting product

import express, { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ProductModel from "../models/products";
import { ApiResponse } from "../utils/ApiResponse";
import { z } from "zod";
import { Category } from "../models/category";

const productType = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),

});

export const listAllProducts = asyncHandler(
    async (req: Request, res: Response) => {
      const products = await ProductModel.find({}).populate('category', 'name'); // Populate the 'category' field with only the 'name' field
      if (products) {
        res.status(200).json(new ApiResponse(200, products));
      }
    }
  );


export const createProduct=asyncHandler(async(req:Request,res:Response)=>{
    const {name,description,price,category}=req.body;
    const newProduct=new ProductModel({
        name,
        description,
        price,
        category
})

await newProduct.save();
console.log('product saved');
console.log(newProduct)
res.status(201).json(new ApiResponse(201,newProduct));
});
