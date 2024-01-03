
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const Navbar = () => {

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
                <Carousel className="w-full max-w-lg bg-red-500">
                    <CarouselContent className="">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </>
    )
}

export default Navbar






