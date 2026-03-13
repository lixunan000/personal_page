import Home from './pages/Home';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '李续楠个人主页',
    path: '/',
    element: <Home />
  }
];

export default routes;
