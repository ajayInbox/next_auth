import React from 'react'
import Header from './header'
import BackButton from './back-button'
import { Card,
    CardHeader,
    CardFooter
 } from '../ui/card'

export default function ErrorCard() {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label='Oops! Something went wrong'/>
        </CardHeader>
        <CardFooter>
            <BackButton label='Back to Login' Href='/auth/login'/>
        </CardFooter>
    </Card>
  )
}
