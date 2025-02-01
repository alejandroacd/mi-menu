'use client'
import MenuList from './menu-list'
import { useState, useEffect, useMemo } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateMenuItem } from '../forms/create-item-menu'
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
import { CategoriesButtons } from './categories-buttons'
export default function RestaurantMenu() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = useActiveRestaurantStore(state => state.categories)
  const menuItems = useActiveRestaurantStore(state => state.menuItems)
  const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)
  const groupedItems = useMemo(() => {
    if (selectedCategory) {
      return { [selectedCategory]: menuItems?.filter((item) => item.category === selectedCategory) }
    }
    return menuItems?.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
      },
      {} as any,
    )
  }, [menuItems, selectedCategory, activeRestaurant])

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center gap-3">
        {isFormOpen && <ArrowLeft onClick={() => setIsFormOpen(false)} className="hover:bg-slate-300/40 cursor-pointer p-2 w-10 h-10 rounded-full" />
        }
        <h1 className="text-3xl mx-3 my-3 md:text-4xl font-bold tracking-tight"><span className="text-purple-500/50"> //</span> {isFormOpen ? "Crear item" : "Menú"}</h1>
      </div>
      {!isFormOpen && <div className="flex justify-between items-center">

        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Añadir item
        </Button>
      </div>}

      {isFormOpen &&
        <CreateMenuItem
          isEdit={false}
          activeItem={null}
          closeCreation={() => setIsFormOpen(false)} />}

      {!isFormOpen &&
        <CategoriesButtons
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} />}
      {!isFormOpen && <MenuList groupedItems={groupedItems} />}
    </div>
  )
}
