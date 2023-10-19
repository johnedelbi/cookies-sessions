import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 2005;

// init express
const app = express();

//init cookie & session
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
  })
);

// cookies
app.get("/set-cookie", (req, res) => {
  res.cookie("test", "myCookie123", { maxAge: 50000 });
  res.send("my cookie has been set");
});

app.get("/get-cookie", (req, res) => {
  const { test } = req.cookies;
  console.log(test);
  res.send(" oh I got my cookie");
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("test");
  res.send(" oh I removed my cookie");
});

// session

app.get("/set-session", (req, res) => {
  req.session.userId = "user1234";
  console.log(req.session.userId);
  res.send("a session has been created ");
});

app.get("/get-session", (req, res) => {
  if (req.session && req.session.userId) {
    const userId = req.session.userId;
    res.send(`hello user with id ${userId}`);
  } else {
    res.send("session is not valid");
  }
});

app.get("/clear-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(`there is and error ${err}`);
    } else {
      res.send("session destroyed successfully");
    }
  });
});

//listen to the port
app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
