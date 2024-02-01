import { getDifferAge, getFullYear } from "@/lib/dateUtils";
import getImagePath from "@/lib/getImagePath";
import { getAllCombinedCredits, getExternalIds, getPersonById, getMovieByPerson, getTvByPerson } from "@/lib/getPerson";
import { MovieCast } from "@/types/person";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  }
}

type FilterMovieType = {
  year?: number;
  actors: MovieCast[];
}

function DetailComponent({name, value}: {name: string, value: string}) {
  return (
    <div className="space-y-0">
      <h2 className="text-lg font-medium">{name}</h2>
      <p className="text-base font-light">{value}</p>
    </div>
  )
}

function ActingDetailComponent({id, name, character, mediaType, releaseDate, episodeNumber}: 
  {id: number, name?: string, character?: string, mediaType: string, releaseDate?: string, episodeNumber?: number}) {
  
  const url = name ? id + "-" + name.replaceAll(" ", "-") : id;
  return <div className="flex space-x-4 items-start" key={id}>
    <div className="flex items-center space-x-4 ">
      <p className="w-10 text-center">{releaseDate ? getFullYear(releaseDate) : '—'}</p>
      <div className="cursor-pointer w-3 h-3 rounded-full border-2 border-gray-900 dark:border-gray-100 hover:border-[1px] hover:bg-blue-500"></div>
    </div>
    <div className="flex items-start flex-col -space-y-1">
      <Link href={`/${mediaType}/${url}`} className="text-base font-medium hover:text-blue-300">{name}</Link>
      <div className="flex items-center space-x-1 text-sm">
        {episodeNumber != undefined && <p className="dark:text-gray-300 text-gray-600">({`${episodeNumber} episodes`})</p>}
        {
          character && <div className="flex items-center space-x-1">
          <p className="dark:text-gray-300 text-gray-600">as</p>
          <p className="text-gray-800 dark:text-gray-100">{character}</p>
        </div>
        }
      </div>
    </div>
  </div>
}

async function PersonDetail({params: {id}}: Props) {

  const personId = id.split('-')[0];
 
  const data = await getPersonById(personId);
  const externals = await getExternalIds(personId);
  const credits = await getAllCombinedCredits(personId);

  var allYear: number[] = [];
  
  credits.cast.forEach(cast => {
    let dateToCheck: string | null = null;

    if (cast.media_type === 'movie') {
      dateToCheck = cast.release_date;
    } else if (cast.first_air_date) {
      dateToCheck = cast.first_air_date;
    }

    if (dateToCheck) {
      const year = getFullYear(dateToCheck);
      if (!allYear.includes(year))
        allYear.push(year);
    } else {
      if (!allYear.includes(0))
        allYear.push(0);
      }
  });
  allYear = allYear.sort((a, b) => b-a);
  const lastYear = allYear.filter(year => year == 0)[0];
  const otherYear = allYear.filter(year => year != lastYear);
  
  allYear = [];
  if (lastYear) allYear.push(lastYear);
  otherYear.forEach(year => allYear.push(year));
  var allFilterMovies: FilterMovieType[] = [];
  allYear.forEach(year => {
    const actors = credits.cast.filter(credit => {
      let movieYear = 0;
      if (credit.media_type == 'movie')
        movieYear = getFullYear(credit.release_date);
      else 
        movieYear = getFullYear(credit.first_air_date);
      return movieYear == year;
    })
    const fileterMovie: FilterMovieType = {
      year: year,
      actors: actors
    }
    allFilterMovies.push(fileterMovie);
  });
  

  
  return (
    <div className="mt-20 md:mt-30 2xl:mt-36 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className="flex items-start space-x-10">
        {/* Profile image and external profiles */}
        <div className="w-[320px] flex flex-col items-start space-y-8">
          <Image 
            src={getImagePath(data.profile_path)}
            className="w-full object-cover object-top rounded-xl" 
            alt={data.name} 
            width={300} height={400} />
          <div className="flex space-x-4 items-center px-2">
            {/* instagram */}
            {externals.instagram_id && (
              <a href={`https://www.instagram.com/${externals.instagram_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
            )}

            {/* facebook  https://www.facebook.com/*/}
            {externals.facebook_id && (
              <a href={`https://www.facebook.com/${externals.facebook_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
              </a>
            )}

            {/* Twitter */}
            {externals.twitter_id && (
              <a href={`https://twitter.com/${externals.facebook_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                </svg>
              </a>
              )}
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-semibold">Personal Info</h1>
            <div className="space-y-4">
              {data.known_for_department && <DetailComponent name="Known For" value={data.known_for_department} />}
              {credits.cast != undefined && <DetailComponent name="Known Credits" value={credits.cast.length.toString()} /> }
              {data.gender != undefined && <DetailComponent name="Gender" value={data.gender == 1 || data.gender == 0 ? "Female" : "Male"} /> }
              {data.birthday != undefined && data.birthday != null && <DetailComponent name="Birthday" value={`${data.birthday} (${getDifferAge(data.birthday, data.deathday != undefined ? data.deathday : new Date().toUTCString())})`} />}
              {data.deathday != undefined && data.deathday != null && <DetailComponent name="Birthday" value={data.deathday } />}
              {data.place_of_birth != undefined && data.place_of_birth != null && <DetailComponent name="Place of Birth" value={data.place_of_birth} />}
              {data.also_known_as != undefined && data.also_known_as.length != 0 && <div className="space-y-0">
                <h2 className="text-lg font-medium">Also Known As</h2>
                {data.also_known_as.map(know => <p className="text-lg font-light" key={know}>{know}</p>)}
              </div>}
            </div>
          </div>
        </div>
        {/* name and known for movies */}
        <div className="w-full flex flex-col items-start space-y-8">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          {data.biography && <DetailComponent name="Biography" value={data.biography} />}
          {/* Known For  */}
          
          <div className="w-full space-y-2">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-medium">Acting</h1>
              <p>Department</p>
            </div>
            <div className="rounded-xl shadow-md shadow-blue-300">
              {allFilterMovies.map(movie => <div key={movie.year} className={`border-[1px] border-gray-500 space-y-3 px-4 py-5 ${movie.year === allFilterMovies[0].year ? 'rounded-t-xl' : ''} ${movie.year === allFilterMovies[allFilterMovies.length -1].year ? 'rounded-b-xl border-b-[1px]' : 'border-b-0'}`}>
                {
                  movie.actors.map(credit => 
                    <ActingDetailComponent 
                        key={credit.id} 
                        id={credit.id} 
                        mediaType={credit.media_type} 
                        name={credit.media_type == 'movie' ? credit.title : credit.original_name} 
                        character={credit.character} episodeNumber={credit.episode_count} 
                        releaseDate={credit.media_type == 'movie' ? credit.release_date : credit.first_air_date} />)
                }
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonDetail;