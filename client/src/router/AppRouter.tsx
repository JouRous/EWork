import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { routes } from './config';
import { Header } from '../components/Header/Header';
import { useAppSelector } from '../store/hooks';

const AppRouter = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <BrowserRouter>
        {user ? <Header user={user} /> : null}
        <Router routes={routes} />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
