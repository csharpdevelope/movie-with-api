import MovieCarousel from "@/components/MovieCarousel";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation"

type Props = {
  params: {
    term: string
  }
}

async function SearchPage({params: {term}} : Props) {

  if (!term) notFound();
  const termToUse = decodeURI(term);

  // API call to get the Search movies
  const movies = await getSearchMovies(termToUse);
  // API call to get the Popular movies
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col spce-y-5 mt-32 xl:mt-40">
        <h1 className="text-6xl font-bold px-10">Results for <span className="text-blue-500">{`"${termToUse}"`}</span> </h1>
        <MovieCarousel title="Movies" movies={movies} isVertical />
        <MovieCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  )
}

export default SearchPage;