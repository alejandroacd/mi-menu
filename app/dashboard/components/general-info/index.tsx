import { Menu, Star, Users, DollarSign, CalendarDaysIcon} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
export async function GeneralInfo() {
  const metrics = [
    { icon: <CalendarDaysIcon className="w-6 h-6" />, label: "Reservas", value: "0" },
    { icon: <Users className="w-6 h-6" />, label: "Visitas", value: "1,234" },
    { icon: <Star className="w-6 h-6" />, label: "Rating", value: "4.5" },
    { icon: <Menu className="w-6 h-6" />, label: "Items", value: "42" },
  ]
  return (
    <Card className="shadow-xl">
      <CardHeader className="p-3">
        <CardTitle className="text-2xl"><span className="text-purple-600/50 font-bold">//</span> Información general</CardTitle>
        <CardDescription> Nola</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-wrap ">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <div>
                  <p className="text-sm font-medium">{metric.label}</p>
                  <p className="lg:text-1xl font-bold">{metric.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}