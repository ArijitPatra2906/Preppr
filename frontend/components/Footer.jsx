import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Twitter, Instagram, Facebook, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className='bg-stone-950 dark:bg-card text-stone-300 dark:text-card-foreground border-t-4 border-stone-900 dark:border-border'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          {/* Brand Column */}
          <div className='md:col-span-1'>
            <Link href='/' className='inline-block mb-4'>
              <div className='flex items-center gap-3'>
                <Image
                  src='/orange-logo.png'
                  alt='Preppr Logo'
                  width={70}
                  height={70}
                  className='w-24 h-24'
                />
              </div>
            </Link>
            <p className='text-sm leading-relaxed mb-6 text-stone-400 dark:text-muted-foreground'>
              Your AI-powered cooking companion. Transform leftovers into
              masterpieces.
            </p>
            <div className='flex gap-3'>
              <a
                href='#'
                className='w-10 h-10 bg-stone-900 dark:bg-secondary hover:bg-orange-600 dark:hover:bg-orange-500 border-2 border-stone-800 dark:border-border hover:border-orange-600 dark:hover:border-orange-500 flex items-center justify-center transition-colors'
                aria-label='Twitter'
              >
                <Twitter className='w-4 h-4' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-stone-900 dark:bg-secondary hover:bg-orange-600 dark:hover:bg-orange-500 border-2 border-stone-800 dark:border-border hover:border-orange-600 dark:hover:border-orange-500 flex items-center justify-center transition-colors'
                aria-label='Instagram'
              >
                <Instagram className='w-4 h-4' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-stone-900 dark:bg-secondary hover:bg-orange-600 dark:hover:bg-orange-500 border-2 border-stone-800 dark:border-border hover:border-orange-600 dark:hover:border-orange-500 flex items-center justify-center transition-colors'
                aria-label='Facebook'
              >
                <Facebook className='w-4 h-4' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-stone-900 dark:bg-secondary hover:bg-orange-600 dark:hover:bg-orange-500 border-2 border-stone-800 dark:border-border hover:border-orange-600 dark:hover:border-orange-500 flex items-center justify-center transition-colors'
                aria-label='Github'
              >
                <Github className='w-4 h-4' />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className='text-white dark:text-foreground font-black text-sm uppercase tracking-wider mb-4'>
              Product
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/dashboard'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='/#features'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='/#pricing'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className='text-white dark:text-foreground font-black text-sm uppercase tracking-wider mb-4'>
              Resources
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Recipe Library
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className='text-white dark:text-foreground font-black text-sm uppercase tracking-wider mb-4'>
              Company
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:text-orange-500 transition-colors'
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='py-8 border-t border-stone-800 dark:border-border mb-8'>
          <div className='max-w-2xl mx-auto text-center'>
            <h3 className='text-white dark:text-foreground font-black text-lg mb-2'>
              Get Weekly Recipe Inspiration
            </h3>
            <p className='text-sm text-stone-400 dark:text-muted-foreground mb-6'>
              Join 10,000+ home chefs receiving tips, recipes, and exclusive
              offers.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 bg-stone-900 dark:bg-secondary border-2 border-stone-800 dark:border-border text-white dark:text-foreground placeholder:text-stone-500 dark:placeholder:text-muted-foreground focus:outline-none focus:border-orange-600 dark:focus:border-orange-500'
              />
              <Button className='bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white border-2 border-orange-600 dark:border-orange-500 px-6 py-3 font-bold'>
                Subscribe
                <Mail className='ml-2 w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-stone-800 dark:border-border flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-stone-500 dark:text-muted-foreground'>
            © 2026 Preppr. All rights reserved.
          </p>
          <div className='flex gap-6 text-sm'>
            <Link
              href='#'
              className='text-stone-500 dark:text-muted-foreground hover:text-orange-500 transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-stone-500 dark:text-muted-foreground hover:text-orange-500 transition-colors'
            >
              Terms of Service
            </Link>
            <Link
              href='#'
              className='text-stone-500 dark:text-muted-foreground hover:text-orange-500 transition-colors'
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
