"use server"

import * as z from "zod";
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success){
        return {error: " Invalid Fields! "}
    }

    const { email, password, name} = validateFields.data
    const hashedPass = await bcrypt.hash(password, 10)

    const existingUser = getUserByEmail(email)

    if(!existingUser){
        return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPass,
        },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {success: " Email sent! "}
}

