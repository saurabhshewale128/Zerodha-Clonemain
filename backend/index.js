require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { UserModel } = require("./model/UserModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
console.log("MONGO_URL =", uri);
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  console.log(req.body);

  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();

  res.send("Order Saved");
});
// app.post("/newOrder", async (req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   newOrder.save();

//   res.send("Order saved!");
// });

// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const newUser = new User({
//       name,
//       email,
//       password,
//     });

//     await newUser.save();

//     res.status(200).json({
//       message: "User saved successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// });

app.get("/test", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({
      message: "User saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error ");
    console.log(err);
  }
});
