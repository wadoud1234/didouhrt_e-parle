import { useSignUp } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { toast } from "sonner";

const registerSchema = z.object({
    // name: z.string().trim()
    //     .min(4, { message: "Le nom d'utilisateur doit etre au moins 4 caractères" })
    //     .max(50, { message: "Le nom d'utilisateur doit etre au plus 50 caractères" }),

    email: z.string().trim().email()
        .min(8, { message: "L'email doit etre au moins 8 caractères" })
        .max(50, { message: "L'email doit etre au plus 50 caractères" }),

    password: z.string().trim()
        .min(8, { message: "Le mot de passe doit etre au moins 8 caractères" })
        .max(50, { message: "Le mot de passe doit etre au plus 50 caractères" })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" }),

    confirmPassword: z.string().trim(),
})
    .required()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Le mot de passe ne correspond pas",
        path: ["confirmPassword"]
    })

export type RegisterSchema = z.infer<typeof registerSchema>

function handleError(err: any, setError: UseFormSetError<RegisterSchema>) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling

    if (isClerkAPIResponseError(err)) {
        // THIS IS A CLERK AUTH PROVIDER ERROR !
        // err.errors.
        const { errors } = err
        errors.forEach(({ meta, message }) => {
            const paramName = meta?.paramName
            setError(paramName === "password" ? "password" : "email", { message: message })
        });
    }
    console.log({ err })
}

export default function useRegister(afterSubmit?: () => void) {
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            // name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const { isLoaded, signUp } = useSignUp();

    async function onSubmit(values: RegisterSchema) {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: values.email,
                password: values.password,
            });

            // Send the user an email with the verification code
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            })

            // Set 'verifying' true to display second form
            // and capture the OTP code
            toast.success("Compte creé avec succès !")
            toast.success("Veuillez consulter votre address email pour valider votre compte.")
            afterSubmit?.()
        } catch (err: any) {
            toast.error("Une erreur est survenue.")
            handleError(err, form.setError)
        }

    }
    return { form, onSubmit } as const
}