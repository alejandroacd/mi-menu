import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PieChartPage from "@/app/components/charts/pie-chart";
import { BarChartLines } from "@/app/components/charts/pie-chart/bar-chart-lines";
import { Badge } from "@/components/ui/badge";

export default function Metrics() {
    return (
        <section className="flex flex-col ">

            <Card className="lg:w-full border-none  flex lg:flex-col  relative  flex-col ">
                <CardHeader className="px-3 py-3">
                <CardTitle className="text-2xl">
                    <span className="font-bold text-purple-600/50">
                //
                    </span> Metricas <Badge variant="secondary" className="uppercase">pronto</Badge></CardTitle>
                </CardHeader>
                <section className="flex flex-col md:flex-row w-full">
                    <div className="lg:w-[70%]">
                        <BarChartLines />
                    </div>
                    <div className="lg:w-[30%] h-full">
                        <PieChartPage title="Metrics" description="Restaurant" />
                    </div>
                </section>
            </Card>
        </section>
    )
}