import React, { useState } from 'react';
import styled from 'styled-components';

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

const CreateAccountBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 400px; /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
  margin-top: 20px; /* Add some space between the login box and create account box */
`;

const CreateAccountHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

interface CreateAccountPageProps {
  onCancel: () => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onCancel }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    // Your create account logic here
  };

  const handleCreateAccountSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Additional form submission logic if needed
  };

  const handleCancel = () => {
    // You can define cancel logic here, for example, resetting form fields or closing the create account box
    onCancel();
  };

  return (
    <CreateAccountBox>
      <form onSubmit={handleCreateAccountSubmit}>
        <CreateAccountHeading>Create New Account</CreateAccountHeading>
        {error && <ErrorText>{error}</ErrorText>}
        <InputWrapper>
          <label htmlFor="newEmail">Email</label>
          <StyledInput
            type="text"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="newPassword">Password</label>
          <StyledInput
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </InputWrapper>
        <InputWrapper>
          <Button type="submit" onClick={handleCreateAccount} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </InputWrapper>
      </form>
    </CreateAccountBox>
  );
};

export default CreateAccountPage;