const express = require('express')
const app = express();

app.listen(3000);
app.use(express.json());

const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");

let cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use("/users",userRouter);
app.use("/plans",planRouter);