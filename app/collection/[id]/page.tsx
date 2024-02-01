import MovieCarousel from "@/components/MovieCarousel";
import { getCollectoinById, getGenreByType, getImageByCollection } from "@/lib/getCollection";
import getImagePath from "@/lib/getImagePath";
import { getMovieDetail } from "@/lib/getMovies";
import { moneyFormat } from "@/lib/movieUtils";
import { Genre, Genres, Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  }
}

async function CollecionByMovie({params: {id}}: Props) {
  const collectionId = id.split("-")[0];
  const collection = await getCollectoinById(collectionId);
  const collectionImages = await getImageByCollection(collectionId);
  var allGenre: Genres = await getGenreByType('movie');

  var voteAverage: number = 0;
  var collectionGenreIds: Set<number> = new Set();
  var sumRevenue: number = 0
  for (const collect of collection.parts) {
    voteAverage += collect.vote_average;
    try {
      const res = await getMovieDetail(collect.id.toString());
      sumRevenue += res.revenue;
    } catch (err) {
      console.log(err);
    }

    collect.genre_ids.forEach(id => {
      collectionGenreIds.add(id);
    });
  }
  var partLength: number = collection.parts.length | 0;
  

  if (partLength === 0)
    partLength = 1;
    
  var genreMovies: Genre[] = [];
  allGenre.genres.forEach(genre => {
    collectionGenreIds.forEach(genreMovie => {
      if (genre.id === genreMovie)
        genreMovies.push(genre);
    })
  })

  return (
    <div className="">
      {/* home section */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 items-center relative py-20 lg:py-25 xl:py-35 bg-cover bg-right-top bg-no-repeat" style={{
        backgroundImage: `url(${getImagePath(collection.backdrop_path, true)})`,
      }}>
        <div className={`absolute inset-0 bg-gradient-to-l from-gray-400/0 via-gray-900/60 to-gray-300 dark:to-[#1A1C29]/80 z-0 max-w-none w-full`} />
        <div className="z-10 flex justify-center px-10 xl:px-40 2xl:px-60">
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 items-center">
            <Image
              src={getImagePath(collection.poster_path)}
              alt={collection.name}
              loading="lazy"
              className="rounded-xl object-cover"
              width={500}
              height={600}
            />
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-2">
                <p className="text-4xl text-white">{collection.name}</p>
              </div>
              <div className="flex items-center text-lg space-x-1 text-white">
                {genreMovies.length >= 1 && (
                  <div className="flex flex-row space-x-2">
                  {genreMovies.map(genre => (
                    <Link href={`/genre/${genre.id}?genre=${genre.name}`} key={genre.id}>
                      <p className="text-lg text-white hover:text-gray-400">{genre.name}</p>
                    </Link>
                  ))}
                </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative bg-gray-700 w-16 h-16 rounded-full flex justify-center items-center">
                  <div className="bg-green-800 w-14 h-14 rounded-full flex justify-center items-center">
                    <div className="bg-gray-700 w-12 h-12 rounded-full flex justify-center items-center z-10">
                      <p className="text-white after:content-['%'] after:text-xs after:text-white">{Math.ceil((voteAverage / partLength) * 10)}</p>
                    </div>
                  </div>
                  <div className="absolute bg-green-600 w-14 h-14 rounded-full" />
                </div>
                <p className="text-sm w-10 text-white">User Score</p>
              </div>
              <div className="text-lg text-white space-y-1">
                <p className="text-xl">Overview</p>
                <p className="text-gray-200 text-[16px]">{collection.overview}</p>
              </div>
              <div className="space-y-2">
                {partLength !== 0 && <p className="text-lg text-white">Number of Movies: {partLength}</p>}
                {partLength !== 0 && <p className="text-lg text-white">Revenu: {moneyFormat(sumRevenue)}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {partLength !== 0 && (
        <div className="z-10 flex flex-col justify-center px-10 xl:px-40 2xl:px-60">
          <hr className="w-full h-[2px] bg-gray-600 my-4" />
          {/* all movies by collection */}
          <MovieCarousel movies={collection.parts} title="Movies" isVertical />
        </div>
      )}
    </div>
  )
}

export default CollecionByMovie