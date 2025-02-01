import { ImageIcon } from "lucide-react"
import { uploadPhotoToCloudinary } from "@/utils/cloudinary"
import CategorySelector from "./category-selector"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SpinnerLoader } from "../../spinner-loader"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { menuItemSchema } from "./validators"
import { useState, useRef } from "react"
import { upsertMenuItemInRestaurant } from "./action"
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore"
import { Checkbox } from '@/components/ui/checkbox'
import { MenuItem } from "@/types"
import { toast } from "@/hooks/use-toast"
export const CreateMenuItem = ({ closeCreation, isEdit, activeItem }: { closeCreation: () => void, isEdit?: boolean, activeItem: MenuItem | null }) => {
    const [imagePreview, setImagePreview] = useState<File | null | string>(isEdit && activeItem ? activeItem.image : null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)
    const categories = useActiveRestaurantStore(state => state.categories)
    const [loading, setLoading] = useState(false)
    const setActiveRestaurant = useActiveRestaurantStore(state => state.setActiveRestaurant)
    const form = useForm<z.infer<typeof menuItemSchema>>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: isEdit ? activeItem?.name : "",
            description: isEdit ? activeItem?.description : "",
            price: isEdit ? activeItem?.price : 0,
            image: isEdit ? activeItem?.image : "",
            category: isEdit ? activeItem?.category : "",
            restrictions: isEdit ? activeItem?.restrictions : [],
        },
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImagePreview(file)
        }
        else {
            setImagePreview(null)
        }
    }

    const createMenuItem = async ({ form, setLoading }: { form: any, setLoading: (loading: boolean) => void }) => {
        const menuItemData = {
            ...form.getValues(),
            ...(isEdit && activeItem && { id: activeItem.id })
        }
        try {
            const insertion = await upsertMenuItemInRestaurant(activeRestaurant?.id, menuItemData, activeRestaurant?.menu_items ?? [], isEdit ? 'edit' : 'add')
            if (insertion && insertion.data) {
                toast({
                    title: `Tu producto se ${isEdit ? 'actualizó' : 'creó'} con exito!`,
                    description: `Felicidades! :)`
                })
                setActiveRestaurant(insertion.data[0])
                closeCreation()
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const handleSubmitMenuItem = async () => {
        setLoading(true);
        if (!isEdit || (isEdit && typeof imagePreview === "object")) {
            if (imagePreview) {
                try {
                    const response = await uploadPhotoToCloudinary(imagePreview as File);
                    if (response) {
                        form.setValue("image", response);
                    }
                } catch (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                }
            }
        }
        await createMenuItem({ form, setLoading });
    };

    const restrictionOptions = [
        { value: "Sin TACC", label: "Sin TACC" },
        { value: "Vegetarian", label: "Vegetariano" },
        { value: "Vegan", label: "Vegano" },
    ]

    const formatPrice = (price: number) => {
        if (!price) return "";
        const formattedPrice = price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });

        form.setValue("price", Number(formattedPrice.replace(/[^0-9.-]+/g, "")));
    }
    return (
        <Card className={`fade-in overflow-y-auto ${isEdit ? 'border-none' : ''}`}>
            {!isEdit && <CardHeader>
                <CardTitle className="text-1xl md:text-2xl">Añadí información de tu producto</CardTitle>
                <CardDescription>Introducí los detalles del nuevo producto que van a ser vistos por tus clientes</CardDescription>
            </CardHeader>}
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmitMenuItem)}>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="lg:mb-0 flex justify-center flex-col lg:block">
                                    <FormLabel className="text-center font-bold text-md">Imagen del producto</FormLabel>
                                    <FormControl>
                                        <div className="flex md:items-center  flex-col gap-5 lg:flex-row space-x-2">
                                            <div
                                                className="w-32 h-32 border-2 mx-auto lg:mx-0 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                {imagePreview ? (
                                                    <img
                                                        src={typeof imagePreview === "string" ? imagePreview : URL.createObjectURL(imagePreview)}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                                Seleccionar Imagen
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Haz clic para seleccionar una imagen del producto.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            disabled={loading}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">Nombre del producto</FormLabel>
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
                            disabled={loading}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">Descripción</FormLabel>
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
                            disabled={loading}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">Precio</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="$1.200"
                                            value={
                                                field.value !== undefined
                                                    ? new Intl.NumberFormat('es-AR', {
                                                        style: 'currency',
                                                        currency: 'ARS',
                                                        minimumFractionDigits: 0,
                                                    }).format(field.value)
                                                    : ''
                                            }
                                            onChange={(e) => {
                                                // Remove non-numeric characters except for digits
                                                const rawValue = e.target.value.replace(/\D/g, '');
                                                const numericValue = parseFloat(rawValue) || 0;
                                                // Update the form value with the raw numeric value
                                                field.onChange(numericValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            disabled={loading}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">Categoría</FormLabel>
                                    <CategorySelector
                                        categories={categories}
                                        value={field.value}
                                        loading={loading}
                                        onChange={field.onChange}  // Updating form value directly
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            disabled={loading}
                            name="restrictions"
                            render={({ field }) => (
                                <FormItem className="py-05 mx-2">
                                    <div className="my-6">
                                        <FormLabel className="text-md font-bold">Restricciones Dietéticas</FormLabel>
                                        <FormDescription>Selecciona todas las que apliquen.</FormDescription>
                                    </div>
                                    {restrictionOptions.map((item) => (
                                        <FormField
                                            key={item.value}
                                            control={form.control}
                                            name="restrictions"
                                            render={({ field: innerField }) => {
                                                return (
                                                    <FormItem key={item.value} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.value)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? innerField.onChange([...(innerField.value || []), item.value])
                                                                        : innerField.onChange(
                                                                            innerField.value?.filter((value) => value !== item.value),
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex  pt-12 justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={closeCreation}>Cancelar</Button>
                            {!loading && <Button disabled={loading} type="submit">Guardar</Button>}
                            {loading && <SpinnerLoader />}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}