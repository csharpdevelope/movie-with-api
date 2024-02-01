import getImagePath from "@/lib/getImagePath";
import { Actor, PeopleByMovies } from "@/typings";
import Image from "next/image";
import Link from "next/link";


function PeopleCarousel({people}: {people: Actor[]}) {

  return (
      people.length >= 1 && (
        <div className="w-full">
          <h1 className="text-2xl text-black dark:text-white font-semibold">Top Billed Cast</h1>
          <div className="flex space-x-4 items-center overflow-scroll py-6 px-2">
            {people.map(person => (
              <div className="flex flex-col justify-between items-start min-w-36 min-h-64 h-72 shadow dark:shadow-gray-300 shadow-gray-800 rounded-xl bg-white text-black" key={person.id}>
                <Link href={`/people/${person.id + "-" + person.name.replaceAll("-", " ")}`}>
                  <Image 
                    src={getImagePath(person.profile_path)} 
                    alt={person.name} 
                    width={144}
                    className="object-contain rounded-tl-xl rounded-tr-xl"
                    height={200}
                  />
                </Link>
                <div className="px-3 pb-4 space-y-1 h-14"> 
                  <p className="text-sm font-semibold leading-4">{person.original_name}</p>
                  <p className="text-black text-xs leading-3">{person.character}</p>
                </div>
              </div>
            ))}
            <Link href={"/"} className="flex justify-center items-center min-w-36 min-h-72 shadow dark:shadow-gray-300 shadow-gray-800 rounded-xl bg-white text-black">
              <p className="text-lg italic">View More</p>
            </Link>
          </div>
          <Link href={"/"} className="text-xl hover:text-gray-400">
            Full cast & crew
          </Link>
        </div>
      )
  )
}

export default PeopleCarousel;