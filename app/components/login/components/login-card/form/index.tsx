'use client'
import { CardContent } from "@/components/ui/card"
import { authFormSchema } from "../../../validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthForm } from "../../../types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { onSubmit } from "../../../utils"
import { handleGoogleAuth } from "../../../action"
import { useRouter } from "next/navigation"
import { SpinnerLoader } from "@/app/components/spinner-loader"
interface FormProps {
    isLogin: boolean
    email: string
    password: string
    name: string
    lastName: string
    serverError: string | null
    loading: boolean
    setLoading: (loading: boolean) => void
    setServerError: (serverError: string | null) => void
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setName: (name: string) => void
    setLastName: (lastName: string) => void
}
export  function Form({ isLogin, email, password, name, lastName, serverError, loading, setLoading, setServerError, setName, setLastName, setEmail, setPassword}: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthForm>({
        resolver: zodResolver(authFormSchema),
    })
    const router = useRouter()
    return (
        <CardContent className="space-y-4">
            <form onSubmit={handleSubmit((form) => onSubmit(form, isLogin, router, setLoading, setServerError))}>
                {!isLogin && (
                    <>
                        <div className="space-y-2 mb-5">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Juan"
                                required={!isLogin}
                                value={name}
                                {...register('name')}
                                onChange={(e) => {
                                    setServerError(null)
                                    setName(e.target.value)
                                }}
                            />
                        </div>
                        <div className="space-y-2 mb-5">
                            <Label htmlFor="name">Apellido</Label>
                            <Input
                                id="lastname"
                                type="text"
                                placeholder="Ramírez"
                                {...register('lastName')}
                                required={!isLogin}
                                value={lastName}
                                onChange={(e) => {
                                    setServerError(null)
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>
                    </>

                )}
                <div className="space-y-2 mb-5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...register('email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        {...register('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                </div>
                {!loading && <Button type="submit" className="w-full mt-4">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>}
                {loading && <div className='my-5 flex justify-center'>
                    <SpinnerLoader />
                </div>}

            </form>

            <Button variant="outline" type='button' className="w-full" onClick={() => handleGoogleAuth()} >
                {isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {isLogin ? 'Ingresar con Google' : 'Registrate con Google'}
            </Button>
        </CardContent>
    )
}