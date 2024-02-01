import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Footer() {
  return (
    <div className='py-4'>
      <hr className='w-full bg-white shadow shadow-blue-600' />
      <div className='w-full z-20 top-0 flex justify-center items-center p-5'>
        <div className='flex flex-col items-center space-y-10'>
          <div className='flex space-x-5 items-center'>
            <p className='text-xl'>Follow Disney on:</p>
            <a href={`https://www.facebook.com`} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-gray-600 dark:fill-white hover:fill-blue-400 dark:hover:fill-blue-400" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
              </svg>
            </a>
          </div>
          <Link href={'/'} className='mr-10'>
            <Image src={'https://links.papareact.com/a943ae'} alt='Disney Logo alt' width={120} height={100} className='cursor-pointer invert-1 dark:invert'/>
          </Link>
          <p className='text-lg'>© Disney © Disney•Pixar © & ™ Lucasfilm LTD © Marvel. All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;