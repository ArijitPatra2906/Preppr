import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function RecipeCard({ recipe, variant = 'default' }) {
  // Handle different recipe data structures
  const getRecipeData = () => {
    // For MealDB recipes (category/cuisine pages)
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      }
    }

    // For AI-generated pantry recipes
    if (recipe.matchPercentage) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        matchPercentage: recipe.matchPercentage,
        missingIngredients: recipe.missingIngredients || [],
        image: recipe.imageUrl, // Add image support
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl, // Show if image exists
      }
    }

    // For Strapi recipes (saved recipes, search results)
    if (recipe) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      }
    }

    return {}
  }

  const data = getRecipeData()

  // Variant: grid (for category/cuisine pages with images)
  if (variant === 'grid') {
    return (
      <Link href={data.href}>
        <Card className='rounded-xl overflow-hidden border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col'>
          {/* Image */}
          {data.showImage ? (
            <div className='relative aspect-[4/3] overflow-hidden'>
              <Image
                src={data.image}
                alt={data.title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-500'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />

              {/* Title Overlay */}
              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <h3 className='text-white font-bold text-base leading-tight line-clamp-2 drop-shadow-lg'>
                  {data.title}
                </h3>
              </div>

              {/* Hover Icon */}
              <div className='absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                <ArrowLeft className='w-4 h-4 text-orange-600 rotate-180' />
              </div>
            </div>
          ) : (
            // Fallback gradient background when no image
            <div className='relative aspect-[4/3] bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 flex items-center justify-center overflow-hidden'>
              <ChefHat className='w-20 h-20 text-white/30' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />

              {/* Title for fallback */}
              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <h3 className='text-white font-bold text-base leading-tight line-clamp-2 drop-shadow-lg'>
                  {data.title}
                </h3>
              </div>
            </div>
          )}
        </Card>
      </Link>
    )
  }

  // Variant: pantry (for AI-generated suggestions with match percentage)
  if (variant === 'pantry') {
    return (
      <Card className='rounded-none border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden'>
        {/* Image at top (if available) */}
        {data.showImage && (
          <div className='relative aspect-video'>
            <Image
              src={data.image}
              alt={data.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            {/* Match Percentage Badge on Image */}
            {data.matchPercentage && (
              <div className='absolute top-4 right-4'>
                <Badge
                  className={`${
                    data.matchPercentage >= 90
                      ? 'bg-green-600'
                      : data.matchPercentage >= 75
                        ? 'bg-orange-600'
                        : 'bg-stone-600'
                  } text-white text-lg px-3 py-1.5 shadow-lg`}
                >
                  {data.matchPercentage}% Match
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <div className='flex flex-wrap gap-2 mb-3'>
                {data.cuisine && (
                  <Badge
                    variant='outline'
                    className='text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 capitalize'
                  >
                    {data.cuisine}
                  </Badge>
                )}
                {data.category && (
                  <Badge
                    variant='outline'
                    className='text-muted-foreground border-border capitalize'
                  >
                    {data.category}
                  </Badge>
                )}
              </div>
            </div>
            {/* Match Percentage Badge (if no image) */}
            {!data.showImage && data.matchPercentage && (
              <div className='flex flex-col items-end gap-1'>
                <Badge
                  className={`${
                    data.matchPercentage >= 90
                      ? 'bg-green-600'
                      : data.matchPercentage >= 75
                        ? 'bg-orange-600'
                        : 'bg-stone-600'
                  } text-white text-lg px-3 py-1`}
                >
                  {data.matchPercentage}%
                </Badge>
                <span className='text-xs text-muted-foreground'>Match</span>
              </div>
            )}
          </div>

          <CardTitle className='text-2xl font-serif font-bold text-foreground'>
            {data.title}
          </CardTitle>

          {data.description && (
            <CardDescription className='text-muted-foreground leading-relaxed mt-2'>
              {data.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className='space-y-4 flex-1'>
          {/* Time & Servings */}
          {(data.prepTime || data.cookTime || data.servings) && (
            <div className='flex gap-4 text-sm text-muted-foreground'>
              {(data.prepTime || data.cookTime) && (
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>
                    {parseInt(data.prepTime || 0) +
                      parseInt(data.cookTime || 0)}{' '}
                    mins
                  </span>
                </div>
              )}
              {data.servings && (
                <div className='flex items-center gap-1'>
                  <Users className='w-4 h-4' />
                  <span>{data.servings} servings</span>
                </div>
              )}
            </div>
          )}

          {/* Missing Ingredients */}
          {data.missingIngredients && data.missingIngredients.length > 0 && (
            <div className='p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30'>
              <h4 className='text-sm font-semibold text-orange-900 dark:text-orange-400 mb-2'>
                You&apos;ll need:
              </h4>
              <div className='flex flex-wrap gap-2'>
                {data.missingIngredients.map((ingredient, i) => (
                  <Badge
                    key={i}
                    variant='outline'
                    className='text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800 bg-white dark:bg-background'
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Link href={data.href} className='w-full'>
            <Button className='w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white gap-2'>
              <ChefHat className='w-4 h-4' />
              View Full Recipe
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  // Variant: list (for saved recipes, search results)
  if (variant === 'list') {
    return (
      <Link href={data.href}>
        <Card className='rounded-none border-border hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-800 transition-all cursor-pointer group overflow-hidden py-0'>
          <div className='flex flex-col md:flex-row'>
            {/* Image (if available) */}
            {data.showImage ? (
              <div className='relative w-full md:w-48 aspect-video md:aspect-square flex-shrink-0'>
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, 192px'
                />
              </div>
            ) : (
              // Fallback gradient when no image
              <div className='relative w-full md:w-48 aspect-video md:aspect-square flex-shrink-0 bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center'>
                <ChefHat className='w-12 h-12 text-white/30' />
              </div>
            )}

            {/* Content */}
            <div className='flex-1 py-5'>
              <CardHeader>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {data.cuisine && (
                    <Badge
                      variant='outline'
                      className='text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 capitalize'
                    >
                      {data.cuisine}
                    </Badge>
                  )}
                  {data.category && (
                    <Badge
                      variant='outline'
                      className='text-muted-foreground border-border capitalize'
                    >
                      {data.category}
                    </Badge>
                  )}
                </div>

                <CardTitle className='text-xl font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors'>
                  {data.title}
                </CardTitle>

                {data.description && (
                  <CardDescription className='line-clamp-2'>
                    {data.description}
                  </CardDescription>
                )}
              </CardHeader>

              {(data.prepTime || data.cookTime || data.servings) && (
                <CardContent>
                  <div className='flex gap-4 text-sm text-stone-500 pt-4'>
                    {(data.prepTime || data.cookTime) && (
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>
                          {parseInt(data.prepTime || 0) +
                            parseInt(data.cookTime || 0)}{' '}
                          mins
                        </span>
                      </div>
                    )}
                    {data.servings && (
                      <div className='flex items-center gap-1'>
                        <Users className='w-4 h-4' />
                        <span>{data.servings} servings</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Default variant (fallback)
  return (
    <Link href={data.href}>
      <Card className='rounded-none border-border hover:shadow-lg transition-all cursor-pointer overflow-hidden py-0'>
        {data.showImage && (
          <div className='relative aspect-video'>
            <Image
              src={data.image}
              alt={data.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 400px'
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className='text-lg'>{data.title}</CardTitle>
          {data.description && (
            <CardDescription className='line-clamp-2'>
              {data.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
