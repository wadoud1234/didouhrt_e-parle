import { NavLink } from "react-router-dom";
import "./NavbarLinks.module.css";

type NavbarLinkType = {
  link: string;
  name: string;
};
const navbarLinks: NavbarLinkType[] = [
  { link: "/", name: "Accueil" },
  { link: "/cours", name: "Cours" },
  { link: "/à_propos", name: "À Propos" },
  { link: "/contact", name: "Contact" },
];

export const NavbarLink = ({ link, name }: { link: string; name: string }) => (
  <NavLink
    to={link}
    className={({ isActive }) => {
      return isActive ? "navLink activeLink" : "navLink";
    }}
  >
    {name}
  </NavLink>
);

const NavbarLinks = () => {
  return (
    <>
      {navbarLinks.map(({ link, name }) => (
        <NavbarLink key={link} link={link} name={name} />
      ))}
    </>
  );
};
export default NavbarLinks;
