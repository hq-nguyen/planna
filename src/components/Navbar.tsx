import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Logo } from './Logo'
import { ThemeChanger } from './ThemeChanger'

function Navbar() {
  return <nav className='flex items-center justify-between w-full p-4 px-8 h-[60px] sticky top-0 z-40 bg-white dark:bg-neutral-950 border dark:border-b-white border-b-neutral-700'>
    <Logo />
    <div className='flex gap-4  items-center'>
      <SignedOut>
        <SignInButton>
          <button className='cursor-pointer'>Sign in</button>
        </SignInButton >
        <SignUpButton>
          <button className='cursor-pointer'>Sign up</button>
        </SignUpButton >
      </SignedOut>
      <SignedIn>
        <UserButton signInUrl='sign-in' />
      </SignedIn>
      <ThemeChanger />
    </div>
  </nav>
}

export default Navbar