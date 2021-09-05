import { FC } from 'react';
import { IRoute } from '../router/config';

interface IProps {
  routes: IRoute[];
}

const HomePage: FC<IProps> = () => {
  return <div className="text-red-600">Home Page</div>;
};

export default HomePage;
