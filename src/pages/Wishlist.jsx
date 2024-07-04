import { Announcement } from "../components/Announcement";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { UseDispatch } from "react-redux";
import { orderFulfilled } from "../redux/cartRedux";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  DeleteForever,
} from "@material-ui/icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Order } from "../components/Order";

// const KEY =process.env.STRIPE_KEY;

const Container = styled.div``;
const Wrapper = styled.div`
  justify-content: center;
  padding: 40px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  justify-content: center;
  display: flex;
  font-size: 20px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;

  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transperent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  /* justify-content: space-between; */
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  padding: 20px;
  ${mobile({ width: "180px" })}/* &:hover{
    background-color: lightgray;
    
  } */
`;
const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 30px;
  /* font-size: 20px; */
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
const ProductSize = styled.div``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const ProductAmount = styled.div`
  /* padding: 10px; */
  font-size: 24px;
  margin: 5px;
  display: flex;
  width: 30px;
  height: 30px;
  border: 2px solid teal;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
const ProductPrice = styled.div`
  font-size: 30px;
`;

const Hr = styled.hr`
  color: #eee;
  height: 1px;
`;

const Button = styled.button`
  width: fit-content;
  height: 40px;
  background-color: black;
  color: #fff;
`;

const ImageInfo = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${ImageInfo} {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;

    transform: scale(1.2);
  }
`;

const DeleteIcon = styled.span`
  position: relative;
  top: 30px;
  cursor: pointer;
  &:hover {
    transform-origin: top center;
    transform: scale(1.2);
    color: red;
  }
`;

export default function Wishlist() {
  const cart = useSelector((state) => state.cart);
  const [details, setDetails] = useState();

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR WISHLIST</Title>
        <Top>
          <StyledLink to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </StyledLink>
          <Button>CHECKOUT NOW</Button>
        </Top>

        {details && <Order item={details} />}
        <Bottom>
          <Info>
            {cart.products.map((item) => (
              <div key={item._key}>
                <Product>
                  <ProductDetail>
                    <ImageContainer>
                      <Image src={item.img} />

                      <ImageInfo>
                        <Icon>
                          <ShoppingCartOutlined
                            onClick={() => setDetails(item)}
                          />
                        </Icon>
                        <Icon>
                          <StyledLink to={`/product/${item._id}`}>
                            <SearchOutlined />
                          </StyledLink>
                        </Icon>
                      </ImageInfo>
                    </ImageContainer>
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b>
                        {item._id}
                      </ProductId>
                      <ProductColor color="black" />
                      <ProductSize>
                        <b>Size:</b>
                        {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountConatiner>
                      <Add />
                      <ProductAmount>{item.count}</ProductAmount>
                      <Remove />
                    </ProductAmountConatiner>
                    <ProductPrice>${item.price}</ProductPrice>
                  </PriceDetail>
                  <DeleteIcon>
                    <DeleteForever />
                  </DeleteIcon>
                </Product>

                <Hr />
              </div>
            ))}
          </Info>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}
