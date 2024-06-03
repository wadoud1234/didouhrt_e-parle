import { RiArrowLeftDoubleFill } from "react-icons/ri"; // Assuming you have react-icons installed
import "./login.css";
import LoginForm from "../../components/Auth/Login/LoginForm";

const Login = () => {
  return (
    <section className="login_section flex">
      <div className="image_side">
        <img
          src="https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-400/other/login_img.jpg?tr:bl-6"
          srcSet="https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-600/other/login_img.jpg?tr:bl-6 600w , 
          https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-800/other/login_img.jpg?tr:bl-6 800w 
          https://ik.imagekit.io/img5b6kvn/eParle/images/tr:w-1000/other/login_img.jpg?tr:bl-6 1000w"
          alt="login"
        />
      </div>
      <div className="login_side">
        <div
          onClick={() => window.history.back()}
          className="flex_center  login_back"
        >
          <RiArrowLeftDoubleFill aria-label="back button icon" />
          <span>Retour</span>
        </div>
        <div className="login_container text_center">
          <h3>Se connecter</h3>

          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
