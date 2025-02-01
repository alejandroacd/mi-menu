import { Button } from "@/components/ui/button"

interface CategoriesButtonsProps {
    categories: string[]
    selectedCategory: string | null
    setSelectedCategory: (category: string | null) => void
}
export const CategoriesButtons = ({categories, selectedCategory, setSelectedCategory}: CategoriesButtonsProps) => {
    return (
        <div className="flex space-x-2 mb-4">
              <div className='flex flex-row flex-1 flex-wrap gap-3 '>
            <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
            >
                Todos
            </Button>
            {categories.map((category, index) => (
                <Button
                    key={index}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>
      
    )
}