import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { loginAction } from '../../store/features/auth/asyncActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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

const Login: FC<any> = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return user ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <h1
        style={{ color: '#5E6C84' }}
        className="text-center mt5 mb-6 font-bold"
      >
        Sign In
      </h1>
      <div className="form">
        <div>
          <InputText
            {...register('email')}
            className="px-2 test"
            placeholder="Enter Email"
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
        <p style={{ color: '#5E6C84', fontSize: 12 }} className="mb-4">
          By signing up, you confirm that you've read and accepted our Terms of
          Service and Privacy Policy.
        </p>
        <div>
          <SubmitButton
            onClick={handleSubmit((data) => {
              dispatch(loginAction(data));
            })}
            className="text-center w-full py-2 font-bold"
          >
            Continue
          </SubmitButton>
        </div>
      </div>
      <div className="flex justify-between px-2 mt-3">
        <Link to="/auth/forgot-password">Can't log in?</Link>
        <Link to="/auth/register">Sign up for an account</Link>
      </div>
    </Wrapper>
  );
};

export default Login;
