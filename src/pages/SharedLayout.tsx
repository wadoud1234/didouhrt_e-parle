import { Outlet } from "react-router-dom";
import Header from "../sections/Header/Header";
import Footer from "../sections/Footer/Footer";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
