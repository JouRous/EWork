import { FC } from 'react';
import { IRoute } from '../../router/config';

interface IProps {
  routes: IRoute[];
}

const Auth: FC<IProps> = () => {
  return (
    <>
      <div>App</div>
    </>
  );
};

export default Auth;
