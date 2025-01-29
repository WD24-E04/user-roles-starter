import mongoose from "mongoose";

export default function connectDB() {
  const { connection } = mongoose;

  connection
    .on("connected", () =>
      console.log(
        `✅ Database connection established successfully:\n` +
          `   Database Name: "${connection.name}"\n` +
          `   Host: ${connection.host}\n` +
          `   Port: ${connection.port}`
      )
    )
    .on("error", ({ message }) =>
      console.error("❌ Database connection error:", message)
    );

  mongoose.connect(process.env.DB_URI);
}
