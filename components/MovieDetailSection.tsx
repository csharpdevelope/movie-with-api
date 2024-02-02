import { getDateUtils, getFullYear, getHourMinutes } from "@/lib/dateUtils";
import getImagePath from "@/lib/getImagePath";
import { MovieDetail } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import YoutubeTrailer from "./YoutubeTrailer";

type Props = {
  data: MovieDetail;
  trailerKey?: string;
}

async function MovieDetailSection({data, trailerKey}: Props) {

// max-w-7xl mx-auto 
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 items-center relative py-40 bg-cover bg-right-top bg-no-repeat" style={{
      backgroundImage: `url(${getImagePath(data.backdrop_path, true)})`,
    }}>
      <div className={`absolute inset-0 bg-gradient-to-l from-gray-400/0 via-gray-900/60 to-gray-300 dark:to-[#1A1C29]/80 z-0 max-w-none w-full`} />
      <div className="z-10 flex justify-center px-10 xl:px-40 2xl:px-60">
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 items-center">
          <Image
            src={getImagePath(data.poster_path)}
            alt={data.title}
            loading="lazy"
            className="rounded-xl object-cover"
            width={500}
            height={600}
          />
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <p className="text-4xl text-white">{data.title} <span className="text-gray-400">({getFullYear(data.release_date)})</span></p>
            </div>
            <div className="flex items-center text-lg space-x-1 text-white">
              {data.release_date && <p>{getDateUtils(data.release_date)}</p>}
              {data.genres.length >= 1 && (
                <div className="flex flex-row space-x-2 before:content-['•'] before:text-xl before:content-between">
                {data.genres.map(genre => (
                  <Link href={`/genre/${genre.id}?genre=${genre.name}`} key={genre.id}>
                    <p className="text-lg text-white hover:text-gray-400">{genre.name}</p>
                  </Link>
                ))}
              </div>
              )}
              {data.runtime && <p className="before:content-['•'] before:text-xl">{getHourMinutes(data.runtime)}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative bg-gray-700 w-16 h-16 rounded-full flex justify-center items-center">
                <div className="bg-green-800 w-14 h-14 rounded-full flex justify-center items-center">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex justify-center items-center z-10">
                    <p className="text-white after:content-['%'] after:text-xs after:text-white">{Math.ceil(data.vote_average * 10)}</p>
                  </div>
                </div>
                <div className="absolute bg-green-600 w-14 h-14 rounded-full" />
              </div>
              <p className="text-sm w-10 text-white">User Score</p>
              {/* video trailer */}
              <div className="">
                <YoutubeTrailer youtubeKey={trailerKey} />
              </div>
            </div>
            <div className="text-lg text-white space-y-1">
              <p className="italic text-gray-400">{data.tagline}</p>
              <p className="text-xl">Overview</p>
              <p className="text-gray-200 text-[16px]">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailSection;