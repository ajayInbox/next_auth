"use client"

import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './card-wrapper'
import FormErrors from "./form-errors"
import FormSuccess from "./form-success"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'

export default function NewVerificationForm() {

    const[error, setError] = useState<string | undefined>("")
    const[success, setSuccess] = useState<string | undefined>("")

    const params = useSearchParams()
    const token = params.get("token")

    const onSubmit = useCallback(() => {
        console.log(token)
        if(!token){
            setError("Token missing!")
            return;
        }
        newVerification(token)
        .then(( data ) => {
            setSuccess(data.success)
            setError(data.error)
        })
        .catch((error) => {
            console.log(error)
            setError("Something went wrong!")
        })

    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

  return (
    <CardWrapper
        headerLabel='Confirm your Email'
        backButtonLabel='Back to Login'
        backButtonHref='/auth/login'>
            <div className='flex items-center w-full justify-center'>
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormErrors message={error}/>
                <FormSuccess message={success}/>
            </div>
    </CardWrapper>
  )
}
