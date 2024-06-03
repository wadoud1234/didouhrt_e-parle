import { useState } from "react";
import "./RegisterForm.css";

import VerifyEmailForm from "./VerifyEmailForm";
import RegisterForm from "./RegisterForm";
export default function RegisterPageForm() {
  const [verifying, setVerifying] = useState(false);
  function afterRegister() {
    setVerifying(true);
  }

  if (verifying) return <VerifyEmailForm />;
  else return <RegisterForm afterRegister={afterRegister} />;
}
