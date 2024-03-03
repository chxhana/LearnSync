import React, { useState } from 'react';
import styled from 'styled-components';
import CreateAccountPage from './CreateAccountPage';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: #ffff

`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 30px 0; /* Adjust the padding as needed */
  background-image: linear-gradient(to bottom right, #6c63ff, #ff636c)
  z-index: 1; /* Ensure the header is above other content */
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
  font-weight: bold;
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

const Divider = styled.div`
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const CreateAccountButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Header = styled.h2`
  font-family: 'Pacifico', cursive; 
  text-align: center;
  color: #212529;
  font-weight: bold;
  font-size: 3.6rem; 
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState(false);


  const handleLogin = async () => {
    
    if (email === 'test123@gmail.com' && password === 'password') {
      // Authentication successful
      // Redirect or perform necessary actions
      console.log('Authentication successful');
      navigate('/dashboard');
      setError(null); // Clear any previous errors
    } else {
      // Authentication failed
      setError('Invalid email or password');
    }

    setLoading(false);
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  
  };


  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
  };

  return (
    <div>
      <HeaderContainer>
        <Header>Learn Sync</Header>
      </HeaderContainer>
      <Container>
        <LoginBox className= 'shadow'>
          <form onSubmit={handleSubmit}>
            <HeadingXXLarge>Login</HeadingXXLarge>
            {error && <ErrorText>{error}</ErrorText>}
            <InputWrapper>
              <label htmlFor="email">Email</label>
              <StyledInput
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              <Button type="submit" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </InputWrapper>
            {/* Forgot your password link */}
            <StyledLink onClick={() => console.log("Forgot password link clicked")}>
              Forgot password?
            </StyledLink>
            {/* Divider */}
            <Divider />
          </form>
        </LoginBox>
        {showCreateAccount && <CreateAccountPage onCancel={handleCreateAccountClick} />}
      </Container>
    </div>
  );
};

export default LoginPage;