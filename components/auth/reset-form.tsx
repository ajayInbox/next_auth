"use client"

import React, { useState, useTransition } from 'react'
import * as z from "zod"
import { ResetSchema } from '@/schemas'
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
import reset from '@/actions/reset'

export default function ResetForm() {

    const[error, setError] = useState<string | undefined>("")
    const[success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            reset(values)
            .then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }
  return (
    <CardWrapper
        headerLabel='Forgot your Password?'
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
                    </div>
                    <FormErrors message={error}/>
                    <FormSuccess message={success}/>
                    <Button className='w-full' type='submit' disabled={isPending}>
                        send reset email
                    </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
