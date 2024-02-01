import getImagePath from "@/lib/getImagePath";
import { getNetworkMovies, getNetworksById } from "@/lib/getNetwork";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  }
}

async function NetworksyId({params: {id}}: Props) {

  const networkId = id.split("-")[0];
  const data = await getNetworksById(networkId);
  const images = await getNetworkMovies(networkId);

  return (
    <div className="mt-20 md:mt-30 2xl:mt-36 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 items-center">
          <p>
            <a href={data.homepage} className="text-2xl hover:text-blue-500">{data.name}</a>
          </p>
          <a href={data.homepage}>
            <Image src={getImagePath(data.logo_path)} className="" width={400} height={500} alt={data.name} />
          </a>
        </div>
        <hr className="w-full bg-gray-400 h-[2px] my-4" />
        <p className="py-4 text-xl">{data.headquarters}</p>
        <hr className="w-full bg-gray-400 h-[2px] my-4" />
        <h1 className="text-2xl pb-3">{data.name} Images</h1>
        <div className="w-full flex items-center space-x-3 overflow-x-scroll py-3">
          {images.map(image => (
            <Image key={image.file_path} className="object-contain mix-blend-normal aspect-[16/9]" src={getImagePath(image.file_path)} alt={image.file_path} width={300} height={200} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NetworksyId;