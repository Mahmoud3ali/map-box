import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  MainLayout,
  UsersPage,
  RequireAuth,
} from "../pages";

type Props = {
  children?: React.ReactNode;
};

export const routes = [
  {
    path: "/login",
    name: "Login",
    Component: LoginPage,
  },
  {
    path: "/",
    name: "Home",
    Component: () => (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/users",
    name: "Users",
    Component: () => (
      <RequireAuth>
        <UsersPage />
      </RequireAuth>
    ),
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export const RouterConfig = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {children}
    </BrowserRouter>
  );
};
