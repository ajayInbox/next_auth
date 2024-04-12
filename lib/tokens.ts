import crypto from "crypto"
import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { db } from "./db"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"

export const generateVerificationToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return verificationToken;
}

export const generatePasswordResetToken = async(email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where: { id: existingToken.id}
        })
    }

    const passwordResetToken = db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return passwordResetToken;
}

export const generateTwoFactorToken = async(email: string) => {

    const token = crypto.randomInt(100_000, 100_0000).toString()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getTwoFactorTokenByEmail(email)
    if(existingToken){
        await db.twoFactor.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactor.create({
        data: {
            email,
            token,
            expires,
        }
    })
    return twoFactorToken
}