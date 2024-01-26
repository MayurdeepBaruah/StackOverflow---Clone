import express from "express"; // to import express server
import mongoose from "mongoose"; // to edit mongodb database
import cors from "cors"; // to connect the frontend with backend without any errors
import dotenv from "dotenv";

import userRoutes from "./routes/users.js"; // importing routes file
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answer.js"
const app = express(); // creating express server
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true })); // limiting the transfer of data
app.use(express.urlencoded({ limit: "30mb", extended: true })); // limiting the transfer of data
app.use(cors()); //using for connecting frontend with backend without using error

app.get("/", (req, res) => {
  // requesting by the user
  res.send("This is a stack overflow clone API"); // responding by the server
});
app.use("/user", userRoutes); // middleware like
app.use("/questions", questionRoutes); // middleware like
app.use("/answer", answerRoutes)

const PORT = process.env.PORT || 5000; // choosing the port for server

const DATABASE_URL = process.env.CONNECTION_URL // url connection of mongodb database

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // connecting server with the mongodb database
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  ) // checking and accepting the server is running
  .catch((err) => console.log(err.message)); // error message
