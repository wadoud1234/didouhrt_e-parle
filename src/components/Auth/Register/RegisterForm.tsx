import useRegister from "../../../hooks/Auth/useRegister";
import { Link } from "react-router-dom";
import PasswordInput from "../PasswordInput/PasswordInput";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "../Login/OauthLoginButtons";

export default function RegisterForm({
  afterRegister,
}: {
  afterRegister: () => void;
}) {
  const { form, onSubmit } = useRegister(afterRegister);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <form className="pad_top1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex_column gap1">
        <div className="flex  flex_column gap1-2 label_input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Entrer votre email"
            {...register("email")}
          />
          <p className="input-error">{errors.email?.message}</p>
        </div>

        <PasswordInput
          error={errors.password}
          register={register("password")}
          label="Mot de passe"
          placeholder="Entrer votre mot de passe"
        />
        <PasswordInput
          error={errors.confirmPassword}
          register={register("confirmPassword")}
          label="Confirmer votre mot de passe"
          placeholder="Confirmer votre mot de passe"
        />
        {/* <div className="flex  flex_column gap1-2 label_input">
          <label htmlFor="password">Confirmer mot de passe</label>
          <div className="password_input">
            <input
              {...register("confirmPassword")}
              type={showPassword.confirmPassWord ? "text" : "password"}
              placeholder="Entrer votre mot de passe"
            />
            <span
              className="password_icon"
              onClick={() => handlePasswordVisibility("confirmPassword")}
            >
              {showPassword.confirmPassWord ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          <p className="input-error">{errors.confirmPassword?.message}</p>
        </div> */}
        <button className="primary_btn" disabled={isSubmitting} type="submit">
          <span>Se connecter</span>
        </button>
      </div>
      <p className="pad_blk1 form_separator">ou</p>

      <div className="flex flex_column gap1 pad_btm0-5">
        <GoogleLoginButton disabled={isSubmitting} />
        <FacebookLoginButton disabled={isSubmitting} />
      </div>
      <p className="">
        Vous avez déjà un compte ?
        <Link to="/auth/login" className="signInUp_btn">
          <b> Connectez-vous</b>
        </Link>
      </p>
    </form>
  );
}
