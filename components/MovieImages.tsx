import getImagePath from '@/lib/getImagePath';
import { ImageInfo } from '@/typings';
import Image from 'next/image';
import Link from 'next/link';

function MovieImages({images, posterCard}: {images: ImageInfo[], posterCard?: boolean}) {
  return (
    images ? <div className="flex items-center py-4 px-4 h-80 space-x-4 max-w-full overflow-x-scroll overflow-y-hidden flex-nowrap">
    {images?.map(image => (
        <div className={`relative rounded-xl min-w-[${posterCard ? '200px' : '500px'}] aspect-[${image.aspect_ratio}] min-h-[${posterCard ? '150px': '290px'}] flex justify-center items-center bg-white shadow shadow-blue-300`} key={image.file_path}>
          <Image src={getImagePath(image.file_path)} alt={image.file_path} width={500} height={300} className={`rounded-xl object-contain w-[${posterCard ? '200px': '500px'}] h-[${posterCard ? '150px': '290px'}]`} />
        </div>
    ))}
    <div className={`relative rounded-xl min-w-[200px] min-h-[${posterCard ? '300px': '300px'}] flex justify-center items-center bg-white dark:bg-transparent dark:text-white shadow shadow-blue-300 `} key={"View_more_BackDrop_Image"}>
      <Link href={"/"}>
        <p className='text-xl text-black dark:text-white'>Vew more</p>
      </Link>
    </div>
  </div> : <p className="text-center text-xl">No Images</p>
  )
}

export default MovieImages;