import React from 'react'
import { Globe, ArrowRight, Flame, ChefHat, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  getRecipeOfTheDay,
  getCategories,
  getAreas,
} from '@/actions/mealdb.actions'
import { getCategoryEmoji, getCountryFlag } from '@/lib/data'

export default async function DashboardPage() {
  // Fetch data server-side
  const recipeData = await getRecipeOfTheDay()
  const categoriesData = await getCategories()
  const areasData = await getAreas()

  const recipeOfTheDay = recipeData?.recipe
  const categories = categoriesData?.categories || []
  const areas = areasData?.areas || []

  return (
    <div className='min-h-screen  bg-gradient-to-br from-stone-100 via-orange-50 to-stone-100 dark:from-background dark:via-orange-950/10 dark:to-background'>
      {/* Asymmetric Masonry Layout */}
      <div className='container mx-auto px-6 py-12'>
        <div className='mb-5'>
          <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight'>
            Fresh Recipes, Preppr Daily 🔥
          </h1>
          <p className='text-xl text-muted-foreground font-light max-w-2xl'>
            Discover thousands of recipes from around the world. Cook, create,
            and savor.
          </p>
        </div>
        <div className='grid lg:grid-cols-12 gap-6'>
          {/* Left Column - Spans 8 columns */}
          <div className='lg:col-span-8 space-y-6'>
            {/* Featured Recipe Card */}
            {recipeOfTheDay && (
              <Link
                href={`/recipe?cook=${encodeURIComponent(
                  recipeOfTheDay.strMeal,
                )}`}
              >
                <div className='group relative h-[500px] rounded-3xl overflow-hidden border-3 border-stone-300 bg-stone-900 hover:border-orange-600 transition-all duration-300 shadow-xl'>
                  <Image
                    src={recipeOfTheDay.strMealThumb}
                    alt={recipeOfTheDay.strMeal}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent'></div>

                  {/* Content Overlay */}
                  <div className='absolute inset-0 p-8 flex flex-col justify-end'>
                    <Badge className='bg-orange-600 text-white border-2 border-white font-bold px-4 py-2 text-sm shadow-lg w-fit mb-4'>
                      <Flame className='mr-2 w-4 h-4' />
                      Featured Today
                    </Badge>

                    <h2 className='text-4xl md:text-5xl font-black text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors'>
                      {recipeOfTheDay.strMeal}
                    </h2>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      <Badge className='bg-card/20 backdrop-blur-sm text-white border border-white/30 font-semibold'>
                        {recipeOfTheDay.strCategory}
                      </Badge>
                      <Badge className='bg-card/20 backdrop-blur-sm text-white border border-white/30 font-semibold'>
                        <Globe className='w-3 h-3 mr-1' />
                        {recipeOfTheDay.strArea}
                      </Badge>
                    </div>

                    <p className='text-white/90 text-lg mb-4 line-clamp-2 max-w-2xl'>
                      {recipeOfTheDay.strInstructions?.substring(0, 150)}...
                    </p>

                    <Button className='w-fit bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3'>
                      Cook Now <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  </div>
                </div>
              </Link>
            )}

            {/* Categories Grid */}
            <div className='bg-card rounded-3xl p-6 my-6 border-2 border-stone-200'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='bg-orange-600 p-2 rounded-lg'>
                  <ChefHat className='w-5 h-5 text-white' />
                </div>
                <h2 className='text-2xl font-black text-foreground'>
                  Browse Categories
                </h2>
              </div>

              <div className='grid grid-cols-3 md:grid-cols-5 gap-3'>
                {categories.map((category) => (
                  <Link
                    key={category.strCategory}
                    href={`/recipes/category/${category.strCategory.toLowerCase()}`}
                  >
                    <div className='bg-stone-50 rounded-xl p-4 border border-stone-200 hover:border-orange-600 hover:bg-orange-50 transition-all text-center group cursor-pointer'>
                      <div className='text-2xl mb-1'>
                        {getCategoryEmoji(category.strCategory)}
                      </div>
                      <h3 className='font-bold text-muted-foreground group-hover:text-orange-600 transition-colors text-[10px] leading-tight'>
                        {category.strCategory}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Spans 4 columns */}
          <div className='lg:col-span-4 space-y-6'>
            {/* World Cuisines */}
            <div className='bg-card rounded-3xl p-6 border-2 border-stone-200'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='bg-orange-600 p-2 rounded-lg'>
                  <Globe className='w-5 h-5 text-white' />
                </div>
                <h2 className='text-xl font-black text-foreground'>
                  World Cuisines
                </h2>
              </div>

              <div className='flex flex-col gap-2 max-h-200 overflow-y-auto pr-1'>
                {areas.map((area) => (
                  <Link
                    key={area.strArea}
                    href={`/recipes/cuisine/${area.strArea
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    <div className='bg-stone-50 rounded-lg p-3 border border-stone-200 hover:border-orange-600 hover:bg-orange-50 transition-all group cursor-pointer'>
                      <div className='flex items-center gap-3'>
                        <span className='text-2xl'>
                          {getCountryFlag(area.strArea)}
                        </span>
                        <span className='font-bold text-muted-foreground group-hover:text-orange-600 transition-colors text-sm flex-1'>
                          {area.strArea}
                        </span>
                        <ArrowRight className='w-3 h-3 text-stone-400 group-hover:text-orange-600 transition-all' />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
