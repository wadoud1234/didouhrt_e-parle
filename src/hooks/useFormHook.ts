import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

type Props<T> = {
    schema: ZodSchema,
    defaultValues: T
}

export default function useFormHook<T>({ schema, defaultValues }: Props<T>) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues
    })

    const isLoading = form.formState.isLoading || form.formState.isSubmitting || form.formState.isValidating

    return { form, isLoading } as const
}