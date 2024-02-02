import MovieMedia from "@/components/MovieMedia";
import PeopleCarousel from "@/components/PeopleCarousel";
import RecommendVideos from "@/components/RecommendVideos";
import CurrentSeason from "@/components/tv/CurrentSeason";
import TvDetailSection from "@/components/tv/TvDetailSection";
import getImagePath from "@/lib/getImagePath";
import { getAggregateCredits, getTVShowDetail, getTvideos, getTvSeriaImage, getRecommendationVideos, getExternalTvSeria, getTvSerieKeywords } from "@/lib/getTvSeries";
import { EpisodeToAir, Networks, Seasons } from "@/types/TVType";
import { RecommendType } from "@/types/collectionType";
import { Actor, Video } from "@/typings";
import Image from "next/image";
import Link from "next/link";


type Props = {
  params: {
    id: string;
  }
}

async function TvSeriesPage({params: {id}}: Props) {

  const seriaId = id.split("-")[0];
  const data = await getTVShowDetail(seriaId);
  const videos = await getTvideos(seriaId);
  const people = await getAggregateCredits(seriaId);
  const images = await getTvSeriaImage(seriaId);
  const recommendTVVideos = await getRecommendationVideos(seriaId);
  const externalId = await getExternalTvSeria(seriaId);
  const keywords = await getTvSerieKeywords(seriaId);

  const networks: Networks[] = data.networks;
  

  var recommendVideos: RecommendType[] = [];
  recommendTVVideos.results.forEach(video => {
    var recommend: RecommendType = {
      id: video.id,
      backdrop_path: video.backdrop_path,
      media_type: 'tv',
      title: video.original_name,
      vote_average: video.vote_average
    }
    recommendVideos.push(recommend);
  });

  var currentSeason: EpisodeToAir = data.last_episode_to_air;
  var lastSeason: Seasons[] = data.seasons;

  var casts: Actor[] = [];
  var index = 0;
  for (const act of people.cast) {
    if (index == 10) break;
    casts.push(act);
    index++;
  }
  var trailerKey: string | undefined = undefined;
  const newVideos: Video[] = videos.filter(video => video.site === 'YouTube');
  if (newVideos.length >= 1) trailerKey = newVideos[0].key;
  

  return (
    <div>
      <TvDetailSection data={data} trailerKey={trailerKey} />
      <div className="flex flex-row justify-between space-x-4 w-full px-10 xl:px-40 2xl:px-60">
        <div className="w-4/5 py-5 xl:py-10">
          <PeopleCarousel people={casts} />
          {images.backdrops.length == 0 && images.posters.length == 0 && videos.length == 0 ? null : (
            <>
              <hr className="w-full bg-gray-400 h-[2px] my-4" />
              <MovieMedia images={images} videos={videos} />
            </>
          )}

          {/* Current Season */}  
          {currentSeason && (<>
            <hr className="w-full bg-gray-400 h-[2px] my-4" />
            <CurrentSeason season={currentSeason} lastSeason={lastSeason[lastSeason.length - 1]} isLastSeason />
          </>)}

          <hr className="w-full bg-gray-400 h-[2px] my-4" />
          <RecommendVideos movies={recommendVideos} title="Recommend Movies" movieName={data.original_name} />
        </div>
        <div className="w-1/5 py-5 xl:py-10 space-y-6">
          {/* social network */}
          <div className="flex space-x-4 items-center">
            {/* instagram */}
            {externalId.instagram_id && (
              <a href={`https://www.instagram.com/${externalId.instagram_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
            )}

            {/* facebook  https://www.facebook.com/*/}
            {externalId.facebook_id && (
              <a href={`https://www.facebook.com/${externalId.facebook_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
              </a>
            )}

            {/* Twitter */}
            {externalId.twitter_id && (
              <a href={`https://twitter.com/${externalId.facebook_id}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                </svg>
              </a>
              )}
          </div>

          {/* Status budget revenue */}
          <div className="space-y-6">
            {/* status */}
            {data.status && <div className="-space-y-1">
              <p className="text-lg font-medium">Status</p>
              <p className="text-lg font-light">{data.status}</p>
            </div>}

            {networks != undefined && <div className="space-y-1">
              <p className="text-lg font-medium">Networks</p>
              <div className="flex flex-col space-y-1">
                {networks.map(network => (
                  <Link href={`/networks/${network.id + "-" + network.name.replaceAll(" ", "-")}`} key={network.id}>
                    <Image 
                      className="object-contain"
                      src={getImagePath(network.logo_path)}
                      alt={network.name}
                      width={60}
                      height={40} />
                  </Link>
                ))}
              </div>
            </div>}

            {/* Original Language */}
            {data.original_language && <div className="-space-y-1">
              <p className="text-lg font-medium">Original Language</p>
              <p className="text-lg font-light">{'English'}</p>
            </div>}

          </div>
          
          {/* Keywords */}
          {keywords != undefined && (
            <div className="space-y-2">
              <p className="">Keywords</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map(keyword => <Link href={`/keyword/${keyword.id + "-" + keyword.name.replaceAll(" ", "-")}/tv`} className="text-xs bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-sm" key={keyword.id}>{keyword.name}</Link>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TvSeriesPage;