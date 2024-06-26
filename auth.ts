import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
import { db } from "./lib/db"
import { UserRole } from "@prisma/client"
import { twoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export const { 
    handlers: {GET, POST}, 
    auth,
    signIn,
    signOut
} = NextAuth({ 
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },

    events: {
        async linkAccount({ user }){
            await db.user.update({
                where:{ id: user.id},
                data: { emailVerified: new Date()}
            })
        }
    },

    callbacks: {
        async signIn({ user, account}){
            //Allow OAuth without Email Verification
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
            if(!existingUser || !existingUser.emailVerified){
                return false;
            }

            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await twoFactorConfirmationByUserId(existingUser.id)

                if(!twoFactorConfirmation) return false

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }
            return true
        },

        async session({session, token}){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }
            console.log(session)
            return session;
        },

        async jwt({token}) {
            console.log(token)
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token;

            token.role = existingUser.role;
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,
})