import { Request,Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Category } from "../models/category";
import { ApiResponse } from "../utils/ApiResponse";
import { z } from "zod";
import { ApiError } from "../utils/ApiError";

const categoryType=z.object({
    name:z.string()
})

export const listCategory=asyncHandler(async(req:Request,res:Response)=>{
    const categories=await Category.find({});
    res.status(201).json(
        new ApiResponse(
            200,
            categories
        )
    )
        })
export const createCategory=asyncHandler(async(req:Request,res:Response)=>{
    const body=req.body;
    const parsedBody=categoryType.safeParse(body);
    if(parsedBody.success){
        const newCategory=new Category({
            name:parsedBody.data.name
        })
        await newCategory.save();
        console.log('category saved succesfully');
        res.status(201).json(new ApiResponse(201,newCategory))
    }
    else{
        res.json(parsedBody.error)
    }
})