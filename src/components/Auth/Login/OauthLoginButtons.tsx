import {
  useFacebookLogin,
  useGoogleLogin,
} from "../../../hooks/Auth/useLoginWith";

type Props = {
  disabled: boolean;
};
export function GoogleLoginButton({ disabled }: Props) {
  const { loginWithGoogle } = useGoogleLogin();
  return (
    <button
      className="connect_with_button flex_center gap1-2"
      type="button"
      disabled={disabled}
      onClick={loginWithGoogle}
    >
      <img
        src="https://ik.imagekit.io/img5b6kvn/eParle/images/logo/google_logo.svg"
        alt="google_logo"
      />
      <span>Connecter avec Google</span>
    </button>
  );
}

export function FacebookLoginButton({ disabled }: Props) {
  const { loginWithFacebook } = useFacebookLogin();
  return (
    <button
      disabled={disabled}
      className="connect_with_button flex_center gap1-2"
      onClick={loginWithFacebook}
      type="button"
    >
      <img
        src="https://ik.imagekit.io/img5b6kvn/eParle/images/logo/facebook_logo.svg"
        alt="facebook_logo"
      />
      <span>Connecter avec Facebook</span>
    </button>
  );
}
