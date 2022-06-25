import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useSession from "../data/useSession";

function Protected({ children }: { children?: ReactNode }) {
  const session = useSession();
  const location = useLocation();

  if (!session.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default Protected;
