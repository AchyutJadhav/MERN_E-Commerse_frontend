import styled from "styled-components";
import {mobile} from "../Responsive";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../redux/apiCalls";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  background-color: #fff;
  padding: 30px;

  ${mobile({width: "70%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 20px 0px;
  padding: 15px 10px;
  border: 1px solid lightgray;
`;

const Button = styled.button`
  height: 40px;
  width: 40%;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  /* margin-top: 20px; */

  &:disabled {
    cursor: pointer;
    color: not-allowed;
  }
`;

const Link = styled.a`
  text-decoration: underline;
  margin: 5px 0px;
  font-size: 12px;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await login(dispatch, {username, password});
    // console.log(res)
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
          <Input placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
          <Button onClick={handleSubmit} disabled={user.isFetching}>LOGIN</Button>
          {user.error && <Error>Something went to wrong...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};
