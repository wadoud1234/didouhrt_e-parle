import { SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <SignedOut>
      <Link to="/auth/login">
        <button className="secondary_btn header_btn" aria-label="login button">
          <span>Se Connecter</span>
        </button>
      </Link>
    </SignedOut>
  );
}
