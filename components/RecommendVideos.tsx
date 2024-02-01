import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { RecommendType } from "@/types/collectionType";

function RecommendVideos({movies, title, movieName}: {movies: RecommendType[], title: string, movieName: string}) {
  return (
    <div className="w-full py-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {movies.length >= 1 ? (
        <div className="w-full flex space-x-3 overflow-scroll py-3 px-3">
          {movies.map(movie => {
            var title = movie.title;
            if (title.length >= 25)
              title = title.substring(0, 20) + "..."
            return (
              <Card key={movie.id} style={{minWidth: '300px', maxHeight: '220px'}} className="space-y-4 shadow-md overflow-y-hidden dark:shadow-gray-600 hover:scale-105 shadow-blue-300 rounded-xl w-[300px] h-auto">
                <CardContent className="p-0 h-44">
                  <Link href={`/${movie.media_type}/${movie.id + "-"+ movie.title.replaceAll(" ", "-")}`}>
                    <Image src={getImagePath(movie.backdrop_path)} className="object-cover rounded-tr-xl rounded-tl-xl group-hover:scale-105" alt={movie.title} width={300} height={250} />
                    <div className="bg-gradient-to-t from-gray-700 via-gray-800/10 to-gray-400/30" />
                  </Link>
                </CardContent>
                <CardFooter className="w-full flex justify-between items-center text-sm dark:text-white text-black px-2 pb-2">
                  <p className="w-4/5">{title}</p>
                  <p className="">{Math.ceil(movie.vote_average * 10)}%</p>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ): <p className="text-black dark:text-white py-2 text-lg">We don`t have enough data to suggest any movies based on {movieName}. You can help by rating movies you`ve seen.</p>}
    </div>
  )
}

export default RecommendVideos;