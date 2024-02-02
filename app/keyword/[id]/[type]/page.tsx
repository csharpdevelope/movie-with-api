'use client'

import Loading from "@/components/Loading";
import ContentNotFound from "@/components/error/ContentNotFound";
import { getDateFormat, getFullYear } from "@/lib/dateUtils";
import getImagePath from "@/lib/getImagePath";
import { getMovieByKeywords } from "@/lib/keywords";
import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
    type: string;
  }
}

function MovieVideosByKeywords({params: {id, type}}: Props) {

  const keywordId = id.split("-")[0];
  const value = id.substring(keywordId.length + 1).replaceAll("-", " ");
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotfound, setNotFound] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() =>{
    setLoading(true);
    getMovieByKeywords(keywordId, type == 'movie' ? 'movies' : 'tv')
          .then(res => {
            setKeywords(res?.results ? res.results : []);
            setTotalResults(res?.total_results ? res.total_results : 0);
          })
          .catch(err => {
            console.log(err);
          })
    setNotFound(totalResults == 0);
    setLoading(false);

  }, [keywordId, totalResults, type]);
  
  

  return (
    <div className="mt-20 md:mt-24 2xl:mt-32 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold">{value}</h1>
        <p className="text-xl font-semibold text-blue-600">{totalResults} {type == 'movie' ? 'movies' : "tv"}</p>
      </div>
      <div className="space-y-4">
        {!loading ? (!isNotfound ? keywords.length != 0 && keywords.map(keywork => (
          <div className="w-full flex md:flex-col space-y-4" key={keywork.id}>
          <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 md:space-x-4 space-y-6 md:space-y-0 items-center">
            <Image 
              className="w-24 h-24 md:w-36 md:h-auto md:rounded-none md:rounded-tl-xl md:rounded-bl-xl rounded-full object-cover object-top" 
              src={getImagePath(keywork.poster_path)} 
              alt={keywork.title} 
              width="384" 
              height="200" />
            <div className="md:py-4 text-center md:text-left space-y-4">
              <div className="flex flex-col space-y-2">
                <Link href={`/movie/${keywork.id + "-" + keywork.title.replaceAll(" ", "-")}`} className="text-xl font-semibold hover:text-blue-400">{keywork.title}</Link>
                <div className="flex items-center text-base font-semibold space-x-1">
                  {keywork.vote_average != 0 && <div className="flex items-center px-2 py-1 space-x-1 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
    
                      <p className="text-xs">{keywork.vote_average}</p>
                    </div>}
                  {keywork.release_date && <p>{getFullYear(keywork.release_date)}</p>}
                </div>
              </div>
              <p className="text-base font-normal">{keywork.overview.length >= 300 ? keywork.overview.substring(0, 305) + "..." : keywork.overview}</p>
              {keywork.release_date &&
              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                <p className="texy-base">{getDateFormat(keywork.release_date)}</p>
              </div>}
            </div>
          </figure>
        </div>
        )) : <ContentNotFound pageName={value} isBack />) : <Loading loading={loading} />}
      </div>
    </div>
  )
}

export default MovieVideosByKeywords;