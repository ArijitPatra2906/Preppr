'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Loader2, Grid3x3, LayoutGrid, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import useFetch from '@/hooks/use-fetch'

export default function RecipeGrid({
  type, // "category" or "cuisine"
  value, // actual category/cuisine name
  fetchAction, // server action to fetch meals
  backLink = '/dashboard',
}) {
  const { loading, data, fn: fetchMeals } = useFetch(fetchAction)
  const [viewMode, setViewMode] = useState('masonry') // 'masonry' or 'grid'

  useEffect(() => {
    if (value) {
      // Capitalize first letter for API call
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1)
      fetchMeals(formattedValue)
    }
  }, [value])

  const meals = data?.meals || []
  const displayName = value?.replace(/-/g, ' ') // Convert "saudi-arabian" to "saudi arabian"

  // Featured recipe (first one)
  const featuredRecipe = meals[0]
  const regularRecipes = meals.slice(1)

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white pt-14 pb-16'>
      <div className='container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12'>
          <Link
            href={backLink}
            className='inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-all duration-200 mb-6 group'
          >
            <div className='p-1.5 rounded-full bg-stone-100 group-hover:bg-orange-100 transition-colors'>
              <ArrowLeft className='w-4 h-4' />
            </div>
            <span className='font-medium'>Back to Dashboard</span>
          </Link>

          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 rounded-full mb-4'>
                <Sparkles className='w-4 h-4 text-orange-600' />
                <span className='text-sm font-semibold text-orange-700 uppercase tracking-wide'>
                  {type === 'cuisine' ? 'Cuisine Collection' : 'Recipe Collection'}
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 capitalize tracking-tight leading-none mb-3'>
                {displayName}
              </h1>

              {!loading && meals.length > 0 && (
                <p className='text-lg text-stone-600 flex items-center gap-2'>
                  <span className='inline-flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full text-sm font-bold'>
                    {meals.length}
                  </span>
                  curated {displayName} {type === 'cuisine' ? 'dishes' : 'recipes'} for you
                </p>
              )}
            </div>

            {/* View Toggle */}
            {!loading && meals.length > 0 && (
              <div className='flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-1 shadow-sm'>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'masonry'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  aria-label='Masonry view'
                >
                  <LayoutGrid className='w-5 h-5' />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  aria-label='Grid view'
                >
                  <Grid3x3 className='w-5 h-5' />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex flex-col justify-center items-center py-32'>
            <div className='relative'>
              <Loader2 className='w-12 h-12 text-orange-600 animate-spin' />
              <div className='absolute inset-0 w-12 h-12 rounded-full bg-orange-200/30 animate-ping' />
            </div>
            <p className='text-stone-600 font-medium mt-6'>Discovering amazing recipes...</p>
            <p className='text-stone-400 text-sm mt-1'>This will only take a moment</p>
          </div>
        )}

        {/* Masonry Layout */}
        {!loading && meals.length > 0 && viewMode === 'masonry' && (
          <div className='space-y-8'>
            {/* Featured Recipe */}
            {featuredRecipe && (
              <div className='mb-12'>
                <div className='flex items-center gap-2 mb-4'>
                  <Sparkles className='w-5 h-5 text-orange-600' />
                  <h2 className='text-xl font-bold text-stone-900'>Featured Recipe</h2>
                </div>
                <Link href={`/recipe?cook=${encodeURIComponent(featuredRecipe.strMeal)}`}>
                  <div className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-stone-200'>
                    <div className='grid md:grid-cols-2 gap-0'>
                      {/* Image Side */}
                      <div className='relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden'>
                        <Image
                          src={featuredRecipe.strMealThumb}
                          alt={featuredRecipe.strMeal}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-700'
                          sizes='(max-width: 768px) 100vw, 50vw'
                          priority
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />

                        {/* Featured Badge */}
                        <div className='absolute top-6 left-6'>
                          <div className='px-4 py-2 bg-orange-600 text-white rounded-full font-bold text-sm shadow-lg flex items-center gap-2'>
                            <Sparkles className='w-4 h-4' />
                            Featured
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className='flex flex-col justify-center p-8 lg:p-12'>
                        <h3 className='text-3xl lg:text-4xl font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight'>
                          {featuredRecipe.strMeal}
                        </h3>
                        <p className='text-stone-600 text-lg mb-6 leading-relaxed'>
                          Discover this incredible {displayName} dish, carefully selected as our top recommendation for you.
                        </p>
                        <div className='inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all'>
                          <span>View Recipe</span>
                          <ArrowLeft className='w-5 h-5 rotate-180' />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Masonry Grid */}
            {regularRecipes.length > 0 && (
              <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'>
                {regularRecipes.map((meal, idx) => (
                  <div key={meal.idMeal} className='break-inside-avoid'>
                    <Link href={`/recipe?cook=${encodeURIComponent(meal.strMeal)}`}>
                      <div className='group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-stone-200'>
                        {/* Dynamic aspect ratio for variety */}
                        <div className={`relative ${idx % 5 === 0 ? 'aspect-[3/4]' : idx % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden`}>
                          <Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            fill
                            className='object-cover group-hover:scale-110 transition-transform duration-500'
                            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                          />

                          {/* Overlay */}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />

                          {/* Title Overlay */}
                          <div className='absolute bottom-0 left-0 right-0 p-5'>
                            <h3 className='text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg'>
                              {meal.strMeal}
                            </h3>
                          </div>

                          {/* Hover Icon */}
                          <div className='absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                            <ArrowLeft className='w-5 h-5 text-orange-600 rotate-180' />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Standard Grid Layout */}
        {!loading && meals.length > 0 && viewMode === 'grid' && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {meals.map((meal) => (
              <div key={meal.idMeal}>
                <Link href={`/recipe?cook=${encodeURIComponent(meal.strMeal)}`}>
                  <div className='group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200'>
                    {/* Uniform aspect ratio */}
                    <div className='relative aspect-[4/3] overflow-hidden'>
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                      />

                      {/* Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />

                      {/* Title Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 p-5'>
                        <h3 className='text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg'>
                          {meal.strMeal}
                        </h3>
                      </div>

                      {/* Hover Icon */}
                      <div className='absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                        <ArrowLeft className='w-5 h-5 text-orange-600 rotate-180' />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && meals.length === 0 && (
          <div className='text-center py-32'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6'>
              <span className='text-5xl'>🍽️</span>
            </div>
            <h3 className='text-3xl font-bold text-stone-900 mb-3'>
              No recipes found
            </h3>
            <p className='text-stone-500 text-lg mb-8 max-w-md mx-auto'>
              We couldn&apos;t find any {displayName}{' '}
              {type === 'cuisine' ? 'dishes' : 'recipes'} at the moment.
            </p>
            <Link href={backLink}>
              <button className='inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors shadow-md'>
                <ArrowLeft className='w-5 h-5' />
                Explore More Recipes
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
