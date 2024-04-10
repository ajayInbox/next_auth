import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

export type extendedUser = DefaultSession["user"] & {
    role: UserRole,
}

declare module "next-auth" {
    interface session {
        user: extendedUser,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}