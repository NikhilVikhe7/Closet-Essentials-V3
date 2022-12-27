import React from 'react';
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {mobile} from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({flexDirection: "column"})}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0;
`;
const SocialContainer = styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  
`;
const SocialIcon = styled.h1`
    width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display: "none"})}
`
const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor: "#fff8f8"})}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Closet  Essentials</Logo>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus massa. Sed sagittis lacus
                    tortor. Nam vel tincidunt odio, finibus interdum ipsum. Morbi pulvinar dui non neque pellentesque,
                    congue tristique purus pharetra.</Desc>
                <SocialContainer>
                    <SocialIcon color="3b5999">
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon color="e4405f">
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon color="55acee">
                        <TwitterIcon/>
                    </SocialIcon>
                    <SocialIcon color="0A66C2">
                        <LinkedInIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Men's Fashion</ListItem>
                    <ListItem>Women's Fashion</ListItem>
                    <ListItem>Accesories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlists</ListItem>
                    <ListItem>Terms & Conditions</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <RoomIcon style={{marginRight:"8px"}}/> Shivajinagar, Pune, 411016
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{marginRight:"8px"}}/> +91-9657901601
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{marginRight:"8px"}}/> nikhilvikhe7@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"></Payment>
            </Right>
        </Container>
    );
};

export default Footer;