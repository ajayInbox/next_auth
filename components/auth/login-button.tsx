import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    addChild?: boolean,
}

export default function LoginButton({children, mode="redirect", addChild}: LoginButtonProps) {

    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if(mode === "modal"){
        return(
            <span>
                To be implement
            </span>
        )
    }
  return (
    <span className="cursor-pointer" onClick={onClick}>{children}</span>
  )
}
