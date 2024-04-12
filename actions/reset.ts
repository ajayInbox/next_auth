"use server"

import { ResetSchema } from "@/schemas" 
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendResetPasswordEmail } from "@/lib/mail"

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

    const resetPasswordToken = await generatePasswordResetToken(email)
    await sendResetPasswordEmail(
        resetPasswordToken.email,
        resetPasswordToken.token
    )
    
    return {success: "Reset Email sent!"}
}

export default reset;