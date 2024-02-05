'use client'

import MovieCard from "@/components/MovieCard";
import PaginationCustom from "@/components/PaginationCustom";
import SliderTabs from "@/components/SliderTabs";
import { getMoviesByType } from "@/lib/getMovies";
import { cn } from "@/lib/utils";
import { SlideType } from "@/types/slide";
import { Movie } from "@/typings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";

const movieTypes: SlideType[] = [
  {
    name: "Now Playing",
    value: "now_playing"
  },
  {
    name: "Popular",
    value: "popular"
  },
  {
    name: "Top Rated",
    value: "top_rated"
  },
  {
    name: "Upcoming",
    value: "upcoming"
  }
]

function MovieList() {

  const [activeType, setActiveType] = useState<SlideType>(movieTypes[0]);
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [allMovieCount, setMovieCount] = useState(0);
  const [grid, setGrid] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    router.push(`?tag=${activeType.value}&page=${currentPage}`);
    setLoading(true);
    getMoviesByType(activeType.value, currentPage.toString())
        .then(res => {
          setData(res.results);
          setTotalPage(res.total_pages)
          setMovieCount(res.total_results);
        })
        .catch(err => setLoading(false));
    setLoading(false);
    
  }, [activeType, setActiveType, router, currentPage]);

  const changeGrid = (isActive: boolean) => {
    setGrid(isActive);
  }

  return (
    <div className="mt-20 md:mt-30 2xl:mt-36 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className="flex justify-between items-center">
        <SliderTabs activeType={activeType} setActiveType={setActiveType} movieTypes={movieTypes} width={128} spaceWidth={20} className="max-w-[574px] space-x-5 border-[1px] border-blue-600" setData={setData} />
        <div className="flex items-center justify-end space-x-4">
          
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeGrid(false)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 active:scale-110 hover:text-blue-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
          </svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeGrid(true)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 active:scale-110 hover:text-blue-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
      </div>
      <Loading loading={loading} />

      <hr className="h-[2px] bg-blue-600 my-5" />
      <div>
        {data.length >= 1 ? (
            <div>
              <div className={`w-full h-auto max-w-[1800px] ${grid ? 'flex flex-col': 'grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 md:gap-6 xl:gap-10'}`}>
                {data.map(((movie: Movie) => 
                !grid ? <MovieCard movie={movie} key={movie.id} /> : (
                  <div key={movie.id} className={"flex flex-col justify-start space-y-5 mb-5 items-center lg:flex-row space-x-5"}>
                    <MovieCard key={movie.id} movie={movie} />
                    <div className="max-w-4xl">
                      <Link href={`/movie/${movie.id + '-' + movie.title.replaceAll(' ', '-')}`}><p className="font-bold">{movie.title} {movie.release_date?.split("-")[0]}</p></Link>
                      <hr className="mb-3"/>
                      <p className="mb-3">{movie.overview}</p>
                    </div>
                  </div>
                )))}
              </div>
              <hr className="h-[2px] bg-blue-600 my-10" />
              <PaginationCustom currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
            </div>
          ) : <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-4">
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" />
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" />
            </div>}
        </div>
    </div>
  )
}

export default MovieList;