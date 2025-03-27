import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import contactRouter from './Routes/contact.js'
import {config} from "dotenv"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// .env setup
config({path:'.env'})

// user routes
app.use("/api/user", userRouter);

//contact router
app.use('/api/contact',contactRouter)


//home route

app.get("/", (req, res) => {
  res.json({ message: "home routr" });
});

mongoose
  .connect(
    process.env.MONGO_URL,
    {
      dbName: "NodeJS_Mastery_Course",
    }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => console.log(`server is running ${port}`));
