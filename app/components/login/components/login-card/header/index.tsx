import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface LoginCardHeaderProps {
    title: string
    description: string
}
export const LoginCardHeader = ({ title, description }: LoginCardHeaderProps) => {
    return (
        <CardHeader className="space-y-1 w-full max-w-md">
        <CardTitle className="text-2xl font-bold text-center">
            {title}
        </CardTitle>
        <CardDescription className="text-center">
            {description}
        </CardDescription>
    </CardHeader>
    )
}