import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { useUserUpdateContext } from "./UserContext";

//Load the user list on the sidebar with the user name and the last message. If the message is longer than 33 characters we cut it for the preview
function SidebarChat({ user, message }) {
  const updateCurrentUser = useUserUpdateContext();

  return (
    <div className="sidebarChat" onClick={() => updateCurrentUser(user)}>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{user}</h2>
        <p>{message.length >= 33 ? message.substr(0, 33) + "..." : message}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
