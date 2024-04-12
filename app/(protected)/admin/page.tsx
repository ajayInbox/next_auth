import { useCurrentRole } from '@/hook/current-role'
import React from 'react'

export default function AdminPage() {

    const role = useCurrentRole()
  return (
    <div>{role}</div>
  )
}
