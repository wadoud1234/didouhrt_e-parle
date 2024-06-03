import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" style={{ width: "100px" }} className="logo">
      <img
        src="https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-100/logo/logo3.png"
        srcSet="https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-200/logo/logo3.png 200w"
        alt="logo"
      />
    </Link>
  );
}
