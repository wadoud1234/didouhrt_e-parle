import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

type Props = {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  label: string;
  placeholder?: string;
};

export default function PasswordInput({
  register,
  error,
  label,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex  flex_column gap1-2 label_input">
      <label htmlFor="password">{label}</label>
      <div className="password_input">
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder ?? ""}
        />
        <span className="password_icon" onClick={toggleVisibility}>
          {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
        </span>
      </div>
      {error && <p className="input-error">{error.message}</p>}
    </div>
  );
}
