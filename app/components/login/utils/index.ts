import { submitForm } from "../action"
import { AuthForm } from "../types"

export const onSubmit = async (form: AuthForm, isLogin: boolean, router: any, setLoading: any, setServerError: any) => {
    setLoading(true)
    setServerError(null)

    try {
        const response = await submitForm(form, isLogin)
        if (response.error) {
            setServerError(response.message)
        } else {
            if (isLogin) router.push('/dashboard')
            else router.push('/confirm')
        }
    }
    catch (error) {
        console.error('Error submitting form:', error)
    }
    finally {
        setLoading(false)
    }
}

