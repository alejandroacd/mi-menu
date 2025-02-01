import { SpinnerLoader } from "../components/spinner-loader";
import dynamic from "next/dynamic";
import {
  Utensils,
  Menu,
  ArrowRight
}
  from "lucide-react"
import { Card } from "@/components/ui/card";
import WelcomeCard from "./components/welcome-card";
import RestaurantsLists from "./components/restaurants-lists";
import { GeneralInfo } from "./components/general-info";
const Metrics = dynamic(() => import("./components/metrics"))
import { Actions } from "./components/actions";
import { Suspense } from "react";
export default async function Dashboard() {
  const steps = [
    { icon: <Utensils className="w-5 h-5" />, text: "Set up your restaurant profile" },
    { icon: <Menu className="w-5 h-5" />, text: "Create your menu" },
    { icon: <ArrowRight className="w-5 h-5" />, text: "Share your digital presence" },
  ]



  return (
    <div className="xl:p-8 lg:mx-3  p-3 flex flex-col lg:flex-col gap-3 z-10 relative">
      {/* first row */}
      <div className="flex flex-col xl:flex-row gap-3 ">
        <WelcomeCard />
        <section className="w-full flex flex-col">
          <Card className="bg-transparent shadow-none border-none  border-0 ">
              <div className="grid  md:grid-cols-2 gap-3">
                <RestaurantsLists />
                <div className="gap-0 flex flex-col md:space-y-3">
                 <GeneralInfo />
                 <Actions />
                </div>
              </div>
          </Card>
        </section>
      </div>
      {/* second row */}
      <Suspense 
      fallback={<div className="flex justify-center my-12 items-center"><SpinnerLoader /></div>}>
      <Metrics />
      </Suspense>
    </div >
  );
}