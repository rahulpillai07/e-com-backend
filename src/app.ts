import express from "express";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route"
import productRouter from "./routes/product.route"
import cartRouter from"./routes/cart.controller"
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api/users", userRouter);
app.use("/api/category",categoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
export default app;
