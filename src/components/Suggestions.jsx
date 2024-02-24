/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { BsFillExplicitFill } from "react-icons/bs";
import Image from "./Image";

const Suggestions = ({ youtubeId }) => {
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            let url = `https://yt-music-api-zeta.vercel.app/suggestions/${youtubeId}`
            const response = await fetch(url);
            const results = await response.json();
            setSuggestions(results)
            setLoading(true)
            console.log(results)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-center my-4">Recommended for you</h1>
            <Carousel className="mx-4">
                <CarouselContent className="w-96">
                    {suggestions && suggestions?.map((suggestion) => (
                        <CarouselItem key={suggestion.youtubeId} className='basis-52 h-80'>
                            <Card>
                                <CardHeader className='flex items-center flex-row'>
                                    <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{suggestion.title}</CardTitle>
                                    <CardDescription>{suggestion.isExplicit ? <BsFillExplicitFill color="white" className="mx-1" /> : null}</CardDescription>
                                </CardHeader>
                                <CardContent className='px-4 flex justify-center'>
                                <Image src={suggestion.thumbnailUrl} alt={suggestion.title}/>
                                </CardContent>
                                {/* if needed */}
                                <CardFooter>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button>Artists</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {suggestion.artists.map((artist) => (
                                                <div className="flex flex-wrap w-auto" key={artist.id} >
                                                    <Badge variant="outline" className="text-xs my-1">{artist.name}</Badge>
                                                </div>
                                            ))}</PopoverContent>
                                    </Popover>
                                    <Link to={{
                                        pathname: `/music/${suggestion.youtubeId}/video`,
                                        search: `?title=${suggestion.title}&thumbnailUrl=${encodeURIComponent(suggestion.thumbnailUrl)}&artists=${JSON.stringify(suggestion.artists)}`
                                    }}
                                        key={suggestion.youtubeId}
                                        className="px-2 hover:underline active:underline"
                                    >
                                        Listen
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    )
}

export default Suggestions