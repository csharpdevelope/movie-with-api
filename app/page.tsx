'use client'

import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MovieCarousel from "@/components/MovieCarousel";
import SliderTabs from "@/components/SliderTabs";
import { getNowPlaying, getPopularMovies, getTopRatingMovies, getTrendingMovieByTime, getUpcomingMovies } from "@/lib/getMovies";
import { SlideType } from "@/types/slide";
import { Movie } from "@/typings";
import { useEffect, useState } from "react";

const types: SlideType[] = [
  {
    name: "Today",
    value: "day"
  },
  {
    name: "This week",
    value: "week"
  },
]

export default function Home() {

  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatingMovies, setTopRatingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [activeType, setActiveType] = useState<SlideType>(types[0]);

  async function fetchData() {
    try {
      const upcomingMoviesData = await getUpcomingMovies();
      const nowPlayingMoviesData = await getNowPlaying();
  
      setUpcomingMovies(upcomingMoviesData);
      setNowPlayingMovies(nowPlayingMoviesData);
    } catch (err) {
      console.error(err);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchTrendingMovies(time: string) {
    try {
    const topRatingMoviesData = await getTrendingMovieByTime(activeType.value);
    setTopRatingMovies(topRatingMoviesData);
    } catch(err) {
      console.log(err);
      
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchTrendingMovies(activeType.value)
  }, [activeType])

  return (
    <main>
      {/* Carousel Banner Wrapper */}
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-4">
        <MovieCarousel movies={nowPlayingMovies} title="Now Playing" />

        <MovieCarousel 
            movies={topRatingMovies} 
            title="Top Rated" 
            slideComponent={
              <SliderTabs 
                activeType={activeType} 
                movieTypes={types} 
                setData={setTopRatingMovies}
                spaceWidth={12} 
                width={128} 
                setActiveType={setActiveType} 
                className="max-w-[270px] space-x-3 border-[1px] border-blue-500" />}
                 />

        <MovieCarousel movies={upcomingMovies} title="Upcoming" />
      </div>
    </main>
  );
}
