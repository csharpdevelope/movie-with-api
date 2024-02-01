import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";


function YoutubeTrailer({youtubeKey}: {youtubeKey?: string}) {
  return (
    youtubeKey && (
      <Dialog>
        <DialogTrigger className="hover:text-blue-400 text-white flex items-center space-x-4">
          <Image 
            src={"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg"}
            alt="Play trailer"
            className="text-white"
            width={25}
            height={25}
            />
           Play Trailer</DialogTrigger>
        <DialogContent className="max-w-4xl max-h-screen p-0">
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeKey}`} 
            className="w-full" 
            width={600}
            allowFullScreen 
            height={550}></iframe>
        </DialogContent>
      </Dialog>
    )
  )
}

export default YoutubeTrailer;