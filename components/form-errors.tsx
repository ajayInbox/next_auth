import React from 'react'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorsProps {
    message?: string,
}

export default function FormErrors({message}: FormErrorsProps) {
    
    if(!message) return null;

  return (
    <div>FormErrors</div>
  )
}
