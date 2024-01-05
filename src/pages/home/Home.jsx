import { useSearch } from "@/context/SearchContext"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BsExplicit } from "react-icons/bs";
import Lottie from "lottie-react";
import SearchingAnimation from "@/assets/SearchingAnimation";

function Home() {
  const { searchResults, loading, error } = useSearch();
  console.log(searchResults)
  const { musicsResults, albumsResults, playlistsResults, artistsResults } = searchResults;
  if (error) {
    return toast.error('Something went wrong', {
      description: "Please try again later!",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  if (loading) {
    return <div className="w-1/2">
      <Lottie animationData={SearchingAnimation} loop={true} />
    </div>
  }
  return (
    <>
      {/* music part */}
      <h1 className="text-2xl font-bold text-center my-4">Related musics for your search</h1>
      <Carousel className="mx-4">
        <CarouselContent className="w-96">
          {musicsResults && musicsResults?.map((music) => (
            <CarouselItem key={music.youtubeId} className='basis-52 h-80'>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{music.title}</CardTitle>
                  <CardDescription>{music.isExplicit ? <BsExplicit /> : null}</CardDescription>
                </CardHeader>
                <CardContent className='px-4 flex justify-center'>
                  <img src={music.thumbnailUrl} alt={music.title} />
                </CardContent>
                {/* if needed */}
                <CardFooter>
                  <Popover>
                    <PopoverTrigger>
                      <Button>Artists</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      {music.artists.map((artist) => (
                        <div className="flex flex-wrap w-auto" key={artist.id} >
                          <Badge variant="outline" className="text-xs my-1">{artist.name}</Badge>
                        </div>
                      ))}</PopoverContent>
                  </Popover>
                  <Link to={{
                    pathname: `/music/${music.youtubeId}`,
                    search: `?title=${music.title}&thumbnailUrl=${encodeURIComponent(music.thumbnailUrl)}&artists=${JSON.stringify(music.artists)}`}} 
                    key={music.youtubeId}
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

      {/* album part */}
      <h1 className="text-2xl font-bold text-center my-4">Related albums for your search</h1>
      <Link to="/">
        <Carousel className="mx-4">
          <CarouselContent className="w-96">
            {albumsResults && albumsResults?.map((album) => (
              <CarouselItem key={album.albumId} className='basis-52'>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{album.title}</CardTitle>
                    <CardDescription>{album.isExplicit ? <BsExplicit /> : null}</CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex justify-center'>
                    <img src={album.thumbnailUrl} alt={album.title} />
                  </CardContent>
                  <CardDescription className='text-center pb-4'>{album.type} . {album.year}</CardDescription>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Link>

      {/* playlist part */}
      <h1 className="text-2xl font-bold text-center my-4">Related playlists for your search</h1>
      <Link to="/">
        <Carousel className="mx-4">
          <CarouselContent className="w-96">
            {playlistsResults && playlistsResults?.map((playlist) => (
              <CarouselItem key={playlist.playlistId} className='basis-52'>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{playlist.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 flex justify-center'>
                    <img src={playlist.thumbnailUrl} alt={playlist.title} className="object-contain w-36 h-36" />
                  </CardContent>
                  <CardDescription className='text-center pb-4'>Total Songs {playlist.totalSongs}</CardDescription>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Link>

      {/* artist part */}
      <h1 className="text-2xl font-bold text-center my-4">Related artists for your search</h1>
      <Link to="/">
        <Carousel className="mx-4">
          <CarouselContent className="w-96">
            {artistsResults && artistsResults?.map((artist) => (
              <CarouselItem key={artist.artistId} className='basis-52'>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{artist.name}</CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 flex justify-center'>
                    <img src={artist.thumbnailUrl} alt={artist.name} className="object-contain w-36 h-36" />
                  </CardContent>
                  <CardDescription className='text-center pb-4'> {artist.subscribers}</CardDescription>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Link>
    </>
  )
}

export default Home