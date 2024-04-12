import { useSession } from "next-auth/react";

export const useGetCurrentUser = () => {
    const session = useSession()
    return session.data?.user
}