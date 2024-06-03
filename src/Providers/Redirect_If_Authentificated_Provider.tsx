import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import PreLoader from "../components/PreLoader/PreLoader";

export default function Redirect_If_Authentificated_Provider() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <PreLoader />;
  if (isLoaded && isSignedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
