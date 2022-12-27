import React, {useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import {publicRequest, userRequest} from "../requestMethods";
import {useDispatch} from "react-redux";
import {redirect, useNavigate} from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "75%"})}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`


const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`

const Agreement = styled.span`
  font-size: 12px;
  display: inline-block;
  margin: 20px 0;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Register = () => {
    const [user, setUser] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useNavigate();
    const updateUsername = (e) => {
        setUser((prevState) => {
            return {...prevState, "username": e.target.value}
        })
    }
    const updateEmail = (e) => {
        setUser((prevState) => {
            return {...prevState, "email": e.target.value}
        })
    }
    const updatePassword = (e) => {
        setUser((prevState) => {
            return {...prevState, "password": e.target.value}
        })
    }
    const handleClick = async () => {

        try {
            const registeredUser = await publicRequest.post("/auth/register", user);;
            history('/login')
        } catch (err) {
            prompt("try again");
        }

    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" required onChange={updateUsername}></Input>
                    <Input placeholder="email" required onChange={updateEmail}></Input>
                    <Input placeholder="password" required onChange={updatePassword}></Input>
                    <Input placeholder="confirm password" required
                           onChange={event => setConfirmPassword(event.target.value)}></Input>
                </Form>
                <Agreement>By creating an account, I consent to the proccesing of my personal data in accordance with
                    the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleClick}>Create</Button>
            </Wrapper>
        </Container>
    );
};

export default Register;