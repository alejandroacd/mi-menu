import ProfileRender from "../components/profile/ProfileRender";
import { ConditionalWelcomeCard } from "./components/welcome-card/ConditionalWelcomeCard";
export default function Dashboard() {
  return (
    <div className="p-5 lg:p-12 z-10 relative">
      <ConditionalWelcomeCard />
      <ProfileRender />
    </div>
  );
}