"use client"

import React, { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
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
import FormErrors from './form-errors'
import FormSuccess from './form-success'
import login from '@/actions/login'
import Link from 'next/link'

export default function LoginForm() {

    const params = useSearchParams()
    const urlError = params.get("error")==="OAuthAccountNotLinked" ? "Email already in use With Different Providers":""
    const[showTwoFactor, setShowTwoFactor] = useState(true)
    const[error, setError] = useState<string | undefined>("")
    const[success, setSuccess] = useState<string | undefined>("")
    const[isPending, startTransition] = useTransition()

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
                if(data?.error){
                    form.reset()
                    setError(data?.error)
                }
                if(data?.success){
                    form.reset()
                    setSuccess(data?.success)
                }
                if(data?.twoFactor){
                    setShowTwoFactor(true)
                }
            })
            .catch(() => {
                setError("Something went wrong!")
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
                        {!showTwoFactor && (
                            <>
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
                                    <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className='px-0 font-normal'>
                                        <Link href="/auth/reset">
                                        Forgot Password?
                                        </Link>
                                    </Button>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            </>
                        )}
                        {
                            showTwoFactor && (
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>2FA Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='123456' type='text'/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>    
                        )}
                    </div>
                    <FormErrors message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button className='w-full' type='submit' disabled={isPending}>
                        { showTwoFactor ? "Confirm" : "Login"}
                    </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
