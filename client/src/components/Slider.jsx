import React, {useState} from 'react';
import styled from "styled-components";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {sliderItems} from "../data";
import {mobile, tablet} from "../responsive";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display:"none"})}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.dir === "left" && "10px"};
  right: ${props => props.dir === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease-out;
  transform: translateX(${(props) => props.slideIndex *-100}vw);
`
const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: #${props => props.color};
`
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  ${tablet({display:"none"})}
`
const Image = styled.img`
  height: 80%;
  mix-blend-mode: inherit;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
const Title = styled.h1`
  font-size: 70px;
`
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const history = useNavigate();
    const handleClick = (dir) => {
        if(dir === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1: 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }

    };
    return (
        <Container>
            <Arrow dir="left" onClick={() => handleClick("left")}>
                <ArrowLeftIcon/>
            </Arrow>
            <Wrapper slideIndex = {slideIndex}>
                {sliderItems.map(item => (
                    <Slide color={item.bg}>
                        <ImgContainer>
                            <Image
                                src={item.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={()=>{history("/products/all")}}>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}

            </Wrapper>
            <Arrow dir="right" onClick={() => handleClick("right")}>
                <ArrowRightIcon/>
            </Arrow>
        </Container>
    );
};

export default Slider;