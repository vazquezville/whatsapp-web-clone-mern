/** IMPORTS **/
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

/** APP CONFIG **/
const app = express();
const port = process.env.PORT || 9000;

//Pusher setup
const pusher = new Pusher({
  appId: "your-appid",
  key: "your-key",
  secret: "your-secret",
  cluster: "eu",
  useTLS: true,
});

/** MIDDLEWARE **/
app.use(express.json());

//Delete this in Prod. (Also can replace with Cors package)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

/** MONGO SETUP **/
const connection_url = "your-mongoconnection";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//Trigger streams changes
db.once("open", () => {
  //Select the collection to watch
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  //Trigger changes
  changeStream.on("change", (change) => {
    //Trigger pusher on inserts
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//Get the messages
app.get("/api/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Post the messages
app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

/** LISTENER **/
app.listen(port, () => console.log(`Listening on localhost:${port}`));
