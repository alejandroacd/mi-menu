import ProfileRender from "../../components/profile/ProfileRender";
import { ConditionalWelcomeCard } from "../components/welcome-card/ConditionalWelcomeCard";
export default async function Profile () {
    return (
        <div className="p-3 lg:p-12 z-10 relative">
        <ConditionalWelcomeCard />
        <ProfileRender />
      </div>
    )
}