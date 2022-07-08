import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { auth, provider} from "../firebase"
function Login() {

  const signIn = () =>{
    auth.signInWithPopup(provider).catch(alert)
  }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://www.pinclipart.com/picdir/big/206-2065907_whatsapp-clipart.png" />
                <UseButton onClick={signIn} variant="outlined">Sign in with google</UseButton>
            </LoginContainer>

        </Container>
    );
}

export default Login;

const Container = styled.div`
display:grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
  text-align: center;
`;
const UseButton = styled(Button)`
  color: black !important;
  &&&{
    border:1px solid black;
  }
  

`;
const LoginContainer = styled.div`
padding:100px
display:flex;
height:300px;
width:300px;
text-align:center
flex-direction:column;
 justify-content:center;
align-items:center;
background-color:white;
border-radius:5px;
box-shadow:0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;
const Logo = styled.img`
  height: 200px;
  margin:auto;
  display: block;
  object-fit: contain;
  padding-top: 50px;
`;
