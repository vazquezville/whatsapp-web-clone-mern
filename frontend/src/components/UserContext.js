import React, { useContext, createContext, useState } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

//Save the current user we are talking to
export function useUserContext() {
  return useContext(UserContext);
}
//For update the user when is clicked on the sidebar
export function useUserUpdateContext() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  //Each time a new user is selected, we have to refresh the Chat component to put the messages of this user on the screen
  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={currentUser}>
      <UserUpdateContext.Provider value={updateCurrentUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
