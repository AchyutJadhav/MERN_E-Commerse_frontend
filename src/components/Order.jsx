import React, { useState } from "react";
import styled from "styled-components";
import { Add, CancelOutlined, Remove } from "@material-ui/icons";

const Container = styled.div`
  width: 70%;
  height: 70%;
  background: lightgray;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  border-radius: 10px;
  /* align-items: center; */
  justify-content: center;
`;

const Icon = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  padding: 50px;
`;

const Info = styled.div`
  flex: 3;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ProductName = styled.h1`
  font-weight: 300;
  padding: 30px;
`;

const ProductId = styled.span`
  padding: 30px;
`;

const ColorFilter = styled.div`
display: flex;
gap: 10px;
`

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
`;
const ProductSize = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10%;
`;

const FilterContainer = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.span`
  font-size: 24px;
  
  display: flex;
  width: 30px;
  height: 30px;
  border: 2px solid teal;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const AddToCart = styled.button`
  width: fit-content;
  margin-left: auto;
  margin-right: 10%;
  margin-top: auto;
  margin-bottom: 10%;
  background-color: teal;
  border: none;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

export const Order = ({item}) => {

  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");

  const handleCount = (type)=>{
    if(type === "remove" && count > 1){
      setCount(count-1) ;
    }
    if(type === "add"){
      setCount(count +1);
    }
  }

  const handleCart = ({item})=>{
    console.log(color, count);
  }
  // console.log((item))

  return (
    <Container>
      <Icon>
        <CancelOutlined />
      </Icon>
      <ImageContainer>
        <Image src={item.img} />
      </ImageContainer>
      <Info>
        <ProductName>
          <b>Product:</b> {item.title}
        </ProductName>
        <ProductId>
          <b>ID:</b>
          {item._id}
        </ProductId>

        <FilterContainer>
        <ColorFilter>

          <ProductColor color="black" onClick={()=>setColor("black")}/>
          <ProductColor color="red" onClick={()=>setColor("red")}/>
          <ProductColor color="green" onClick={()=>setColor("green")}/>

          {/* {item.color?.map((s) => (
                <ProductColor color={s} key={s} onClick={()=>setColor(s)}/>
              ))} */}

        </ColorFilter>
          <ProductSize>
            <Add style={{cursor : "pointer"}} onClick={()=>handleCount("add")}/>
            <Quantity>{count}</Quantity>
            <Remove style={{cursor : "pointer"}} onClick={()=>handleCount("remove")}/>
          </ProductSize>
        </FilterContainer>
        <AddToCart onClick={handleCart}>Add to cart</AddToCart>
      </Info>
    </Container>
  );
};
