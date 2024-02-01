'use client'

import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";


type Props = {
    title?: string;
    movies: Movie[];
    isVertical?: boolean,
    slideComponent?: React.ReactElement
}

function MovieCarousel({title, movies, isVertical, slideComponent}: Props) {

  return (
    <div className="z-30">
      <div className="flex space-x-5 py-2">
        <h2 className="text-xl font-bold px-10">{title}</h2>
        {slideComponent !== undefined && slideComponent}
      </div>
      <div className={cn("flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide",
        isVertical && "flex-col space-x-0 space-y-12"
      )}>
        {movies.length >= 1 ? (
          isVertical ? (
            movies.map(movie => (
              <div key={movie.id} className={cn(
                isVertical && "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
              )}>
                <MovieCard key={movie.id} movie={movie} />
                <div className="max-w-2xl">
                  <Link href={`/movie/${movie.id + '-' + movie.title.replaceAll(' ', '-')}`}><p className="font-bold">{movie.title} {movie.release_date?.split("-")[0]}</p></Link>
                  <hr className="mb-3"/>
                  <p className="mb-3">{movie.overview}</p>
                </div>
              </div>
            ))
          ) : (
            movies?.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )
        ) : (
          !isVertical ? <div className="w-full flex justify-between items-center gap-5 overflow-x-hidden">
            <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
            <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
            <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
            <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
          </div> : <div className="flex items-center space-x-4">
          <Skeleton className="h-[200px] w-96 rounded-xl" /> 
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div> 
        )}
      </div>
    </div>
  )
}

export default MovieCarousel;