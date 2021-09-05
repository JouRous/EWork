import { ComponentType, lazy, LazyExoticComponent, ReactNode } from 'react';

export interface IRoute {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>; // lazy
  routes?: IRoute[];
  redirect?: string;
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/_/workspace',
    fallback: <div>Loading ...</div>,
  },
  {
    path: '/_/workspace',
    exact: false,
    fallback: <div>...</div>,
    component: lazy(() => import('../pages/HomePage')),
    private: false,
  },
  {
    path: '/auth',
    exact: false,
    fallback: <div>...</div>,
    component: lazy(() => import('../pages/auth')),
  },
];
