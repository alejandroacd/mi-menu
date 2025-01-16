export interface UserSession  {
    id?: string,
    email: string | null |  undefined;
    name: string | null | undefined;
    avatar?: string | null | undefined;
    plan?: string;
    lastName: string;
    isVerified: boolean;
}

export interface Restaurant {
    id: string;
    name: string;
    avatar?: string 
    description: string;
    openHours?: {
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
}