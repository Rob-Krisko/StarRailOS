import React, { useState } from 'react';
import styled from 'styled-components';
import space_login from '../space_login.png';

const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${space_login});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const StyledButton = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #000;
  margin-bottom: 20px;
`;

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <BackgroundWrapper>
      <LoginForm onSubmit={handleLogin}>
        <StyledTitle>Welcome to StarRail OS</StyledTitle>
        <StyledLabel>
          Username:
          <StyledInput type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </StyledLabel>
        <StyledButton type="submit" value="Log in" />
      </LoginForm>
    </BackgroundWrapper>
  );
}

export default Login;
