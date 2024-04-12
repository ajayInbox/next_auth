"use client"

import React from 'react'
import { logout } from '@/actions/logout'
import { useGetCurrentUser } from '@/hook/current-user'

export default function SettingPage() {

    const user = useGetCurrentUser()
    const onClick = () => {
        logout()
    }

  return (
    <div>
        {JSON.stringify(user)}
        <button onClick={onClick}>
            Sign Out
        </button>
    </div>
  )
}
