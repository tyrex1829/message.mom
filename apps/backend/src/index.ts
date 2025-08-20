import express from "express";
import cors from "cors";
import env from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { indexRouter } from "./routes/index.route";
env.config();

const app = express();
const port = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Up and Running",
  });
});

app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
