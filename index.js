const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./router/User.Router");
const { prodRouter } = require("./router/Prod.Router");
const { auth } = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("☆*: .｡. o(≧Home_Page≦)o .｡.:*☆");
});
app.use("/users", userRouter);
app.use(auth);
app.use("/prods", prodRouter);

app.listen(5555, async () => {
  try {
    await connection;
    console.log("Server is running at port 5555");
  } catch (err) {
    console.log(err);
  }
});
