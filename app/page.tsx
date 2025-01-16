import { Dots } from "./components/dots";
import AuthPage from "./components/login";

export default function Home() {
  return (
    <div className="relative h-screen flex justify-center items-center ">
      <Dots />
      <AuthPage />
    </div>
  );
}
