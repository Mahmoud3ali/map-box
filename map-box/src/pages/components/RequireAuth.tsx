import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../config";

type Props = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: Props) {
  const authStatus = useAppSelector((state) => state.auth.status);
  let location = useLocation();

  if (authStatus !== "authenticated") {
    // save the current location so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <> {children} </>;
}
