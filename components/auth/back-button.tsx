"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface BackButtonProps {
    Href: string,
    label: string,
}

export default function BackButton({ Href, label }: BackButtonProps) {
  return (
    <Button className='font-normal w-full' variant={"link"} size={"sm"}>
        <Link href={Href}>
            {label}
        </Link>
    </Button>
  )
}
