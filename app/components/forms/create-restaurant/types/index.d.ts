import { Restaurant } from "@/types"
interface CreateRestaurantFormProps {
    formValues: Restaurant;
    setLoading: (loading: boolean) => void;
    setServerError: (serverError: string | null) => void;
}