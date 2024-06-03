import { SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <SignedOut>
      <button className="secondary_btn header_btn" aria-label="login button">
        <Link
          to="/auth/login"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <span>Se Connecter</span>
        </Link>
      </button>
    </SignedOut>
  );
}
