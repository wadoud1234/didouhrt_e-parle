export type ClerkErrorObject<T> = {
    "code": string,
    "message": string,
    "longMessage": string,
    "meta": {
        "paramName": T
    }
}
export type ClerkError<T> = {
    "status": number,
    "clerkError": boolean,
    "errors": ClerkErrorObject<T>[]
}