import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import axios from "./axios";
import { useUserContext } from "./UserContext";

function Chat({ users }) {
  const currentUser = useUserContext();
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDay() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    axios.post("/api/messages/new", {
      message: input,
      name: currentUser,
      timestamp: date,
      received: true,
    });

    setInput("");
  };

  //On the first load, there's not current user active and the splash screen is showed, if there's an user selected show the messages
  if (currentUser) {
    return (
      <div className="chat">
        <div className="chat__header">
          <Avatar />

          <div className="chat__headerInfo">
            <h3>{currentUser}</h3>
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>

        <div className="chat__body">
          {users[currentUser].map((message) => (
            <p
              className={`chat__message ${
                message.received && "chat__received"
              }`}
            >
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          ))}
        </div>

        <div className="chat__footer">
          <IconButton>
            <InsertEmoticon />
          </IconButton>
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
          </form>
          <IconButton>
            <Mic />
          </IconButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat__unselected">
        <div className="chat__coverImg"></div>
      </div>
    );
  }
}

export default Chat;
