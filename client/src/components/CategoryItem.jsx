import React from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link} from "react-router-dom";

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.5s ease;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 10px;
  transition: all 0.5s ease;
`
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;

  &:hover ${Title} {
    transform: scale(1.2);
  }

  &:hover ${Button} {
    transform: scale(1.2);
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "30vh"})}
`
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`


const CategoryItem = (props) => {
    return (
        <Container>

            <Image src={props.item.img1}/>
            <Info>
                <Title>{props.item.title}</Title>
                <Link to={`products/${props.item.cat}`}>
                    <Button>SHOP NOW</Button>
                </Link>
            </Info>

        </Container>
    );
};

export default CategoryItem;