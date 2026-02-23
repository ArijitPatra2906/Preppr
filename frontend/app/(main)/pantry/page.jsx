/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChefHat,
  Loader2,
  Package,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import {
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from '@/actions/pantry.actions'
import { toast } from 'sonner'
import AddToPantryModal from '@/components/AddToPantryModal'
import PricingModal from '@/components/PricingModal'

export default function PantryPage() {
  const [items, setItems] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ name: '', quantity: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch pantry items
  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems)

  // Delete item
  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItem)

  // Update item
  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItem)

  // Load items on mount
  useEffect(() => {
    fetchItems()
  }, [])

  // Update items when data arrives
  useEffect(() => {
    if (itemsData?.success) {
      setItems(itemsData.items)
    }
  }, [itemsData])

  // Refresh after delete
  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success('Item removed from pantry')
      fetchItems()
    }
  }, [deleteData])

  // Refresh after update
  useEffect(() => {
    if (updateData?.success) {
      toast.success('Item updated successfully')
      setEditingId(null)
      fetchItems()
    }
  }, [updateData])

  // Handle delete
  const handleDelete = async (itemId) => {
    const formData = new FormData()
    formData.append('itemId', itemId)
    await deleteItem(formData)
  }

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.documentId)
    setEditValues({
      name: item.name,
      quantity: item.quantity,
    })
  }

  // Save edit
  const saveEdit = async () => {
    const formData = new FormData()
    formData.append('itemId', editingId)
    formData.append('name', editValues.name)
    formData.append('quantity', editValues.quantity)
    await updateItem(formData)
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null)
    setEditValues({ name: '', quantity: '' })
  }

  // Handle modal success (refresh items)
  const handleModalSuccess = () => {
    fetchItems()
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-orange-50/20 dark:via-orange-950/10 to-background pt-20 pb-16'>
      <div className='container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12'>
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8'>
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4'>
                <Package className='w-4 h-4 text-orange-600 dark:text-orange-400' />
                <span className='text-sm font-semibold text-orange-700 dark:text-orange-400 uppercase tracking-wide'>
                  Your Kitchen Inventory
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-none mb-3'>
                My Pantry
              </h1>

              <p className='text-lg text-muted-foreground'>
                Manage your ingredients and discover amazing recipes
              </p>
            </div>

            {/* Add to Pantry Button - Desktop */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className='hidden md:flex bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white gap-2'
              size='lg'
            >
              <Plus className='w-5 h-5' />
              Add to Pantry
            </Button>
          </div>

          {/* Add to Pantry Button - Mobile */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className='md:hidden w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white gap-2 mb-4'
            size='lg'
          >
            <Plus className='w-5 h-5' />
            Add to Pantry
          </Button>

          {/* Usage Stats */}
          {itemsData?.scansLimit !== undefined && (
            <div className='inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg shadow-sm'>
              <Sparkles className='w-5 h-5 text-orange-600' />
              <div className='text-sm'>
                {itemsData.scansLimit === 'unlimited' ? (
                  <>
                    <span className='font-bold text-green-600 text-lg'>∞</span>
                    <span className='text-muted-foreground ml-1'>
                      Unlimited AI scans
                    </span>
                    <span className='ml-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full'>
                      PRO
                    </span>
                  </>
                ) : (
                  <PricingModal>
                    <span className='text-muted-foreground cursor-pointer hover:text-orange-600 transition-colors'>
                      Upgrade to Pro for unlimited Pantry scans →
                    </span>
                  </PricingModal>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Card - Find Recipes */}
        {items.length > 0 && (
          <Link href='/pantry/recipes' className='block mb-12'>
            <div className='relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-green-700'>
              {/* Decorative Elements */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-card/5 rounded-full -mr-32 -mt-32' />
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24' />

              <div className='relative flex items-center gap-6'>
                <div className='p-4 bg-card/20 backdrop-blur-sm rounded-xl group-hover:bg-card/30 group-hover:scale-110 transition-all duration-300 border border-white/30'>
                  <ChefHat className='w-10 h-10' />
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Sparkles className='w-5 h-5' />
                    <span className='text-sm font-semibold uppercase tracking-wide text-green-100'>
                      AI-Powered
                    </span>
                  </div>
                  <h3 className='font-bold text-2xl lg:text-3xl mb-2'>
                    What Can I Cook Today?
                  </h3>
                  <p className='text-green-100 text-base'>
                    Get personalized recipe suggestions from your {items.length}{' '}
                    {items.length === 1 ? 'ingredient' : 'ingredients'}
                  </p>
                </div>
                <div className='hidden sm:flex items-center gap-3'>
                  <div className='text-right'>
                    <div className='text-4xl font-bold'>{items.length}</div>
                    <div className='text-sm text-green-100 uppercase tracking-wide'>
                      {items.length === 1 ? 'Item' : 'Items'}
                    </div>
                  </div>
                  <div className='text-white/50 group-hover:translate-x-2 transition-transform'>
                    →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loadingItems && (
          <div className='flex flex-col items-center justify-center py-32'>
            <div className='relative'>
              <Loader2 className='w-12 h-12 text-orange-600 animate-spin' />
              <div className='absolute inset-0 w-12 h-12 rounded-full bg-orange-200/30 animate-ping' />
            </div>
            <p className='text-muted-foreground font-medium mt-6'>
              Loading your pantry...
            </p>
            <p className='text-stone-400 text-sm mt-1'>
              This will only take a moment
            </p>
          </div>
        )}

        {/* Pantry Items Grid */}
        {!loadingItems && items.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-3xl font-bold text-foreground'>
                Your Ingredients
              </h2>
              <div className='flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm'>
                <Package className='w-4 h-4 text-orange-600' />
                <span className='font-bold text-foreground'>{items.length}</span>
                <span className='text-muted-foreground text-sm'>
                  {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {items.map((item) => (
                <div
                  key={item.documentId}
                  className='group bg-card p-5 rounded-lg border border-border hover:shadow-md transition-all duration-200'
                >
                  {editingId === item.documentId ? (
                    // Edit Mode
                    <div className='space-y-3'>
                      <input
                        type='text'
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm'
                        placeholder='Ingredient name'
                      />
                      <input
                        type='text'
                        value={editValues.quantity}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            quantity: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm'
                        placeholder='Quantity'
                      />
                      <div className='flex gap-2 pt-1'>
                        <Button
                          size='sm'
                          onClick={saveEdit}
                          disabled={updating}
                          className='flex-1 bg-green-600 hover:bg-green-700'
                        >
                          {updating ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                          ) : (
                            <>
                              <Check className='w-4 h-4 mr-1' />
                              Save
                            </>
                          )}
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={cancelEdit}
                          disabled={updating}
                          className='flex-1'
                        >
                          <X className='w-4 h-4 mr-1' />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className='mb-4'>
                        <h3 className='font-semibold text-lg text-foreground mb-2'>
                          {item.name}
                        </h3>
                        <p className='text-muted-foreground text-sm'>
                          {item.quantity}
                        </p>
                      </div>

                      <div className='flex items-center justify-between pt-3 border-t border-stone-100'>
                        <span className='text-xs text-stone-400'>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <div className='flex gap-1'>
                          <button
                            onClick={() => startEdit(item)}
                            className='p-1.5 hover:bg-orange-50 rounded transition-colors text-stone-500 hover:text-orange-600'
                            aria-label='Edit item'
                          >
                            <Edit2 className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() => handleDelete(item.documentId)}
                            disabled={deleting}
                            className='p-1.5 hover:bg-red-50 rounded transition-colors text-stone-500 hover:text-red-600'
                            aria-label='Delete item'
                          >
                            {deleting ? (
                              <Loader2 className='w-4 h-4 animate-spin' />
                            ) : (
                              <Trash2 className='w-4 h-4' />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingItems && items.length === 0 && (
          <div className='text-center py-32'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6'>
              <Package className='w-12 h-12 text-orange-600 dark:text-orange-400' />
            </div>
            <h3 className='text-3xl font-bold text-foreground mb-3'>
              Your Pantry is Empty
            </h3>
            <p className='text-muted-foreground text-lg mb-8 max-w-lg mx-auto'>
              Start by scanning your pantry with AI or adding ingredients
              manually to discover amazing recipes!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className='bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white gap-2 px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-xl transition-all'
            >
              <Plus className='w-5 h-5' />
              Add Your First Item
            </Button>
          </div>
        )}
      </div>

      {/* Add to Pantry Modal */}
      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  )
}
