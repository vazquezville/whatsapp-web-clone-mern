import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

//Receives the users data, has the header with the profile info, a searchbox and the chats that would be render item by item in another component
function Sidebar({ users }) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="" />

        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {Object.entries(users).map(([key, value], i) => (
          <SidebarChat
            user={key}
            message={value[value.length - 1].message}
          ></SidebarChat>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
