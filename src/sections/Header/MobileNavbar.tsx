// import { useState } from "react";
// import { FaHamburger } from "react-icons/fa";
// import NavbarLinks from "./NavbarLinks";
// import "./MobileNavbar.css";
// export default function MobileNavbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   function toggleMenu() {
//     setIsOpen((prev) => !prev);
//   }
//   return (
//     <div className="mobile-navbar-container">
//       <button onClick={toggleMenu}>
//         <FaHamburger />
//       </button>
//       {isOpen && (
//         <div
//           className="mobile-navbar"
//           style={{
//             backgroundColor: "red",
//             zIndex: 100,
//             position: "fixed",
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: 0,
//           }}
//         >
//           <NavbarLinks />
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import NavbarLinks from "./NavbarLinks";
import classes from "./MobileNavbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  function close() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  useEffect(() => {
    document.addEventListener("mousedown", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (navRef.current && !navRef.current.contains(target)) {
        close();
      }
      if (
        navRef.current &&
        isOpen &&
        navRef.current.contains(target) &&
        target.classList.contains("navLink")
      ) {
        close();
        target.click();
      }
    });
    return () => {
      document.removeEventListener("mousedown", (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e?.target as Node)) {
          close();
        }
      });
    };
  }, []);
  return (
    <div>
      <button
        className={classes["mobile-navbar-btn"]}
        onClick={open}
        disabled={isOpen}
      >
        <RxHamburgerMenu size="20px" style={{ marginTop: "2px" }} />
      </button>
      {isOpen && (
        <div
          className={classes["mobile-navbar"]}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            display: isOpen ? "flex" : "hidden",
            flexDirection: "column",
            minHeight: "100vh",
            height: "100vh",
            zIndex: 1000,
            backgroundColor: "var(--bodyColor)",
            maxWidth: "300px",
            width: "100%",
            borderLeft: "1px solid var(--extraLightSecondaryColor)",
            padding: "20px 20px",
          }}
        >
          <button
            onClick={close}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              paddingBottom: "20px",
            }}
          >
            <IoMdClose size="20px" />
          </button>
          <div
            ref={navRef}
            id="mobile-navbar"
            style={{
              width: "100%",
              height: "100vh",
              scrollBehavior: "unset",
              backgroundColor: "var(--bodyColor)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignContent: "start",
              gap: "20px",
            }}
          >
            <NavbarLinks />
          </div>
          {/* <NavbarLinks /> */}
        </div>
      )}
    </div>
  );
}
