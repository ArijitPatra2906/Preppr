import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Cookie, Refrigerator, Sparkles } from 'lucide-react'
import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { checkUser } from '@/lib/checkUser'
import PricingModal from './PricingModal'
import HowToCookModal from './HowToCookModal'
import { ThemeToggle } from './ThemeToggle'

export default async function Header() {
  const user = await checkUser()

  return (
    <header className='fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-background/60'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link
          href={user ? '/dashboard' : '/'}
          className='flex items-center gap-2 group'
        >
          <Image
            src='/orange-logo.png'
            alt='Preppr Logo'
            width={120}
            height={120}
            className='w-20 sm:w-28'
            priority
          />
        </Link>

        <div className='hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground'>
          <Link
            href='/recipes'
            className='hover:text-primary transition-colors flex gap-1.5 items-center'
          >
            <Cookie className='w-4 h-4' />
            My Recipes
          </Link>
          <Link
            href='/pantry'
            className='hover:text-primary transition-colors flex gap-1.5 items-center'
          >
            <Refrigerator className='w-4 h-4' />
            My Pantry
          </Link>
        </div>

        <div className='flex items-center gap-2 sm:gap-4'>
          <ThemeToggle />
          <HowToCookModal />
          <SignedIn>
            {/* Pricing Modal with Built-in Trigger */}
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant='outline'
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === 'pro'
                      ? 'bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm'
                      : 'bg-secondary/50 text-secondary-foreground border-border cursor-pointer hover:bg-secondary hover:border-border'
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === 'pro'
                        ? 'text-white fill-white/20'
                        : 'text-stone-500'
                    }`}
                  />
                  <span className='hidden sm:inline'>
                    {user.subscriptionTier === 'pro' ? 'Pro Chef' : 'Free Plan'}
                  </span>
                  <span className='sm:hidden'>
                    {user.subscriptionTier === 'pro' ? 'Pro' : 'Free'}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode='modal'>
              <Button
                variant='ghost'
                className='text-muted-foreground hover:text-primary hover:bg-primary/10 font-medium text-sm px-3 sm:px-4'
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button className='bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-full px-4 sm:px-6 text-sm'>
                <span className='hidden xs:inline'>Get Started</span>
                <span className='xs:hidden'>Start</span>
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}
