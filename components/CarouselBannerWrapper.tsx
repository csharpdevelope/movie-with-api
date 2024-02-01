'use client'

import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselsBanner from "./CarouselsBanner";
import { useEffect, useState } from "react";
import { Movie } from "@/typings";

type Props = {
  id?: string;
  keywords?: string
}

function CarouselBannerWrapper({id, keywords}: Props) {

  const [movies, setMovies] = useState<Movie[]>([]);

  async function fetchData() {
    try {
      const movies = await getDiscoverMovies(id, keywords);
      setMovies(movies);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() =>{
    fetchData();
  }, [])

  return (
    <CarouselsBanner movies={movies} />
  )
}

export default CarouselBannerWrapper;