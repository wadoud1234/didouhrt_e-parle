import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.module.css";
import Logo from "../../components/Logo/Logo";
import NavbarLinks from "./NavbarLinks";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavOnOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isMenuBtn = target.closest<HTMLButtonElement>(".menu_btn");

    if (navRef.current && !navRef.current.contains(target) && !isMenuBtn) {
      setIsNavOpen(false);
    }
  };

  // const getNavLinkClass = (basePath: string) => {
  //   return location.pathname === basePath ||
  //     location.pathname.startsWith(`${basePath}/`)
  //     ? "navLink activeLink"
  //     : "navLink";
  // };

  useEffect(() => {
    isNavOpen
      ? document.body.classList.add("activeNav")
      : document.body.classList.remove("activeNav");
  }, [isNavOpen]);

  useEffect(() => {
    let prevScrollY = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Update header position
      if (scrollY > prevScrollY && scrollY > 300) {
        // Scrolling down, hide the header
        setIsFixed(true);
      } else {
        // Scrolling up, show the header
        setIsFixed(false);
      }
      prevScrollY = scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeNavOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeNavOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        paddingTop: "4px",
        paddingBottom: "4px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
      className={` 
        ${isNavOpen ? "activeNav" : ""} 
        ${isFixed ? "hideHeader" : ""} 
      `}
    >
      <div className={`flex_between header_container container `}>
        <Logo />
        <nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
          ref={navRef}
          className={`flex_item_center  ${isNavOpen ? "activeNav" : ""}`}
        >
          {/* <Link to="/" className={getNavLinkClass("/")}>
            Accueil
          </Link> */}
          <NavbarLinks />
          {/* <NavbarLink link="/" name="Accueil" /> */}
          {/* <Link to="/cours" className={getNavLinkClass("/cours")}> */}
          {/* Cours */}
          {/* </Link> */}
          {/* <Link to="/à_propos" className={getNavLinkClass("/%C3%A0%20propos")}> */}
          {/* À Propos */}
          {/* </Link> */}
          {/* <Link to="/contact" className={getNavLinkClass("/contact")}> */}
          {/* Contact */}
          {/* </Link> */}
        </nav>
        <div className="flex_item_center gap1">
          <SignedOut>
            <button
              className="secondary_btn header_btn"
              aria-label="login button"
            >
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
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            aria-label="menu toggle button"
            className={`menu_btn ${isNavOpen ? "activeNav" : ""}`}
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
