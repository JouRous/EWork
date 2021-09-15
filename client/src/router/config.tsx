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
    component: lazy(() => import('../pages/home')),
    private: true,
  },
  {
    path: '/b/:id',
    exact: false,
    fallback: <div>...</div>,
    component: lazy(() => import('../pages/board')),
    private: true,
  },
  {
    path: '/auth',
    exact: false,
    fallback: <div>...</div>,
    component: lazy(() => import('../pages/auth')),
    routes: [
      {
        path: '/auth/login',
        exact: false,
        fallback: <div>...</div>,
        component: lazy(() => import('../pages/auth/Login')),
        private: false,
      },
      {
        path: '/auth/register',
        exact: false,
        fallback: <div>...</div>,
        component: lazy(() => import('../pages/auth/Register')),
        private: false,
      },
    ],
  },
];
