import { z } from "zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string().trim().email()
        .min(8, { message: "L'email doit etre au moins 8 caractères." })
        .max(50, { message: "L'email doit etre au plus 50 caractères" }),

    password: z.string().trim()
        .min(8, { message: "Le mot de passe doit etre au plus 50 caractères" })
        .max(50, { message: "Le mot de passe doit etre au plus 50 caractères" })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })

}).required()

export type LoginSchema = z.infer<typeof loginSchema>

function handleError(err: any, setError: UseFormSetError<LoginSchema>) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling

    if (isClerkAPIResponseError(err)) {
        // THIS IS A CLERK AUTH PROVIDER ERROR !
        // err.errors.
        const { errors } = err
        errors.forEach(({ meta, message }) => {
            const paramName = meta?.paramName
            setError(
                paramName === "password" ? "password"
                    : paramName === "emailaddress" ? "email" : "root",
                { message: message }
            );
        });
    }
    console.log({ err })
}


export default function useLogin() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const navigate = useNavigate();


    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    // Handle the submission of the sign-in form
    async function onSubmit(values: LoginSchema) {
        if (!isLoaded) {
            return;
        }

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: values.email,
                password: values.password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                toast.success("Connexion reussie.")
                navigate('/');
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            toast.error("Connexion echouée.")
            handleError(err, form.setError)
        }
    };
    return { form, onSubmit } as const
}

