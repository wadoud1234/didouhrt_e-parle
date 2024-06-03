import { useState } from "react";
import "./LoginForm.css";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/Auth/useLogin";
import { FacebookLoginButton, GoogleLoginButton } from "./OauthLoginButtons";

export default function LoginForm() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    onSubmit,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // // Clerk
  // const { isLoaded, signUp, setActive } = useSignUp();
  // const [emailAddress, setEmailAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [verifying, setVerifying] = useState(false);
  // const [code, setCode] = useState("");
  // const navigate = useNavigate();
  return (
    <form className="pad_top1" onSubmit={handleSubmit(onSubmit)}>
      <p
        className="input-error"
        style={{ display: errors.root ? "block" : "none" }}
      >
        {errors.root?.message}
      </p>
      <div className="flex flex_column gap1">
        <div className="flex  flex_column gap1-2 label_input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            required
            placeholder="Entrer votre email"
          />
          <p
            className="input-error"
            style={{ display: errors.email ? "block" : "none" }}
          >
            {errors.email?.message}
          </p>
        </div>

        <div className="flex  flex_column gap1-2 label_input">
          <label htmlFor="password">Mot de passe</label>
          <div className="password_input">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Entrer votre mot de passe"
            />
            <span className="password_icon" onClick={handlePasswordVisibility}>
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          <p
            className="input-error"
            style={{ display: errors.password ? "block" : "none" }}
          >
            {errors.password?.message}
          </p>
          <Link
            aria-label="forget password"
            className="forget_password_tag"
            to="#"
          >
            Mot de passe oublié?
          </Link>
        </div>
        <button
          aria-label="login button"
          className="primary_btn "
          type="submit"
          disabled={isSubmitting}
        >
          Se connecter
        </button>
      </div>
      <p className="pad_blk1 form_separator">ou</p>

      <div className="flex flex_column gap1 pad_btm0-5">
        <GoogleLoginButton disabled={isSubmitting} />
        <FacebookLoginButton disabled={isSubmitting} />
      </div>
      <p>
        Vous n'avez pas de compte ?
        <Link
          aria-label=" sign up link"
          className="signInUp_btn"
          to="/auth/register"
        >
          <b> Inscrivez-vous</b>
        </Link>
      </p>
    </form>
  );
}
