'use client'

import { Movie } from "@/typings";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import getImagePath from "@/lib/getImagePath";
import { Button } from "./ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";


Autoplay.globalOptions = {delay: 8000};
function CarouselsBanner({movies}: {movies: Movie[]}) {
   
  const [emblaRef] = useEmblaCarousel({ loop: false, duration: 100 }, [Autoplay()])
  return (
    <div 
      ref={emblaRef}
      className="overflow-hidden lg:-mt-40 relative"
    >
      <div className="flex">
        {movies.length >= 1 ? (
          movies.map(movie => (
            <div key={movie.id} className="flex-full min-w-0 relative z-20">
              <Image
                key={movie.id}
                src={getImagePath(movie.backdrop_path, true)}
                alt={movie.title}
                className="w-full"
                width={1920}
                height={1080}
              />
              <div className="hidden lg:inline absolute mt-0 top-0 pt-40 xl:pt-52 lg:mt-40 left-0 bg-transparent
              h-full w-full bg-gradient-to-r from-gray-900/90 to-transparent p-10 space-y-5 text-white">
                <h2 className="text-5xl font-bold max-w-xl z-50">{movie.title}</h2>
                <p className="max-w-xl line-clamp-3">{movie.overview}</p>
                <Button variant={'secondary'} className="z-50" onClick={() => console.log("Click")
                }>
                  <Link href={`/movie/${movie.id + '-' + movie.title.replaceAll(" ", "-")}`}>View More</Link>
                </Button>
              </div>
            </div>
          ))
        ): <div className="flex w-full min-w-40 relative z-20">
              <div className="flex-1 pt-40 xl:pt-52 min-h-screen lg:mt-40 z-50 space-y-5">
                <Skeleton className="h-10 w-2/5 mt-40" />
                <Skeleton className="h-40 w-3/5" />
                <Skeleton className="h-6 w-1/5" />
              </div>
          </div>}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]" />
    </div>
  )
}

export default CarouselsBanner;