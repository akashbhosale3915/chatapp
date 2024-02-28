const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");
const { connectDB } = require("./db/connectDB");
const { app, server } = require("./socket");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Welcome to chat app");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  connectDB();
  console.log(`Server listening on port : ${port}`);
});
