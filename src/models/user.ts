import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export interface UserInterface {
  email: string;
  password: string;
  username: string;
  avatar: string;
  refreshToken: string;
  cart:mongoose.Schema.Types.ObjectId[]
}

const userSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    cart:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'UserCart',
      default:null
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

userSchema.methods.checkPassword=async function(password:string){
  return await bcryptjs.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
          expiresIn:'1h'
      }
  )
}


export const User=mongoose.models.User || mongoose.model('User',userSchema)
