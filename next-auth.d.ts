import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole,
}

declare module "next-auth" {
    interface session {
        user: ExtendedUser,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}