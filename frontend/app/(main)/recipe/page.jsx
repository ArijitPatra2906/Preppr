/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Flame,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Download,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useFetch from '@/hooks/use-fetch'
import {
  getOrGenerateRecipe,
  saveRecipeToCollection,
  removeRecipeFromCollection,
} from '@/actions/recipe.actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { RecipePDF } from '@/components/RecipePDF'
import { ClockLoader } from 'react-spinners'
import ProLockedSection from '@/components/ProLockedSection'

function RecipeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const recipeName = searchParams.get('cook')

  const [recipe, setRecipe] = useState(null)
  const [recipeId, setRecipeId] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

  // Get or generate recipe
  const {
    loading: loadingRecipe,
    data: recipeData,
    fn: fetchRecipe,
  } = useFetch(getOrGenerateRecipe)

  // Save to collection
  const {
    loading: saving,
    data: saveData,
    fn: saveToCollection,
  } = useFetch(saveRecipeToCollection)

  // Remove from collection
  const {
    loading: removing,
    data: removeData,
    fn: removeFromCollection,
  } = useFetch(removeRecipeFromCollection)

  // Fetch recipe on mount
  useEffect(() => {
    if (recipeName && !recipe) {
      const formData = new FormData()
      formData.append('recipeName', recipeName)
      fetchRecipe(formData)
    }
  }, [recipeName])

  // Update recipe when data arrives
  useEffect(() => {
    if (recipeData?.success) {
      setRecipe(recipeData.recipe)
      setRecipeId(recipeData.recipeId)
      setIsSaved(recipeData.isSaved)

      if (recipeData.fromDatabase) {
        toast.success('Recipe loaded from database')
      } else {
        toast.success('New recipe generated and saved!')
      }
    }
  }, [recipeData])

  // Handle save success
  useEffect(() => {
    if (saveData?.success) {
      if (saveData.alreadySaved) {
        toast.info('Recipe is already in your collection')
      } else {
        setIsSaved(true)
        toast.success('Recipe saved to your collection!')
      }
    }
  }, [saveData])

  // Handle remove success
  useEffect(() => {
    if (removeData?.success) {
      setIsSaved(false)
      toast.success('Recipe removed from collection')
    }
  }, [removeData])

  // Toggle save/unsave
  const handleToggleSave = async () => {
    if (!recipeId) return

    const formData = new FormData()
    formData.append('recipeId', recipeId)

    if (isSaved) {
      await removeFromCollection(formData)
    } else {
      await saveToCollection(formData)
    }
  }

  // No recipe name in URL
  if (!recipeName) {
    return (
      <div className='min-h-screen bg-background pt-24 pb-16 px-4'>
        <div className='container mx-auto max-w-4xl text-center py-20'>
          <div className='bg-orange-50 w-20 h-20 border-2 border-orange-200 flex items-center justify-center mx-auto mb-6'>
            <AlertCircle className='w-10 h-10 text-orange-600' />
          </div>
          <h2 className='text-2xl font-bold text-foreground mb-2'>
            No recipe specified
          </h2>
          <p className='text-muted-foreground mb-6 font-light'>
            Please select a recipe from the dashboard
          </p>
          <Link href='/dashboard'>
            <Button className='bg-orange-600 hover:bg-orange-700'>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingRecipe === null || loadingRecipe) {
    return (
      <div className='min-h-screen bg-background pt-24 pb-16 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center py-20'>
            <ClockLoader className='mx-auto mb-6' color='#dc6300' />
            <h2 className='text-3xl font-bold text-foreground mb-2 tracking-tight'>
              Preparing Your Recipe
            </h2>
            <p className='text-muted-foreground font-light'>
              Our AI chef is crafting detailed instructions for{' '}
              <span className='font-bold text-orange-600'>{recipeName}</span>
              ...
            </p>
            <div className='mt-8 max-w-md mx-auto'>
              <div className='flex items-center gap-3 text-sm text-stone-500'>
                <div className='flex-1 h-1 bg-stone-200 overflow-hidden relative'>
                  <div className='absolute left-0 top-0 h-full bg-orange-600 animate-slow-fill' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log(recipe, recipeData)

  // Error state
  if (loadingRecipe === false && !recipe) {
    return (
      <div className='min-h-screen bg-background pt-24 pb-16 px-4'>
        <div className='container mx-auto max-w-4xl text-center py-20'>
          <div className='bg-red-50 w-20 h-20 border-2 border-red-200 flex items-center justify-center mx-auto mb-6'>
            <AlertCircle className='w-10 h-10 text-red-600' />
          </div>
          <h2 className='text-2xl font-bold text-foreground mb-2'>
            Failed to load recipe
          </h2>
          <p className='text-muted-foreground mb-6 font-light'>
            Something went wrong while loading the recipe. Please try again.
          </p>
          <div className='flex gap-3 justify-center'>
            <Button
              onClick={() => router.back()}
              variant='outline'
              className='border-2 border-stone-900 hover:bg-stone-900 hover:text-white'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Go Back
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className='bg-orange-600 hover:bg-orange-700'
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Main recipe view
  return (
    <div className='min-h-screen bg-background pt-20 sm:pt-24 pb-16 px-3 sm:px-4 overflow-x-hidden w-full'>
      <div className='container mx-auto max-w-5xl w-full px-0'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <Link
            href='/dashboard'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-4 sm:mb-6 font-medium text-sm sm:text-base'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Dashboard
          </Link>

          {/* Title Section */}
          <div className='bg-card p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-border mb-4 sm:mb-6 overflow-hidden w-full'>
            {/* Badges */}
            {recipe.imageUrl && (
              <div className='relative w-full h-48 sm:h-64 md:h-72 overflow-hidden -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-3 sm:-mt-4 md:-mt-6 lg:-mt-8 mb-4 sm:mb-6'>
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                  priority
                />
              </div>
            )}

            <div className='flex flex-wrap gap-2 mb-3 sm:mb-4'>
              <Badge
                variant='outline'
                className='text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800 capitalize text-xs sm:text-sm'
              >
                {recipe.cuisine}
              </Badge>
              <Badge
                variant='outline'
                className='text-muted-foreground border-2 border-border capitalize text-xs sm:text-sm'
              >
                {recipe.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight leading-tight wrap-break-word overflow-wrap-anywhere'>
              {recipe.title}
            </h1>

            {/* Description */}
            <p className='text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 font-light leading-relaxed wrap-break-word'>
              {recipe.description}
            </p>

            {/* Meta Info */}
            <div className='flex flex-wrap gap-4 sm:gap-6 text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
                <span className='font-medium'>
                  {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins
                  total
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
                <span className='font-medium'>{recipe.servings} servings</span>
              </div>
              {recipe.nutrition?.calories && (
                <div className='flex items-center gap-2'>
                  <Flame className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
                  <span className='font-medium'>
                    {recipe.nutrition.calories} cal/serving
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={handleToggleSave}
                disabled={saving || removing}
                className={`${
                  isSaved
                    ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 border-2 border-green-700 dark:border-green-500'
                    : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 border-2 border-orange-700 dark:border-orange-500'
                } text-white gap-2 transition-all w-full sm:w-auto text-sm sm:text-base`}
              >
                {saving || removing ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    {saving ? 'Saving...' : 'Removing...'}
                  </>
                ) : isSaved ? (
                  <>
                    <BookmarkCheck className='w-4 h-4' />
                    Saved to Collection
                  </>
                ) : (
                  <>
                    <Bookmark className='w-4 h-4' />
                    Save to Collection
                  </>
                )}
              </Button>
              <PDFDownloadLink
                document={<RecipePDF recipe={recipe} />}
                fileName={`${recipe.title
                  .replace(/\s+/g, '-')
                  .toLowerCase()}.pdf`}
              >
                {({ loading }) => (
                  <Button
                    variant='outline'
                    className='border-2 border-orange-600 dark:border-orange-500 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 gap-2 w-full sm:w-auto text-sm sm:text-base'
                    disabled={loading}
                  >
                    <Download className='w-4 h-4' />
                    {loading ? 'Preparing PDF...' : 'Download PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-6 w-full overflow-hidden'>
          {/* Left Column - Ingredients & Nutrition */}
          <div className='lg:col-span-1 space-y-4 sm:space-y-6 w-full min-w-0 overflow-hidden'>
            {/* Ingredients */}
            <div className='bg-card p-3 sm:p-4 md:p-6 border-2 border-border lg:sticky lg:top-24 overflow-hidden w-full'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 break-words'>
                <ChefHat className='w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400 shrink-0' />
                <span>Ingredients</span>
              </h2>

              {/* Group by category */}
              {Object.entries(
                recipe.ingredients.reduce((acc, ing) => {
                  const cat = ing.category || 'Other'
                  if (!acc[cat]) acc[cat] = []
                  acc[cat].push(ing)
                  return acc
                }, {}),
              ).map(([category, items]) => (
                <div key={category} className='mb-4 sm:mb-6 last:mb-0'>
                  <h3 className='text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wide mb-2 sm:mb-3 break-words'>
                    {category}
                  </h3>
                  <ul className='space-y-2'>
                    {items.map((ingredient, i) => (
                      <li
                        key={i}
                        className='py-2 sm:py-3 border-b border-border last:border-0'
                      >
                        <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2 w-full overflow-hidden'>
                          <span className='text-foreground font-medium text-sm sm:text-base wrap-break-word overflow-hidden'>
                            {ingredient.item}
                          </span>
                          <span className='font-bold text-orange-600 dark:text-orange-400 text-xs sm:text-sm shrink-0 wrap-break-word'>
                            {ingredient.amount}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Nutrition Info */}
              {recipe.nutrition && (
                <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-border'>
                  <h3 className='font-bold text-foreground mb-3 uppercase tracking-wide text-xs sm:text-sm flex items-center gap-2 flex-wrap'>
                    <span>Nutrition (per serving)</span>
                    {!recipeData.isPro && (
                      <span className='text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold'>
                        PRO
                      </span>
                    )}
                  </h3>

                  <ProLockedSection
                    isPro={recipeData.isPro}
                    lockText='Nutrition info is Pro-only'
                  >
                    <div className='grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3'>
                      <div className='bg-orange-50 dark:bg-orange-900/30 p-3 text-center border-2 border-orange-100 dark:border-orange-800'>
                        <div className='text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400'>
                          {recipe.nutrition.calories}
                        </div>
                        <div className='text-xs sm:text-sm mt-1 sm:mt-2 text-muted-foreground font-bold uppercase tracking-wide'>
                          Calories
                        </div>
                      </div>

                      <div className='bg-background p-3 text-center border-2 border-border'>
                        <div className='text-base sm:text-lg font-bold text-foreground'>
                          {recipe.nutrition.protein}
                        </div>
                        <div className='text-xs mt-1 sm:mt-2 text-muted-foreground font-bold uppercase tracking-wide'>
                          Protein
                        </div>
                      </div>

                      <div className='bg-background p-3 text-center border-2 border-border'>
                        <div className='text-base sm:text-lg font-bold text-foreground'>
                          {recipe.nutrition.carbs}
                        </div>
                        <div className='text-xs mt-1 sm:mt-2 text-muted-foreground font-bold uppercase tracking-wide'>
                          Carbs
                        </div>
                      </div>

                      <div className='bg-background p-3 text-center border-2 border-border'>
                        <div className='text-base sm:text-lg font-bold text-foreground'>
                          {recipe.nutrition.fat}
                        </div>
                        <div className='text-xs mt-1 sm:mt-2 text-muted-foreground font-bold uppercase tracking-wide'>
                          Fat
                        </div>
                      </div>
                    </div>
                  </ProLockedSection>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Instructions & Tips */}
          <div className='lg:col-span-2 space-y-4 sm:space-y-6 w-full min-w-0 overflow-hidden'>
            {/* Instructions */}
            <div className='bg-card p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-border overflow-hidden w-full'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6 break-words'>
                Step-by-Step Instructions
              </h2>

              <div className='overflow-hidden w-full'>
                {recipe.instructions.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative pl-8 sm:pl-10 md:pl-12 pb-6 sm:pb-8 w-full ${
                      index !== recipe.instructions.length - 1
                        ? 'border-l-2 border-orange-300 dark:border-orange-700 ml-3 sm:ml-4 md:ml-5'
                        : 'ml-3 sm:ml-4 md:ml-5'
                    }`}
                  >
                    {/* Step Number */}
                    <div className='absolute -left-3 sm:-left-4 md:-left-5 top-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-orange-600 dark:bg-orange-500 text-white flex items-center justify-center font-bold border-2 border-orange-700 dark:border-orange-500 text-xs sm:text-sm md:text-base shrink-0'>
                      {step.step}
                    </div>

                    {/* Step Content */}
                    <div className='overflow-hidden w-full min-w-0'>
                      <h3 className='font-bold text-sm sm:text-base md:text-lg text-foreground mb-2 wrap-break-word overflow-hidden'>
                        {step.title}
                      </h3>
                      <p className='text-muted-foreground font-light mb-3 text-xs sm:text-sm md:text-base leading-relaxed wrap-break-word overflow-hidden'>
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div className='bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 dark:border-orange-500 p-2 sm:p-3 md:p-4 overflow-hidden w-full'>
                          <p className='text-xs sm:text-sm text-orange-900 dark:text-orange-400 flex items-start gap-2 overflow-hidden'>
                            <Lightbulb className='w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0 fill-orange-600 dark:fill-orange-500' />
                            <span className='wrap-break-word overflow-hidden min-w-0'>
                              <strong className='font-bold'>Pro Tip:</strong>{' '}
                              {step.tip}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Message */}
              <div className='mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
                  <div>
                    <h3 className='font-bold text-green-900 dark:text-green-400 mb-1 text-sm sm:text-base'>
                      You&apos;re all done!
                    </h3>
                    <p className='text-xs sm:text-sm text-green-800 dark:text-green-500 font-light'>
                      Plate your masterpiece and enjoy your delicious{' '}
                      {recipe.title}!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className='bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-orange-200 dark:border-orange-800 overflow-hidden w-full'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2 flex-wrap break-words'>
                  <Lightbulb className='w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400 shrink-0' />
                  <span>Chef&apos;s Tips & Tricks</span>
                  {!recipeData.isPro && (
                    <span className='text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold shrink-0'>
                      PRO
                    </span>
                  )}
                </h2>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText='Chef tips are Pro-only'
                  ctaText='Unlock Pro Tips →'
                >
                  <ul className='space-y-2 sm:space-y-3'>
                    {recipe.tips.map((tip, i) => (
                      <li
                        key={i}
                        className='flex items-start gap-2 sm:gap-3 text-muted-foreground overflow-hidden w-full'
                      >
                        <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5' />
                        <span className='font-light text-xs sm:text-sm md:text-base wrap-break-word overflow-hidden min-w-0 flex-1'>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </ProLockedSection>
              </div>
            )}

            {/* Substitutions */}
            {recipe.substitutions && recipe.substitutions.length > 0 && (
              <div className='bg-card p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-border overflow-hidden w-full'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 flex-wrap break-words'>
                  <span>Ingredient Substitutions</span>
                  {!recipeData.isPro && (
                    <span className='text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold shrink-0'>
                      PRO
                    </span>
                  )}
                </h2>

                <p className='text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm font-light'>
                  Don&apos;t have everything? Here are some alternatives you can
                  use:
                </p>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText='Substitutions are Pro-only'
                >
                  <div className='space-y-3 sm:space-y-4'>
                    {recipe.substitutions.map((sub, i) => (
                      <div
                        key={i}
                        className='border-b-2 border-border pb-3 sm:pb-4 last:border-0 last:pb-0 overflow-hidden w-full'
                      >
                        <h3 className='font-bold text-foreground mb-2 text-xs sm:text-sm md:text-base wrap-break-word overflow-hidden'>
                          Instead of{' '}
                          <span className='text-orange-600 dark:text-orange-400'>
                            {sub.original}
                          </span>
                          :
                        </h3>
                        <div className='flex flex-wrap gap-2 overflow-hidden w-full'>
                          {sub.alternatives.map((alt, j) => (
                            <Badge
                              key={j}
                              variant='outline'
                              className='text-muted-foreground border-2 border-border text-xs sm:text-sm wrap-break-word max-w-full'
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ProLockedSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background pt-24 pb-16 px-4'>
          <div className='container mx-auto max-w-4xl text-center py-20'>
            <Loader2 className='w-16 h-16 text-orange-600 animate-spin mx-auto mb-6' />
            <p className='text-muted-foreground'>Loading recipe...</p>
          </div>
        </div>
      }
    >
      <RecipeContent />
    </Suspense>
  )
}
