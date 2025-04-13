import Link from 'next/link'
import React from 'react'

export const Logo = () => {
    return (
        <Link href="/" className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-300 bg-clip-text text-transparent'>
            Planna
        </Link>
    )
}
