import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connect to ${conn.connection.host}`);
  } catch ({ message }) {
    console.log(message);
  }
};

export default connectDB;
