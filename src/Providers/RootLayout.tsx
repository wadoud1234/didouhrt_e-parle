import { Outlet } from "react-router-dom";
import Header from "../sections/Header/Header";
import Footer from "../sections/Footer/Footer";

export default function RootLayout() {
  return (
    <>
      {/* <header className="header">
        <div>
          <div>
            <p>Clerk + React + React Router App</p>
          </div>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </header> */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
