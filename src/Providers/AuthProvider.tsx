import { ClerkProvider } from "@clerk/clerk-react";
import { frFR } from "@clerk/localizations";
import { ReactNode } from "react";

const PUBLISHABLE_KEY = import.meta.env["VITE_CLERK_PUBLISHABLE_KEY"];

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
export default function AuthProvider({ children }: { children: ReactNode }) {
  // const navigate = useNavigate();
  return (
    <ClerkProvider
      localization={frFR}
      // routerPush={(to) => navigate(to)}
      signUpUrl="/auth/register"
      signInUrl="/auth/login"
      signInForceRedirectUrl={"/auth/login"}
      signInFallbackRedirectUrl={"/"}
      afterSignOutUrl="/"
      // routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}
