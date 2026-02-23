'use client'

import { useEffect } from 'react'
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import { getRecipesByPantryIngredients } from '@/actions/recipe.actions'
import RecipeCard from '@/components/RecipeCard'
import PricingModal from '@/components/PricingModal'

export default function PantryRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients)

  console.log(recipesData)

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions()
  }, [])

  const recipes = recipesData?.recipes || []
  const ingredientsUsed = recipesData?.ingredientsUsed || ''

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-green-50/20 dark:via-green-950/10 to-background pt-20 pb-16'>
      <div className='container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12'>
          <Link
            href='/pantry'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-all duration-200 mb-6 group'
          >
            <div className='p-1.5 rounded-full bg-stone-100 dark:bg-secondary group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors'>
              <ArrowLeft className='w-4 h-4' />
            </div>
            <span className='font-medium'>Back to Pantry</span>
          </Link>

          <div>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mb-4'>
              <Sparkles className='w-4 h-4 text-green-600 dark:text-green-400' />
              <span className='text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide'>
                AI-Powered Recommendations
              </span>
            </div>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-none mb-3'>
              What Can I Cook?
            </h1>

            <p className='text-lg text-muted-foreground mb-8'>
              Personalized recipe suggestions based on your pantry ingredients
            </p>
          </div>

          {/* Ingredients Used */}
          {ingredientsUsed && (
            <div className='bg-card p-6 rounded-xl border border-border shadow-sm mb-6'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg'>
                  <Package className='w-6 h-6 text-orange-600 dark:text-orange-400' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold text-foreground mb-2 text-lg'>
                    Your Available Ingredients
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {ingredientsUsed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Stats */}
          {recipesData !== undefined && (
            <div className='inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg shadow-sm'>
              <Sparkles className='w-5 h-5 text-green-600' />
              <div className='text-sm'>
                {recipesData.recommendationsLimit === 'unlimited' ? (
                  <>
                    <span className='font-bold text-green-600 text-lg'>∞</span>
                    <span className='text-muted-foreground ml-1'>
                      Unlimited AI recommendations
                    </span>
                    <span className='ml-1 px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full'>
                      PRO
                    </span>
                  </>
                ) : (
                  <span className='text-muted-foreground'>
                    Upgrade to Pro for unlimited AI recommendations
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex flex-col items-center justify-center py-32'>
            <div className='relative mb-8'>
              <Loader2 className='w-16 h-16 text-green-600 animate-spin' />
              <div className='absolute inset-0 w-16 h-16 rounded-full bg-green-200/30 animate-ping' />
            </div>
            <h2 className='text-3xl font-bold text-foreground mb-3'>
              Finding Perfect Recipes...
            </h2>
            <p className='text-muted-foreground text-lg'>
              Our AI chef is analyzing your ingredients
            </p>
            <div className='mt-4 flex items-center gap-2 text-sm text-muted-foreground'>
              <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
              This will only take a moment
            </div>
          </div>
        )}

        {/* Recipes Grid - Using RecipeCard Component */}
        {!loading && recipes.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-8'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                  <TrendingUp className='w-6 h-6 text-green-600' />
                </div>
                <div>
                  <h2 className='text-3xl font-bold text-foreground'>
                    Recipe Suggestions
                  </h2>
                  <p className='text-muted-foreground text-sm'>
                    Matched to your pantry ingredients
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm'>
                <Sparkles className='w-4 h-4 text-green-600' />
                <span className='font-bold text-foreground'>
                  {recipes.length}
                </span>
                <span className='text-muted-foreground text-sm'>
                  {recipes.length === 1 ? 'recipe' : 'recipes'}
                </span>
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-6 mb-10'>
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} variant='pantry' />
              ))}
            </div>

            {/* Refresh Button */}
            <div className='text-center'>
              <Button
                onClick={() => fetchSuggestions(new FormData())}
                variant='outline'
                className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white gap-2 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md transition-all'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className='w-5 h-5' />
                    Get New Suggestions
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Empty Pantry State */}
        {!loading && recipes.length === 0 && recipesData?.success === false && (
          <div className='text-center py-32'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6'>
              <AlertCircle className='w-12 h-12 text-orange-600 dark:text-orange-400' />
            </div>
            <h3 className='text-3xl font-bold text-foreground mb-3'>
              Your Pantry is Empty
            </h3>
            <p className='text-muted-foreground text-lg mb-10 max-w-lg mx-auto'>
              Add ingredients to your pantry first so we can suggest delicious
              recipes you can make!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/pantry/scan'>
                <Button className='bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white gap-2 px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-xl transition-all'>
                  <Sparkles className='w-5 h-5' />
                  Scan with AI
                </Button>
              </Link>
              <Link href='/pantry'>
                <Button
                  variant='outline'
                  className='border-2 border-border hover:bg-secondary gap-2 px-8 py-6 text-lg rounded-lg'
                >
                  <Package className='w-5 h-5' />
                  Add Manually
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Rate Limit Reached */}
        {!loading && recipesData === undefined && (
          <div className='text-center py-32'>
            <div className='relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-full mb-6'>
              <Sparkles className='w-12 h-12 text-orange-600 dark:text-orange-400' />
              <div className='absolute inset-0 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800/20 dark:to-amber-800/20 opacity-30 animate-pulse' />
            </div>
            <h3 className='text-3xl font-bold text-foreground mb-3'>
              Monthly Limit Reached
            </h3>
            <p className='text-muted-foreground text-lg mb-10 max-w-lg mx-auto'>
              You&apos;ve used all your AI recipe recommendations this month.
              Upgrade to Pro for unlimited suggestions!
            </p>
            <PricingModal>
              <Button className='bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white gap-2 px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-xl transition-all'>
                <Sparkles className='w-5 h-5' />
                Upgrade to Pro
              </Button>
            </PricingModal>
          </div>
        )}
      </div>
    </div>
  )
}
