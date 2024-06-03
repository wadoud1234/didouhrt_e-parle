import { useSignUp } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const verifyEmailSchema = z.object({
    code: z.string().trim()
        .min(6, { message: "Le code doit etre au moins 6 caractères" })
        .max(6, { message: "Le code doit etre au plus 6 caractères" })
}).required()

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>

export default function useVerifyEmail() {
    const { isLoaded, signUp } = useSignUp();
    const navigate = useNavigate();
    const form = useForm<VerifyEmailSchema>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            code: ""
        }
    })

    async function onSubmit(values: VerifyEmailSchema) {
        if (!isLoaded) return;

        try {
            // Use the code the user provided to attempt verification
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: values.code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (completeSignUp.status === "complete") {
                // await setActive({ session: completeSignUp.createdSessionId });
                toast.success("Email vérifié");
                navigate("/auth/login");
            } else {

                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            toast.error("Une erreur est survenue");
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error("Error:", JSON.stringify(err, null, 2));
        }
    }

    return { form, onSubmit } as const;
}