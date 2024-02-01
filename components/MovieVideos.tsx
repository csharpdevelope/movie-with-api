import { Video } from "@/typings";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function MovieVideos({videos} : {videos?: Video[]}) {
  return (
    videos ? <div className="flex items-center py-4 h-80 space-x-4 max-w-full overflow-x-scroll overflow-y-hidden flex-nowrap">
    {videos?.map(video => (
      <Dialog key={video.id}>
        <DialogTrigger className="relative rounded-xl min-w-[500px] min-h-[300px] flex justify-center items-center shadow shadow-blue-300">
          <Image src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} width={500} height={300} className="rounded-xl object-contain" />
          <div className="absolute w-20 h-20 rounded-full bg-gray-900 opacity-80 hover:opacity-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
              <polygon className="fill-white" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
            </svg> 
          </div>
        </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-screen p-0">
        <iframe 
          src={`https://www.youtube.com/embed/${video.key}`} 
          className="w-full" 
          width={600}
          allowFullScreen 
          height={550}></iframe>
      </DialogContent>
      </Dialog>
    ))}
  </div> : <p className="text-center text-xl">No Videos</p>
  )
}

export default MovieVideos;