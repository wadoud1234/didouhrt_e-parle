import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import LoginButton from "../../components/Auth/Login/LoginButton";

export default function HeaderAuthButtons() {
  const { isLoaded } = useUser();
  return (
    <>
      <LoginButton />
      {!isLoaded && (
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "gray",
          }}
        />
      )}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
