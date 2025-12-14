import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler.js";
//import { authRouter } from "./modules/auth/auth.routes";
//import { userRouter } from "./modules/users/user.routes";

dotenv.config();

const app = express();

app.use(cors()); //enables cross-origin resource sharing
app.use(express.json()); //Converts raw JSON → req.body e.g. email becomes req.body.email

app.get("/health", (_req, res)=>{
  res.json({status: "ok"});
});

//app.use("/api/auth", authRouter);
//app.use("/api/users", userRouter);

app.use(errorHandler);
export default app;