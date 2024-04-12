"use client"

import React from 'react'
import { FaUser } from 'react-icons/fa'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "../ui/dropdown-menu"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "../ui/avatar"
import LogoutButton from './logout-button'
import { ExitIcon } from '@radix-ui/react-icons'

export default function UserButton() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src=""/>
                <AvatarFallback className="bg-sky-500">
                    <FaUser className='text-white'/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='end'>
            <LogoutButton>
                <DropdownMenuItem>
                    <ExitIcon className='h-4 w-4 mr-2'/>
                    LogOut
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
