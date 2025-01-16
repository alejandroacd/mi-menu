import { useState } from 'react'
import { Plus, X, Edit, Heart, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  likes: number
  category: string
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  price: z.number().min(0, {
    message: "El precio no puede ser negativo.",
  }),
  image: z.string().url({
    message: "Por favor, introduce una URL válida para la imagen.",
  }),
  category: z.string().min(1, {
    message: "Por favor, selecciona una categoría.",
  }),
})

export function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Paella Valenciana',
      description: 'Auténtica paella con pollo, conejo y verduras',
      price: 18.99,
      image: '/placeholder.svg?height=100&width=100',
      likes: 42,
      category: 'Platos Principales',
    },
    {
      id: '2',
      name: 'Gazpacho',
      description: 'Sopa fría de tomate y verduras',
      price: 7.99,
      image: '/placeholder.svg?height=100&width=100',
      likes: 28,
      category: 'Entrantes',
    },
  ])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState("")
  const [categories, setCategories] = useState<string[]>(Array.from(new Set(menuItems.map(item => item.category))))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalCategory = values.category === "new" ? newCategory : values.category;
    const newItem: MenuItem = {
      id: Date.now().toString(),
      ...values,
      category: finalCategory,
      likes: 0,
    }
    setMenuItems([...menuItems, newItem])
    if (values.category === "new" && newCategory.trim()) {
      setCategories([...categories, newCategory.trim()])
    }
    setIsFormOpen(false)
    form.reset()
    setNewCategory("")
  }

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menú del Restaurante</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Plato
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Añadir Nuevo Plato</CardTitle>
            <CardDescription>Introduce los detalles del nuevo plato</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagen del Plato</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                          <Button type="button" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Introduce la URL de la imagen o sube una nueva.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Plato</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Paella Valenciana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe el plato..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          if (value === "new") {
                            setNewCategory("")
                          }
                          field.onChange(value)
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">+ Nueva Categoría</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.value === "new" && (
                        <div className="mt-2">
                          <Input
                            placeholder="Nombre de la nueva categoría"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
                  <Button type="submit">Guardar Plato</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
              <CardTitle className="mt-2">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <Button size="icon" variant="outline" className="absolute top-2 right-2">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.price.toFixed(2)} €</p>
              <Badge>{item.category}</Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>{item.likes}</span>
              </Button>
              <Button variant="destructive" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
