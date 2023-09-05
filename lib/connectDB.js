import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log("connected vs db");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
