'use client'

import getImagePath from "@/lib/getImagePath";
import { TVShow } from "@/types/TVType";
import Image from "next/image";
import Link from "next/link";


const TvCard = ({movie, className}: {movie: TVShow, className?: string}) => {

  const url = movie.original_name.replaceAll(' ', '-');

  return (
    <Link href={`/tv/${movie.id + '-' + url}`} className="max-w-[550px]">
      <div className={`relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10" />
        <p className="absolute z-20 bottom-5 left-5">{movie.original_name}</p>
        <Image 
          src={getImagePath(movie.backdrop_path || movie.poster_path)}
          alt={movie.original_name}
          className="w-full lg:min-w-[300px] max-w-[550px] h-56 object-cover object-center shadow-md rounded-md"
          width={1920}
          height={1080}
          key={movie.id}
          />
      </div>
    </Link>
  )
}

export default TvCard;