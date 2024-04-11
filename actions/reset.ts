"use server"

import { ResetSchema } from "@/schemas" 
import * as z from "zod"
import { getUserByEmail } from "@/data/user"

const reset = async(values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);
    if(!validateFields.success){
        return {error: "Invalid Email!"}
    }

    const{ email } = validateFields.data

    const existingUser = await getUserByEmail(email);
    if(!existingUser){
        return {error: "Email not found!"}
    }

    return {success: "Reset Email sent!"}
}

export default reset;