"use client"

import React, { useState, useTransition } from 'react'
import * as z from "zod"
import { NewPasswordSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from "../ui/form"
import CardWrapper from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormErrors from './form-errors'
import FormSuccess from './form-success'
import { newPassword } from '@/actions/new-password'
import { useSearchParams } from 'next/navigation'

export default function NewPasswordForm() {

    const params = useSearchParams()
    const token = params.get("token")
    const[error, setError] = useState<string | undefined>("")
    const[success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }
  return (
    <CardWrapper
        headerLabel='Reset your Password?'
        backButtonLabel="Back to Login"
        backButtonHref='/auth/login'
        >
        <Form {...form}>
            <form 
                className='space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='******' type='password'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                    <FormErrors message={error}/>
                    <FormSuccess message={success}/>
                    <Button className='w-full' type='submit' disabled={isPending}>
                        Reset Password
                    </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
