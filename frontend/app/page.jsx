import React from 'react'
import {
  ArrowRight,
  Star,
  Flame,
  Clock,
  Users,
  Sparkles,
  Check,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Github,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { auth } from '@clerk/nextjs/server'
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from '@/lib/data'
import PricingSection from '@/components/PricingSection'
import Link from 'next/link'

export default async function LandingPage() {
  const { has } = await auth()
  const subscriptionTier = has({ plan: 'pro' }) ? 'pro' : 'free'

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Hero Section - Full Width with Background */}
      <section className='relative overflow-hidden bg-gradient-to-br from-orange-50 via-stone-50 to-orange-100/30 dark:from-orange-950/20 dark:via-background dark:to-orange-900/10'>
        {/* Decorative Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl' />
          <div className='absolute top-60 -left-32 w-80 h-80 bg-orange-300 rounded-full opacity-15 blur-3xl' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4 py-20 md:py-32'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            {/* Text Content - Left Side */}
            <div className='order-2 md:order-1 text-center md:text-left'>
              <div className='inline-flex items-center gap-2 bg-card dark:bg-card border-2 border-stone-900 dark:border-border px-4 py-2 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(249,115,22,0.3)]'>
                <Sparkles className='w-4 h-4 text-orange-600 dark:text-orange-400' />
                <span className='text-sm font-bold uppercase tracking-wider'>
                  Powered by AI
                </span>
              </div>

              <h1 className='text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]'>
                Cook Smarter,
                <br />
                <span className='text-orange-600'>Waste Less</span>
              </h1>

              <p className='text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed'>
                Transform your ingredients into chef-quality meals. Scan your
                pantry, get instant recipes, and never wonder &quot;what&apos;s
                for dinner?&quot; again.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <Link href='/dashboard'>
                  <Button
                    size='xl'
                    className='bg-stone-900 dark:bg-orange-600 hover:bg-stone-800 dark:hover:bg-orange-700 text-white border-2 border-stone-900 dark:border-orange-600 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)] transition-all'
                  >
                    Get Started Free
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>
                </Link>
                {/* <Button
                  size='xl'
                  variant='outline'
                  className='border-2 border-stone-900 bg-card hover:bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all'
                >
                  Watch Demo
                </Button> */}
              </div>

              {/* Social Proof */}
              <div className='flex items-center gap-6 justify-center md:justify-start mt-10'>
                <div className='flex -space-x-3'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white'
                    />
                  ))}
                </div>
                <div className='text-left'>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 fill-orange-500 text-orange-500'
                      />
                    ))}
                  </div>
                  <p className='text-sm text-muted-foreground font-medium'>
                    10k+ happy home chefs
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image Grid - Right Side */}
            <div className='order-1 md:order-2 relative'>
              <div className='grid grid-cols-2 gap-4'>
                {/* Large Featured Card */}
                <div className='col-span-2 relative h-72 bg-card border-4 border-stone-900 rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                  <Image
                    src='/pasta-dish.png'
                    alt='Featured dish'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute top-4 right-4'>
                    <Badge className='bg-orange-600 text-white border-2 border-stone-900 font-bold px-3 py-1'>
                      <Flame className='w-3 h-3 mr-1' />
                      TRENDING
                    </Badge>
                  </div>
                </div>

                {/* Bottom Cards */}
                <Card className='border-4 border-stone-900 bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] py-0'>
                  <CardContent className='p-4'>
                    <div className='text-3xl font-black text-orange-600 mb-1'>
                      25min
                    </div>
                    <p className='text-xs font-bold uppercase tracking-wide'>
                      Avg Cook Time
                    </p>
                  </CardContent>
                </Card>

                <Card className='border-4 border-stone-900 bg-orange-600 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] py-0'>
                  <CardContent className='p-4'>
                    <div className='text-3xl font-black mb-1'>98%</div>
                    <p className='text-xs font-bold uppercase tracking-wide'>
                      Success Rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Floating Badge */}
              <div className='absolute -left-4 top-1/2 -translate-y-1/2 rotate-[-8deg] hidden md:block'>
                <div className='bg-green-500 text-white border-4 border-stone-900 px-6 py-3 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
                  <p className='text-sm font-black uppercase'>100% Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className='bg-stone-900 py-8 border-y-4 border-stone-900'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {SITE_STATS.map((stat, i) => (
              <div key={i} className='text-center'>
                <div className='text-3xl md:text-5xl font-black mb-2 text-orange-500'>
                  {stat.val}
                </div>
                <p className='text-xs md:text-sm uppercase tracking-widest font-bold text-stone-400'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section className='py-20 md:py-12 px-4 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <Badge className='bg-orange-100 text-orange-700 border-2 border-orange-600 font-bold px-4 py-1 mb-6'>
              FEATURES
            </Badge>
            <h2 className='text-4xl md:text-6xl font-black mb-6'>
              Everything You Need in
              <br />
              <span className='text-orange-600'>One Smart Kitchen</span>
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              From pantry scanning to recipe generation, we&apos;ve got you
              covered with cutting-edge AI technology.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon
              const isLarge = index < 2

              return (
                <Card
                  key={index}
                  className={`${
                    isLarge ? 'lg:col-span-2' : ''
                  } border-4 border-stone-900 dark:border-border bg-card hover:bg-orange-50 dark:hover:bg-orange-950/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(249,115,22,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)] transition-all group py-0 cursor-pointer`}
                >
                  <CardContent className='p-8'>
                    <div className='flex items-start justify-between mb-6'>
                      <div className='p-4 bg-orange-100 dark:bg-orange-900/30 border-2 border-stone-900 dark:border-border group-hover:bg-orange-600 group-hover:text-white transition-colors'>
                        <IconComponent className='w-8 h-8' />
                      </div>
                      <Badge className='bg-stone-100 dark:bg-secondary text-foreground border-2 border-stone-900 dark:border-border font-mono text-xs'>
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className='text-2xl font-black mb-3 text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Simplified Card Layout */}
      <section className='py-24 px-4 border-y-2 border-stone-200 dark:border-border bg-stone-900 dark:bg-card text-stone-50 dark:text-foreground'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-5xl md:text-6xl font-bold mb-16'>
            Cook in 3 Steps
          </h2>

          <div className='space-y-12'>
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i}>
                <div className='flex gap-6 items-start'>
                  <Badge
                    variant='outline'
                    className='text-6xl font-bold text-orange-500 border-none bg-transparent p-0 h-auto'
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <h3 className='text-2xl font-bold mb-3'>{item.title}</h3>
                    <p className='text-lg text-stone-400 dark:text-muted-foreground font-light'>
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <hr className='my-8 bg-stone-700' />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className='py-20 px-4 bg-gradient-to-br from-orange-50 to-stone-50 dark:from-orange-950/10 dark:to-background'>
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-black mb-12'>
            Loved by Home Chefs Everywhere
          </h2>

          <div className='grid md:grid-cols-3 gap-6'>
            {[
              {
                quote:
                  'This app completely changed how I meal plan. No more grocery waste!',
                name: 'Sarah M.',
                role: 'Home Cook',
              },
              {
                quote:
                  "The AI suggestions are spot-on. It's like having a chef in my pocket.",
                name: 'Mike T.',
                role: 'Food Enthusiast',
              },
              {
                quote:
                  'I went from ordering takeout 5x a week to cooking every night.',
                name: 'Jessica L.',
                role: 'Busy Parent',
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className='border-4 border-stone-900 dark:border-border bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(249,115,22,0.3)] py-0'
              >
                <CardContent className='p-6'>
                  <div className='flex gap-0.5 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 fill-orange-500 text-orange-500'
                      />
                    ))}
                  </div>
                  <p className='text-stone-700 mb-4 italic leading-relaxed'>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className='text-left'>
                    <p className='font-bold'>{testimonial.name}</p>
                    <p className='text-sm text-stone-500'>{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Only show for free users */}
      {subscriptionTier === 'free' && (
        <section className='py-20 md:py-32 px-4 bg-background'>
          <PricingSection subscriptionTier={subscriptionTier} />
        </section>
      )}

      {/* Final CTA */}
      <section className='py-20 px-4 bg-card border-y-4 border-stone-900'>
        <div className='max-w-4xl mx-auto text-center'>
          <Badge className='bg-orange-100 text-orange-700 border-2 border-orange-600 font-bold px-4 py-1 mb-6'>
            GET STARTED TODAY
          </Badge>
          <h2 className='text-4xl md:text-6xl font-black text-foreground mb-6'>
            Ready to Transform Your Kitchen?
          </h2>
          <p className='text-xl text-muted-foreground mb-10'>
            Join thousands of home chefs cooking smarter, not harder.
          </p>
          <Link href='/dashboard'>
            <Button
              size='xl'
              className='bg-orange-600 hover:bg-orange-700 text-white border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-lg px-12'
            >
              Start Cooking for Free
              <ArrowRight className='ml-2 w-6 h-6' />
            </Button>
          </Link>
          <p className='mt-6 text-stone-500 text-sm font-medium'>
            No credit card required • Free forever plan
          </p>
        </div>
      </section>
    </div>
  )
}
