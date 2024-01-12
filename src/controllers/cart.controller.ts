import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { UserCart } from '../models/userCart';
import { User } from '../models/user';
import mongoose from 'mongoose';

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, userId } = req.body;

  try {
    if (!productId || !userId) {
      throw new ApiError(400, 'Invalid product or user ID');
    }
    console.log(userId);

    // Ensure userId is of type ObjectId
    const userCart = await UserCart.findOne({ userId});
    console.log(userCart);
    
    if (!userCart) {
      throw new ApiError(404, 'User cart not found');
    }

    // Check if the product already exists in the cart
    const existingProductIndex = userCart.items.findIndex(
      (item: any) => item.productId.toString() === productId.toString()
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      userCart.items[existingProductIndex].quantity += 1;
    } else {
      // If the product doesn't exist, add a new item to the cart
      userCart.items.push({ productId, quantity: 1 });
    }

    // Save the updated cart
    await userCart.save();

    // Update the user with the new cart
    const updatedUser = await User.findByIdAndUpdate(userId, { cart: userCart._id }, { new: true })
    .populate({
      path: 'cart',
      populate: {
        path: 'items.productId',
        model: 'Product',
        select: 'name', // Include only the 'name' field from the Product model
      },
    });
  
  // Now 'updatedUser' contains the user document with the populated 'cart' field
  res.status(200).json({ updatedUser });
  
    
    if (!updatedUser) {
      // Handle the case where the user with the specified ID is not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Now `updatedUser` contains the user document with the updated cart
    // You can also send a success message if needed
    // res.status(200).json(new ApiResponse(200, 'Product added to cart successfully'));
  } catch (error:any) {
    throw new ApiError(404, error);
    // Handle errors
  }
});
