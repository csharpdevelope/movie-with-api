import { getDateFormat, getFullYear } from "@/lib/dateUtils";
import getImagePath from "@/lib/getImagePath";
import { EpisodeToAir, Seasons } from "@/types/TVType";
import Image from "next/image";
import Link from "next/link";


function CurrentSeason({season, lastSeason, isLastSeason}: {season: EpisodeToAir, lastSeason: Seasons, isLastSeason: boolean}) {
  return (
    <div className="w-full flex md:flex-col space-y-4">
      <h1 className="text-xl font-semibold">Last Season</h1>
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 md:space-x-4 space-y-6 md:space-y-0 items-center">
        <Image 
          className="w-24 h-24 md:w-36 md:h-auto md:rounded-none md:rounded-tl-xl md:rounded-bl-xl rounded-full object-fill" 
          src={getImagePath(lastSeason.poster_path)} 
          alt={season.name} 
          width="384" 
          height="200" />
        <div className="md:py-4 text-center md:text-left space-y-4">
          <div className="flex flex-col space-y-0">
            <h1 className="text-xl font-semibold">{lastSeason.name}</h1>
            <div className="flex items-center text-base font-semibold space-x-1">
              {lastSeason.vote_average != 0 && <div className="flex items-center px-2 py-1 space-x-1 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>

                  <p className="text-xs">{lastSeason.vote_average}</p>
                </div>}
              <p>{getFullYear(lastSeason.air_date)}</p>
              <p>•</p>
              <p>{lastSeason.episode_count} Episodes</p>
            </div>
          </div>
          <p className="text-base font-normal">{lastSeason.overview}</p>
          <div className="flex space-x-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>

            <Link href={"/"} className="text-base underline hover:text-blue-400">
              {season.name}
            </Link>
            <p className="texy-base">({getDateFormat(season.air_date)})</p>
            {isLastSeason && <p className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-800">Season finale</p>}
          </div>
        </div>
      </figure>
      <Link href={"/"} className="text-base font-medium hover:text-blue-400">View all Seasons</Link>
    </div>
  )
}

export default CurrentSeason;