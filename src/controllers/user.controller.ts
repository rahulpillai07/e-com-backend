import express, { Request, Response } from "express";
import { ZodType, z } from "zod";
import { User, UserInterface } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { check } from "prettier";
const userType = z.object({
  username: z.string(),
  password: z.string().min(5),
  email: z.string(),
  avatar:z.string()
});

const generateAccessToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();

    return accessToken;
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
};

export const registerUser=asyncHandler(async(req:Request,res:Response)=>{
    const body=req.body;
    const zodBody=userType.safeParse(body);
    if(zodBody.success){
        const{username,password,email,avatar}=zodBody.data;
        let checkUser=await User.findOne({
            $or:[{"username":username},{'email':email}]
        })
        if(!checkUser){
            let newUser=new User({
                username,
                email,
                password,
                avatar
            })
            await newUser.save();
            console.log(newUser);
            res.status(201).json(
                 new ApiResponse(200,'user succesfully created')
            )
        }
        else{
            throw new ApiError(401,'user already exists');
        }
    }
    else{
        res.json(zodBody.error)
    }

})
























export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const detailBody = req.body;
  const zodDetailBody = userType.safeParse(detailBody);
  if (zodDetailBody.success) {
    const { username, email, password } = zodDetailBody.data;
    const checkExistingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (!checkExistingUser) {
      throw new ApiError(401, "user not found");
    }
    if (
      username === checkExistingUser.username &&
      email === checkExistingUser.email
    ) {
      const isPasswordValid = checkExistingUser.checkPassword(password);
      if (!isPasswordValid) {
        throw new ApiError(401, "invalid password");
      }
      const accessToken = await generateAccessToken(checkExistingUser._id);
      res.json(checkExistingUser);
    } else {
      throw new ApiError(401, "enter valid credentials");
    }
  } else {
    res.json(zodDetailBody.error);
  }
});
