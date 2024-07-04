import { Announcement } from "../components/Announcement";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";

import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;
const Image = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: cover;
`;
const ImageContainer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  padding-left: 50px;
  flex: 1;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 300;
`;
const Desc = styled.div`
  font-size: 20px;
  font-weight: 200;
  margin: 50px 0;
  display: flex;
  text-align: justify;
`;
const Price = styled.h3`
  font-size: 30px;
  font-weight: 300;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
`;

const FilterTitle = styled.h3`
  margin-right: 15px;
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  cursor: pointer;

  /* ${({ active }) => active && `
    border: 2px solid blue;
  `} */
`;

const FilterSize = styled.select`
  padding: 10px;
  border: 1px solid lightgray;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  margin: 30px 0px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  align-items: center;
  display: flex;
`;
const Amount = styled.span`
  width: 20px;
  height: 20px;
  padding: 5px;
  margin: 10px;
  border: 2px solid teal;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  align-content: center;
`;
const Button = styled.button`
  width: 120px;
  height: 40px;
  border: 3px solid teal;
  border-radius: 7px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export default function Product() {
  window.scrollTo(0, 0);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProducts] = useState({});
  const [count, setCount] = useState(1);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async (e) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProducts(res.data);
        setColor(res.data.color[0])
        setSize(res.data.size[0])
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  const handleCount = (type)=>{
    if(type ==="dec"){
      if(count>1){
        setCount(count-1);
      }
    }

    if(type === "inc"){
      setCount(count+1);
    }
  }

  // const handleColor = (color)=>{
  //   set
  // }

  const handleCart = ()=>{
    dispatch(addProduct({...product, size, color, count}))
  }
  const cart = useSelector((state) => state.cart);
  console.log(cart)

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((s) => (
                <FilterColor color={s} key={s} onClick={()=>setColor(s)}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleCount("dec")}/>
              <Amount>{count}</Amount>
              <Add onClick={()=>handleCount("inc")}/>
            </AmountContainer>
            <Button onClick={()=>handleCart()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
}
