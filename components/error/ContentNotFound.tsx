'use client'

import Link from "next/link";
import Lottie from 'lottie-react';
import lottieContentNotFound  from '@/assets/animations/content_not-found.json';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Prop = {
  pageName: string;
  isBack?: boolean
}


function ContentNotFound({pageName, isBack} : Prop) {

  const router = useRouter();

  return (
    <div className="h-[65vh] flex justify-between items-center flex-col-reverse md:space-x-10 space-y-10">
      <div className="space-y-6">
        {!isBack && <Link href="/" className='group flex justify-center items-center w-40 space-x-3 py-2 bg-gray-700 text-white hover:bg-blue-700 rounded-full'>
          <p>Go Home</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>}
        {isBack && <div className="px-6 py-2 flex flex-row items-center space-x-3 cursor-pointer bg-gray-700 text-white hover:bg-blue-700 rounded-full" onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <p>Back</p>
        </div>}
      </div>
      <Lottie 
        animationData={lottieContentNotFound} 
        className="flex-1 w-full h-full justify-end items-center dark:invert invert-0"
        loop={true} />
    </div>
  )
}

export default ContentNotFound;