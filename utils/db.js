import mongoose from "mongoose";

export const DatabaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zaheerahmadlangrial92:buKpzKsS0fQ2s3Fy@cluster0.prbgise.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
