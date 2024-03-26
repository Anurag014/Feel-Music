import { useSearch } from "@/context/SearchContext"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BsFillExplicitFill } from "react-icons/bs";
import Image from "@/components/Image";
import React, { useState, useEffect } from 'react';
import { useControl } from "@/context/ControlContext";
import { usePalette } from 'react-palette';
import MusicList from "@/components/MusicList";
import PlayList from "@/components/PlayList";

function Home() {

  const [data, setData] = useState([]);
  const { searchResults, loading, error } = useSearch();
  const { musicsResults, albumsResults, playlistsResults, artistsResults } = searchResults;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yt-music-api-zeta.vercel.app/home');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchResults]);

  if (error) {
    return toast.error('Something went wrong', {
      description: "Please try again later!",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  if (searchResults.length === 0) {
    console.log('search something')
    return (

      <div className="w-full">
        <ul>
          {data.map((category, index) => (
            <li key={index}>
              {category.contents[0].type == "PLAYLIST" ? <PlayList playLists={category}/> : <MusicList musicList={category} />}
            </li>
          ))}
        </ul>
      </div>
      
      // <MusicList musicList={data[0]} />

      // <div className="bg-red-200 w-full">
      //   <h1>Music Categories</h1>
      //   <ul>
      //     {data.map((category, index) => (
      //       <li key={index}>
      //         <h2>{category.title}</h2>
      //         <ul>
      //           {category.contents.map((content, i) => (
      //             <li key={i}>{content.name}</li>
      //           ))}
      //         </ul>
      //       </li>
      //     ))}
      //   </ul>
      // </div>
    )
  } else {
    const headerText = ['Related musics for your search', 'Related albums for your search', 'Playlists you might like', 'Similar artists']
    const headerTextStyle = 'text-2xl font-bold text-center my-4'
    return (
      <>
        {/* music part */}
        <h1 className={headerTextStyle} dangerouslySetInnerHTML={{ __html: headerText[0] }}></h1>
        <Carousel className="mx-4">
          <CarouselContent className="w-96">
            {musicsResults && musicsResults?.map((music) => (
              <CarouselItem key={music.youtubeId} className='basis-52'>
                <Card>
                  <CardHeader className='flex items-center flex-row'>
                    <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{music.title}</CardTitle>
                    <CardDescription>{music.isExplicit ? <BsFillExplicitFill color="white" className="mx-1" /> : null}</CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex justify-center'>
                    <Image src={music.thumbnailUrl} alt={music.title} />
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
                      pathname: `/music/${music.youtubeId}/video`,
                      search: `?title=${music.title}&thumbnailUrl=${encodeURIComponent(music.thumbnailUrl)}&artists=${JSON.stringify(music.artists)}`
                    }}
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
        <h1 className={headerTextStyle} dangerouslySetInnerHTML={{ __html: headerText[1] }}></h1>
        <Link to="/">
          <Carousel className="mx-4">
            <CarouselContent className="w-96">
              {albumsResults && albumsResults?.map((album) => (
                <CarouselItem key={album.albumId} className='basis-52'>
                  <Card>
                    <CardHeader className='flex items-center flex-row'>
                      <CardTitle className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{album.title}</CardTitle>
                      <CardDescription>{album.isExplicit ? <BsFillExplicitFill color="white" className="mx-1" /> : null}</CardDescription>
                    </CardHeader>
                    <CardContent className='px-4 flex justify-center'>
                      <Image src={album.thumbnailUrl} alt={album.title} />
                    </CardContent>
                    <CardDescription className='text-center text-xs pb-4 font-semibold'>{album.type} . {album.year}</CardDescription>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Link>

        {/* playlist part */}
        <h1 className={headerTextStyle} dangerouslySetInnerHTML={{ __html: headerText[2] }}></h1>
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
                      <Image src={playlist.thumbnailUrl} alt={playlist.title} />
                    </CardContent>
                    <CardDescription className='text-center text-xs pb-4 font-semibold'>Total Songs {playlist.totalSongs}</CardDescription>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Link>

        {/* artist part */}
        <h1 className={headerTextStyle} dangerouslySetInnerHTML={{ __html: headerText[3] }}></h1>
        <Link to="/">
          <Carousel className="mx-4">
            <CarouselContent className="w-96">
              {artistsResults && artistsResults?.map((artist) => (
                <CarouselItem key={artist.artistId} className='basis-52'>
                  <Card className='border-0'>
                    <CardContent className='px-4 flex justify-center'>
                      <Image src={artist.thumbnailUrl} alt={artist.name} className='rounded-full' />
                    </CardContent>
                    <CardHeader className='py-0'>
                      <CardTitle className="text-xs text-center overflow-ellipsis overflow-hidden whitespace-nowrap w-36">{artist.name}</CardTitle>
                    </CardHeader>
                    <CardDescription className='text-center text-xs pb-4 font-semibold'> {artist.subscribers}</CardDescription>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Link>
      </>
    );
  }
  console.log(searchResults)
}

export default Home