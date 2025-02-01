export interface UserSession  {
    id?: string,
    email: string | null |  undefined;
    name: string | null | undefined;
    avatar?: string | null | undefined;
    plan?: string;
    lastName: string;
    isVerified: boolean;
}

export interface MenuItem {
    id?: string
    name: string
    description: string
    price: number
    image: string
    likes: number
    category: string
    restrictions: string[]
}

export interface Restaurant {
    id: string;
    name: string;
    avatar?: string | undefined;
    description: string;
    openHours?: {
        day: string | undefined | string;
        isOpen: boolean | undefined | string;
        openTime: string | undefined | string;
        closeTime: string | undefined | string;
    }[];
    open_hours?: {
        day: string | undefined | string;
        isOpen: boolean | undefined | string;
        openTime: string | undefined | string;
        closeTime: string | undefined | string;
    }[];
    address: string;
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
    twitter: string;
    url: string
    user_id: string
    menu_items: MenuItem[]
}