import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export default  function ProfileInfo ({restaurant}: {restaurant: Restaurant}) {
    console.log(restaurant)
    return (
        <Card>
      
        <CardContent className="grid gap-4 my-5">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 opacity-70" /> 
            <span>{restaurant.address ?? "-"}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 opacity-70" /> 
            <span>{restaurant.phone ?? '-'}</span>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 opacity-70" /> 
            <span>{restaurant.email ?? '-'}</span>
          </div>
          <div className="flex flex-row items-center">
            {restaurant.instagram && <Link href={`https://www.instagram.com${restaurant.instagram}`} target="_blank">
            <Instagram className="mr-2 h-4 w-4 opacity-70" />
            </Link>}
            <span>{restaurant.instagram ?? '-'}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-70" /> Horario
            </h3>
            <ul className="grid grid-cols-1  my-5 gap-3">
              {restaurant?.open_hours?.map((day) => (
                <li key={day.day} className="flex items-center  lg:w-1/2 justify-between">
                  <span className="text-sm">{day.day}</span>
                  {day.isOpen ? (
                    <Badge variant="outline" className="ml-2">
                      {day.openTime} - {day.closeTime}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-2">Cerrado</Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    )
}