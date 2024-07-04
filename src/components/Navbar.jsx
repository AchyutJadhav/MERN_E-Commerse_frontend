import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none", flex: 0 })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  align-items: center;
  display: flex;
  margin-left: 25px;
  padding: 5px;

  ${mobile({ marginLeft: "5px" })}
`;

const Input = styled.input`
  border: none;
  background-color: inherit;
  width: 50px;
`;

const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  ${mobile({ flex: "2", justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  /* font-weight: bold; */
`;

const Logout = styled.span`
  cursor: pointer;
`;

export default function Navbar() {

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
  } 

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  // console.log(user.currentUser);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>Achyut</Logo>
          </StyledLink>
        </Center>
        <Right>
          {!user.currentUser ? (
            <>
              <StyledLink to="/register">
                <MenuItem>Register</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>Sign In</MenuItem>
              </StyledLink>
            </>
          ) : (
            <>
              <Logout onClick={handleLogout}>Logout</Logout>
            </>
          )}
          <StyledLink to="/cart">
            <MenuItem>
              <Badge
                badgeContent={cart.quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
}
