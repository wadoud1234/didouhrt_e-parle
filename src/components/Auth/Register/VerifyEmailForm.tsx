import useVerifyEmail from "../../../hooks/Auth/useVerifyEmail";

export default function VerifyEmailForm() {
  const { form, onSubmit } = useVerifyEmail();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <form className="pad_top1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex_column gap1">
        <div className="flex  flex_column gap1-2 label_input">
          <p style={{ color: "gray", lineHeight: "1.5" }}>
            Verifie votre address email et entrez le code ci-dessous pour
            valider votre compte svp !
          </p>
          <label htmlFor="email">Code</label>
          <input
            type="text"
            placeholder="Entrer votre email"
            {...register("code")}
          />
          <p className="input-error">{errors.code?.message}</p>
        </div>

        {/* <label id="code">Enter your verification code</label>
      <input required {...register("code")} />
      {errors.code && <p className="input-error">{errors.code.message}</p>} */}
        <button className="primary_btn" disabled={isSubmitting} type="submit">
          Verify
        </button>
      </div>
    </form>
  );
}
