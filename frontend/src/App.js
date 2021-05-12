import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import axios from "./components/axios";
import { UserProvider } from "./components/UserContext";

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  //Inital recover of the messages at the startup of the app
  useEffect(() => {
    axios.get("api/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  //When messages are recovered, group it by users and setup pusher config
  useEffect(() => {
    //Group the messages by user
    setUsers(
      messages.reduce((r, a) => {
        r[a.name] = [...(r[a.name] || []), a];
        return r;
      }, {})
    );

    //pusher setup for the new messages
    const pusher = new Pusher("your-key", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    //For better perfomance, avoid to have a listener per each new message
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <UserProvider>
          <Sidebar users={users} />
          <Chat users={users} />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
