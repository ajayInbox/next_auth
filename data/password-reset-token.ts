import { db } from "@/lib/db";

export const getPasswordResetTokenByToken =  async(token: string) => {

    try{
        const PasswordToken = await db.passwordResetToken.findUnique({
            where: { token }
        })
    }catch {
        return null
    }
}