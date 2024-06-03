import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../components/Logo/Logo";
import NavbarLinks from "./NavbarLinks";
import HeaderAuthButtons from "./HeaderAuthButtons";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const closeNavOnOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isMenuBtn = target.closest<HTMLButtonElement>(".menu_btn");

    if (navRef.current && !navRef.current.contains(target) && !isMenuBtn) {
      setIsNavOpen(false);
    }
  };
  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }
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
      className={` 
        ${isNavOpen ? "activeNav" : ""} 
        ${isFixed ? "hideHeader" : ""} 
      `}
    >
      <div className={`flex_between header_container container `}>
        <Logo />
        <nav
          ref={navRef}
          className={`flex_item_center ${isNavOpen ? "activeNav" : ""}`}
        >
          <NavbarLinks />
        </nav>
        <div className="flex_item_center gap1">
          <HeaderAuthButtons />
          <button
            aria-label="menu toggle button"
            className={`menu_btn ${isNavOpen ? "activeNav" : ""}`}
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {/* <MobileNavbar /> */}
        </div>
      </div>
    </header>
  );
}
