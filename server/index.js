require("dotenv").config();
const express = require("express");
const mongoDb = require("mongoose");
const userRoute = require("./routes/userRoute");
const marksRoute = require("./routes/marksRoute");
const studentsRoute = require("./routes/studentsRoute");
const cors = require("cors");
const log = require("./services/Logger");
const verifyToken = require("./middlewares/Authentication");

const app = express();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoDb
  .connect(MONGODB_URI)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((error) => console.log("MONGODB_CONNECTION_ERROR: " + error));

app.use(
  cors({
    origin:process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);
app.use((req, res, next) => {
  res.on("finish", () => {
    const method = req.method;
    const pathOnly = req.baseUrl;
    const status = res.statusCode;
    const ip = req.ip;
    const message = `${ip} ${method} ${pathOnly} ${status}`;
    log(message);
  });
  next();
});

app.use((err, req, res, next) => {
  log("SERVER_ERROR: " + err);
  res.status(500).json({ message: ["Internal Server Error"] });
});

app.use("/api/v1/users", userRoute);

app.use("/api/v1/students",verifyToken, studentsRoute);
app.use("/api/v1/marks", verifyToken, marksRoute);

app.listen(PORT);
