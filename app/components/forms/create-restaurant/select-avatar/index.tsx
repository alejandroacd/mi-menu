'use client'
import { useRef } from 'react'
import { Camera, X } from 'lucide-react'
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
interface SelectRestaurantAvatarProps {
    avatar: File | null | string | undefined
    handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    removeAvatar: () => void
    isEdit?: boolean
}
export const SelectRestaurantAvatar = ({ avatar, handleAvatarChange, removeAvatar, isEdit}: SelectRestaurantAvatarProps) => {
    const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant) 
    const fileInputRef = useRef<HTMLInputElement>(null)
    return (
        <div className="flex flex-col items-center justify-center" >
            <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-primary">
                    {avatar || isEdit ? (
                        <img src={isEdit && !avatar ? activeRestaurant?.avatar : URL.createObjectURL(avatar as File)} alt="Restaurant avatar" className="w-full h-full object-cover" />
                    ) : (
                        <Camera className="w-12 h-12 text-gray-400" />
                    )}
                </div>
                <input
                    type="file"
                    id="avatar"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    name='avatar'
                    onChange={(event) => handleAvatarChange(event)}
                />

                {/* icon of the select photo*/}
                <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                    <Camera className="w-4 h-4" />
                </label>

                { /* remove avatar */}
                {avatar && (
                    <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 cursor-pointer hover:bg-destructive/90 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            {/* label of te input*/}
            <p className="mt-2 text-sm text-muted-foreground">Elegí una foto para tu negocio</p>
        </div >
    )
}