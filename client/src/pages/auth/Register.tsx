import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import http from 'services/http-service';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: block;
  width: 400px;
  margin: 0 auto;
  position: relative;

  font-size: 14px;

  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
`;

const InputText = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;

  margin: 10px 0;
`;

const SubmitButton = styled.button`
  background-color: #e2e4e6;
  color: hsl(0, 0%, 55%);
  cursor: default;
`;

const Register: FC<any> = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  return (
    <Wrapper>
      <h1
        style={{ color: '#5E6C84' }}
        className="text-center mt5 mb-6 font-bold"
      >
        Sign up for your account
      </h1>
      <div className="form">
        <div>
          <InputText
            {...register('email')}
            className="px-2"
            placeholder="Enter Email"
            type="email"
          />
        </div>
        <div>
          <InputText
            {...register('username')}
            className="px-2"
            placeholder="Enter Username"
            type="text"
          />
        </div>
        <div>
          <InputText
            {...register('password')}
            className="px-2"
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <p className="mt-2 mb-4">
          By signing up, you confirm that you've read and accepted our Terms of
          Service and Privacy Policy.
        </p>
        <div>
          <SubmitButton
            onClick={handleSubmit((data) => {
              http.post('/api/v1/auth/register', data).subscribe(
                (response) => {
                  history.push('/auth/login');
                },
                (error) => {
                  console.log(error);
                }
              );
            })}
            className="text-center w-full py-2 font-bold"
          >
            Continue
          </SubmitButton>
        </div>
      </div>
      <div className="my-2">
        <Link to="/auth/login">Already have an account? Log In</Link>
      </div>
    </Wrapper>
  );
};

export default Register;
