import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import "dotenv/config";

import User from "./models/User.js";
import connect from "./utils/database.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middleware/errorHandlers.js";

const app = express();
app.use(express.json());
app.use(cors());

//! Destructuring environment variables
const { PORT = 5000 } = process.env;

await connect();

//! Register endpoint
app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

//! Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError(401, "Incorrect email or password");
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
});

app.use(routeNotFound);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(
    `🚀 Server is up and running!\n` +
      `🌐 Listening on http://localhost:${PORT}\n` +
      `📅 Started at: ${new Date().toLocaleString()}\n`
  );
});
