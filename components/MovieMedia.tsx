'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageInfo, ImagesResponse, Video } from "@/typings";
import { getImageByMovie, getMovieVideos } from "@/lib/getMovies";
import { useState } from "react";
import MovieVideos from "./MovieVideos";
import MovieImages from "./MovieImages";

function MovieMedia({images, videos}: {images: ImagesResponse, videos: Video[]}) {
  const [activeState, setActiveState] = useState<string>("videos");
  var newVideos: Video[] = [];
  var newBackDropImages: ImageInfo[] = [];
  var newPosterImages: ImageInfo[] = [];
  var i = 0;
  videos.filter(movie => movie.site === 'YouTube').forEach(video => {
    if (i == 5) return;
    newVideos.push(video);
    i++;
  });
  i = 0;
  
  images.backdrops.forEach(image => {
    if (i == 6) return;
    newBackDropImages.push(image);
    i++;
  });
  i=0;
  images.posters.forEach(image => {
    if (i == 6) return;
    newPosterImages.push(image);
    i++;
  });


  return (
    <div className="py-2">
      {/* <h1 className="text-2xl font-semibold">Media</h1> */}
      <Tabs defaultValue={activeState} 
            className="w-full" 
            orientation="horizontal"
            onValueChange={(e) => setActiveState(e)}
      >
        <TabsList className="flex justify-start w-full items-center space-x-10 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-xl" >
          <TabsTrigger value="" className="-ml-2 text-xl font-semibold leading-10 disabled:text-gray-900 dark:disabled:text-white" disabled>Media</TabsTrigger>
          <TabsTrigger value="videos">Videos &#160;&#160; <span className="text-gray-400">{videos.length}</span></TabsTrigger>
          <TabsTrigger value="backdrop">Backdrops &#160;&#160; <span className="text-gray-400">{images.backdrops?.length}</span></TabsTrigger>
          <TabsTrigger value="poster">Posters &#160;&#160; <span className="text-gray-400">{images.posters?.length}</span></TabsTrigger>
        </TabsList>
        <TabsContent value={activeState}>
            {activeState === 'videos' && <MovieVideos videos={newVideos} />}
            {activeState === 'backdrop' && <MovieImages images={newBackDropImages} />}
            {activeState === 'poster' && <MovieImages images={newPosterImages} posterCard />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MovieMedia;