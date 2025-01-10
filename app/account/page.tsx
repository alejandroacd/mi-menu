import { createClient } from "@/utils/supabase/server"
import { ProfileCompletionForm } from "../components/profile"
const Account = async  () => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    return (
        <div className="min-h-screen  mt-24">
        <h1>hola, {data.user?.email}</h1>
        <ProfileCompletionForm />
        </div>
    )
}

export default Account