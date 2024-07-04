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
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

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

const TopTexts = styled.div``;
const TopText = styled.span`
  margin: 0px 10px;
  cursor: pointer;
  text-decoration: underline;
  ${mobile({ display: "none" })}
`;

const Bottom = styled.div`
  display: flex;
  /* justify-content: space-between; */
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  border: 2px solid lightgray;
  border-radius: 10px;
  padding: 30px;
  justify-content: space-around;
  height: 50vh;
  font-size: 18px;
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

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  font-size: ${(props) => props.type === "total" && "24px"};
  font-weight: ${(props) => props.type === "total" && "600"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
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
`



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

export default function Cart() {
  // console.log(KEY)
  const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/", {
          stripeData: res.data,
          products: cart,
        });
        // dispatch(orderFulfilled({}));
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
        <StyledLink to="/">

          <TopButton>CONTINUE SHOPPING</TopButton>
        </StyledLink>
          <TopTexts>
            <TopText>Shopping Bag (5)</TopText>
            <TopText>Your Wishlist (5)</TopText>
          </TopTexts>
          <StripeCheckout
            name="Achyut Shop"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <Button>CHECKOUT NOW</Button>
          </StripeCheckout>
        </Top>
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
                          <StyledLink to={`/product/${item._id}`}>
                            <SearchOutlined />
                          </StyledLink>
                        </Icon>
                        <Icon>
                          <FavoriteBorderOutlined />
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
                </Product>

                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.2</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$5.2</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Achyut Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}
