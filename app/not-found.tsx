'use client'

import Link from 'next/link';;
import { usePathname } from 'next/navigation';
import Lottie from 'lottie-react';
import lottieNotFound  from '@/assets/animations/not_found.json';
 
export default function NotFound() {

  const pathname = usePathname();
  return (
    <div className='h-[65vh] flex justify-center items-center flex-col-reverse md:space-x-10 space-y-10 md:flex-row mt-20 md:mt-24 2xl:mt-32 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40'>
      <div className='flex-1 space-y-4'>
        <p className='text-xl leading-10 font-light'>Could not find requested resource</p>
        <Link href="/" className='group flex justify-center items-center w-40 space-x-3 py-3 bg-gray-700 text-white hover:bg-blue-700 rounded-full'>
          <p>Go Home</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>

        </Link>
      </div>
      <Lottie 
        animationData={lottieNotFound} 
        className="flex-1 w-full justify-center items-center"
        loop={true} />
    </div>
  )
}