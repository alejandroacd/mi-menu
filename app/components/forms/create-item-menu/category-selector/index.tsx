import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CategorySelectorProps = {
    categories: string[];
    value: string | undefined;
    onChange: (value: string) => void;
    loading: boolean
};

const CategorySelector = ({ categories, value, onChange, loading}: CategorySelectorProps) => {
    const [newCategory, setNewCategory] = useState("");
    const [isNewCategory, setIsNewCategory] = useState(false);

    const handleCategoryChange = (category: string) => {
        onChange(category);
        if (category === "new") {
            setIsNewCategory(true);
        } else {
            setIsNewCategory(false);
            setNewCategory("");  // Reset new category input if a predefined category is selected
        }
    };

    return (
        <div>
            {!isNewCategory && <Select disabled={loading} value={value} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category, index) => (
                        <SelectItem key={`category-${category}-${index}`} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                    <SelectItem key={`new-category-${newCategory + 1}`} value={`new`}>+ Nueva Categoría</SelectItem>
                </SelectContent>
            </Select>}

            {isNewCategory && (
                <div className="mt-2">
                    <Input
                        disabled={loading}
                        value={newCategory}
                        onChange={(e) => {
                            setNewCategory(e.target.value);
                            onChange(e.target.value);  // Update form value with the new category
                        }}
                        placeholder="Nombre de la nueva categoría"
                    />
                </div>
            )}
        </div>
    );
};

export default CategorySelector;
