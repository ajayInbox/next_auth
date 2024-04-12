import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Navbar from './__components/navbar'

export default async function ProtectedLayout({children}: {children: React.ReactNode}) {

    const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className='flex flex-col items-center justify-center w-full h-full bg-sky-500'>
        <Navbar/>
        {children}
      </div>
    </SessionProvider>
  )
}
