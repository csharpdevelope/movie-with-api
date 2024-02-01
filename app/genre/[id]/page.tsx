import MovieCarousel from "@/components/MovieCarousel"
import { getDiscoverMovies } from "@/lib/getMovies"

type Props = {
  params: {
    id: string
  },
  searchParams: {
    genre: string
  }
}

async function GenrePage({params: {id}, searchParams: {genre}} : Props) {
  const movies = await getDiscoverMovies(id, );
  return (
    <div className="max-w-7xl mx-auto">
      
      <div className="flex flex-col space-y-5 mt-32 xl:mt-40">
        <h1 className="text-6xl font-bold px-10">
          Results for <span className="text-blue-500">{`"${genre}"`}</span>
        </h1>
      </div>

      <MovieCarousel title="Genre" movies={movies} isVertical />
    </div>
  )
}

export default GenrePage;