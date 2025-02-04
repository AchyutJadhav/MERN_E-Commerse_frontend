import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mobile({height: "35vh"})}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign: "center"})}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border: 2px solid lightgrey;

  ${mobile({width: "80%"})}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  cursor: pointer;
  flex: 1;
  border: none;
  background-color: teal;
  color: #fff;
`;

export const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely update from your favorite product.</Description>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};
