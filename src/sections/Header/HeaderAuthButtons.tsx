import { SignedIn, UserButton } from "@clerk/clerk-react";
import LoginButton from "../../components/Auth/Login/LoginButton";
import "./HeaderAuthButtons.css";
export default function HeaderAuthButtons() {
  // const { isLoaded } = useUser();
  return (
    <>
      <LoginButton />

      <div className={"loggedIn-btn"}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
