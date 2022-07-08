import React from "react";
import styled from "styled-components";
import { Avatar, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Pleasse enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (EmailValidator.validate(input) && !chatsAlreadyExists(input) && input !== user.email) {
      //this is where we need to pass the chats into the DB chats collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatsAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <Sidebarbutton onClick={createChat}>Start a new chat</Sidebarbutton>

      {/* Lists of chats */}
      {chatsSnapshot?.docs.map((chat)=> (
      <Chat key={chat.id} id={chat.id} users={chat.data().users}/>))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex:0.45;
border-right:1px solid #whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;

::-webkit-scrollbar{
  display:none;
}
-ms-overflow-style:none ;
scrollbar-width:none ;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  height: 80px;
  padding: 15px;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  background: white;
`;

const Sidebarbutton = styled(Button)`
  width: 100%;
  color: black !important;

  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  flex: 1;
  outline-width: 0;
  border: none;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: 0.3s all ease;

  :hover {
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div``;
