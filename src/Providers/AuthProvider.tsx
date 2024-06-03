import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { frFR } from "@clerk/localizations";

const PUBLISHABLE_KEY = import.meta.env["VITE_CLERK_PUBLISHABLE_KEY"];

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
export default function AuthProvider() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      localization={frFR}
      routerPush={(to) => navigate(to)}
      signUpUrl="/auth/register"
      signInUrl="/auth/login"
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Outlet />
    </ClerkProvider>
  );
}
