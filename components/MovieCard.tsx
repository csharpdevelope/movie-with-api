import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";


function MovieCard({movie, className}: {movie: Movie, className?: string}) {

  const url = movie.title.replaceAll(' ', '-');
  return (
    <Link href={`/movie/${movie.id + '-' + url}`} className="w-full max-w-[550px]">
      <div className={`relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10" />
        <p className="absolute z-20 bottom-5 left-5">{movie.title}</p>
        <Image 
          src={getImagePath(movie.backdrop_path || movie.poster_path)}
          alt={movie.title}
          className="w-full lg:min-w-[300px] max-w-[550px] h-56 object-cover object-top shadow-md rounded-md"
          width={1920}
          height={1080}
          key={movie.id}
          />
      </div>
    </Link>
  )
}

export default MovieCard;