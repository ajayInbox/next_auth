"use client"

import React, { useState, useTransition } from 'react'
import * as z from "zod"
import { LoginSchema } from '@/schemas'
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
import FormErrors from '../form-errors'
import FormSuccess from './form-success'
import login from '@/actions/login'

export default function LoginForm() {

    const[error, setError] = useState<string | undefined>("")
    const[success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }
  return (
    <CardWrapper
        headerLabel='Welcome Back!'
        backButtonLabel="Don't have an account"
        backButtonHref='/auth/register'
        showSocial
        >
        <Form {...form}>
            <form 
                className='space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='email' type='email'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Password' type='password'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                    <FormErrors message={error}/>
                    <FormSuccess message={success}/>
                    <Button className='w-full' type='submit' disabled={isPending}>
                        Login
                    </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
