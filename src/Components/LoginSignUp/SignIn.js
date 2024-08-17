import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { crossIcon } from '../../utils/Icons';
import { useGlobalContext } from '../../Context/globalContext';
import { MainLayout } from '../../styles/Layouts';

function SignIn({ setShowLogin }) {
  const { Url, setToken } = useGlobalContext();
  const [curState, setCurState] = useState('Login');
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [agreed, setAgreed] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!Url || Url.trim() === "") {
      alert('An error occurred: Base URL is not properly configured. Please contact support.');
      return;
    }

    // Define the endpoint based on the current state
    const endpoint = curState === 'Login' ? 'loginUser' : 'registerUser';

    // Construct the full URL
    const fullUrl = `${Url}${endpoint}`;

    // Log the URL and data for debugging purposes
    console.log(`Request URL: ${fullUrl}`);
    console.log('Request Data:', data);

    try {
      // Make the POST request to the constructed URL
      const response = await axios.post(fullUrl, data);

      // Check if the response indicates success
      if (response.data.success) {
        // Store the token and update the state
        setToken(response.data.token);
        await localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        // Show an alert with the error message from the response
        alert(response.data.message || 'Login/Signup failed.');
      }
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Server Error: ${error.response.data.message || 'An unexpected error occurred. Please try again later.'}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('Network Error: Unable to reach the server. Please check your connection.');
      } else {
        // Something else caused the error
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <SignInStyled>
      <MainLayout>
        <div className="login-popup">
          <div className="login-popup-container">
            <div className="login-popup-title">
              <h2>{curState === 'Login' ? 'Login' : 'Sign Up'}</h2>
              <img onClick={() => setShowLogin(false)} src={crossIcon} alt="Close" />
            </div>
            <form onSubmit={onLogin} className="login-popup-inputs">
              {curState === 'Sign Up' && (
                <input
                  onChange={onChangeHandler}
                  value={data.name}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
              )}
              <input
                onChange={onChangeHandler}
                value={data.email}
                name="email"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={onChangeHandler}
                value={data.password}
                name="password"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                disabled={!agreed}
                aria-disabled={!agreed}
                title={!agreed ? "You need to agree to the terms of use & privacy policy." : ""}
              >
                {curState === 'Sign Up' ? 'Create account' : 'Login'}
              </button>
            </form>
            <div className="login-popup-condition">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <p>
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </div>
            {curState === 'Login' ? (
              <p>
                Create a new account? <span onClick={() => setCurState('Sign Up')}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => setCurState('Login')}>Login here</span>
              </p>
            )}
          </div>
        </div>
      </MainLayout>
    </SignInStyled>
  );
}

const SignInStyled = styled.div`
  .login-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index : 1000;
  }

  .login-popup-container {
    width: max(23vw, 330px);
    color: #808080;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 25px 30px;
    border-radius: 8px;
    font-size: 14px;
    animation: fadeIn 0.5s;
  }

  .login-popup-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
  }

  .login-popup-title h2 {
    font-size: 25px;
    font-weight: 600;
  }

  .login-popup-title img {
    width: 16px;
    cursor: pointer;
  }

  .login-popup-inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .login-popup-inputs input {
    outline: none;
    border: 1px solid #c9c9c9;
    padding: 10px;
    border-radius: 4px;
  }

  .login-popup-inputs button {
    border: none;
    padding: 10px;
    border-radius: 4px;
    color: white;
    background-color: tomato;
    font-size: 15px;
    cursor: pointer;
  }

  .login-popup-condition {
    display: flex;
    align-items: start;
    gap: 8px;
    margin-top: -10px;
  }

  .login-popup-condition input {
    margin-top: 5px;
  }

  .login-popup p span {
    color: tomato;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default SignIn;
