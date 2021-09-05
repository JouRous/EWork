import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { routes } from './config';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Router routes={routes} />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
