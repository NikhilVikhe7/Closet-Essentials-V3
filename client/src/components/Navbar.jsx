import React from 'react';
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import Badge from "@mui/material/Badge";
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {mobile} from "../responsive";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/userRedux";
import {emptyCart} from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({padding: "10px 0"})}
`
//Left Side --------------------------------------------------------------------------------------------------------------------------------------------------
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Langauge = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
  border: none;
  ${mobile({width: "50px"})}
`

//Center---------------------------------------------------------------------------------------------------------------
const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize: "24px"})}
`

//Right Side------------------------------------------------------------------------------------------------------------
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({justifyContent: "center", flex: 2})}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: "12px", marginLeft: "10px"})}
`


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const logoutHandler =()=>{
        console.log("logout");
        dispatch(logout());
        dispatch(emptyCart());
    }

    console.log(quantity);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Langauge>EN</Langauge>
                    <SearchContainer>
                        <Input placeholder={"Search"}></Input>
                        <SearchIcon style={{color: "gray", fontSize: "16px"}}></SearchIcon>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to={"/"}>
                        <Logo>Closet Essentials.</Logo>
                    </Link>
                </Center>
                <Right>
                    <MenuItem hidden={!user}>
                        <Avatar>{user && user.username.charAt(0)}</Avatar>
                    </MenuItem>

                    <Link to={"/register"}>
                        <MenuItem hidden={user}>REGISTER</MenuItem>
                    </Link>
                    <Link to={"/login"}>
                        <MenuItem hidden={user}>SIGN IN</MenuItem>
                    </Link>
                    <Link to={'/cart'}> <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartIcon></ShoppingCartIcon>
                        </Badge>
                    </MenuItem>

                    </Link>
                    <MenuItem onClick={logoutHandler} hidden={!user}>
                        LOGOUT
                    </MenuItem>

                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;