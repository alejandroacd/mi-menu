import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Menu, Star, Users } from "lucide-react"
export async function Actions() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle><span className="text-purple-600/50 font-bold">// </span>Acciones rápidas
          <span className="text-purple-600/50 font-bold"> _ </span></CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start" variant="outline">
          <Menu className="mr-2 h-4 w-4" /> Editar menú
        </Button>
        <Button disabled className="w-full justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" /> View Reservations
          <Badge variant="secondary" className="uppercase  text-[9px]">pronto</Badge>
        </Button>
        <Button disabled className="w-full  justify-start" variant="outline">
          <Star className="mr-2 h-4 w-4" /> Manage Reviews
          <Badge variant="secondary" className="uppercase  text-[9px]">pronto</Badge>
        </Button>
      </CardContent>
    </Card>
  )
}