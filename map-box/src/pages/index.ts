import { lazy } from "react";

export * from "./components";
export const HomePage = lazy(() => import("./Home"));
export const LoginPage = lazy(() => import("./Login"));
export const NotFoundPage = lazy(() => import("./NotFound"));
export const UsersPage = lazy(() => import("./Users"));
