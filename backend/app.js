
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase is up and running!");
    const port = process.env.PORT ||  3000;
    app.listen(port, () => console.log(`server is running on port ${port}.`));
  }
  catch (error) {
    console.error("sorry could not connect to the DataBase!", error);
  }
};
startServer();
