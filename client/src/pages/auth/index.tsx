import { FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import AuthBackground from '../../components/AuthBackground';
import { IRoute } from '../../router/config';
import Router from '../../router/Router';

interface IProps {
  routes: IRoute[];
}

const Auth: FC<IProps> = ({ routes }) => {
  const history = useHistory();

  useEffect(() => {
    history.push('/auth/login');
  }, [history]);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 place-items-center relative w-screen h-screen">
        <div style={{ maxWidth: 400 }}>
          <Router routes={routes} />
        </div>
      </div>
      <AuthBackground />
    </div>
  );
};

export default Auth;