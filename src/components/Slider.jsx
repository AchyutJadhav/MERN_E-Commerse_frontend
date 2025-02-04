import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../Responsive";

const Container = styled.div`
  height: 100vh;
  /* background-color: coral; */
  display: flex;
  position: relative;
  overflow: hidden;
  object-fit: cover;

  ${mobile({display: "none"})}  
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translatex(${(props) => props.slideIndex * - 100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #${(props) => props && props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
`;

export const Slider = () => {

  const [slideIndex, setSlideIndex] = useState();
  const handleClick = (direction)=>{
    if(direction === "left"){
      setSlideIndex(slideIndex > 0?slideIndex-1:2);
    }else{
      setSlideIndex(slideIndex <2 ? slideIndex+1 : 0);
    }
  }
  // setInterval(handleClick, 3000);
  return (
    <Container>
      <Arrow direction="left" onClick={()=>(handleClick("left"))}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>

      {sliderItems.map((item) => 
        <Slide bg={item.bg} key={item.id}>
          <ImgContainer>
            <Image src={item.img} key={item.id}/>
          </ImgContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Desc>
              {item.desc}
            </Desc>
            <Button>Show Now</Button>
          </InfoContainer>
        </Slide>
       )}
      </Wrapper>

      <Arrow direction="right" onClick={()=>(handleClick("right"))}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};
