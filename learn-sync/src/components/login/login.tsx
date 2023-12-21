import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffc0cb; /* Pink background color for the rest of the page */
  
`;

const LoginBox = styled.div`
  background-color: #fff; /* White background color for the login box */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 400px; /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
 
  
`;

const StyledLink = styled.a`
  color: black; /* Set the color to black */
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  margin-left: auto; /* Align to the right */
  display: block; /* Make it a block-level element to take full width */
  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`;

const HeadingXXLarge = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold
  justify-content: space-between;
  text-align: center;
 
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px; /* Adjust padding as needed */
  font-size: 1rem;
  border: none; /* Remove the border */
  border-bottom: 1px solid #ccc; /* Add a bottom border for the line effect */
  box-sizing: border-box;
  margin-bottom: 10px;
  outline: none; /* Remove the default outline */
  transition: border-bottom-color 0.3s; /* Add a smooth transition effect */
  
  &:focus {
    border-bottom-color: #4caf50; /* Change the bottom border color on focus */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Your login logic here
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Additional form submission logic if needed
  };

  return (
    <Container>
      <LoginBox>
      <form onSubmit={handleSubmit}>
        <HeadingXXLarge>Login</HeadingXXLarge>
        {error && <ErrorText>{error}</ErrorText>}
        <InputWrapper>
          <label htmlFor="username">Username</label>
          <StyledInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </InputWrapper>
        <InputWrapper>
          <Button type="button" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </InputWrapper>
        {/* Forgot your password link */}
        <StyledLink onClick={() => console.log("Forgot password link clicked")}>
          Forgot password?
        </StyledLink>
      </form>
    </LoginBox>
    </Container>
  );
};

export default LoginPage;
