// 'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ThemeToggler } from './ThemeToggler';
import SearchInput from './SearchInput';
import GenreComponent from './GenreComponent';
import { navbars } from '@/data';

function Header() {
  const scrolling = false;

  return (
    <header className={`fixed w-full z-50 top-0 flex justify-between items-center p-5 ${scrolling ? 'bg-blue-700' : 'bg-gradient-to-t from-gray-200/0 via-gray-900/50 to-gray-900'}`}>
      <Link href={'/'} className='mr-10'>
        <Image src={'https://links.papareact.com/a943ae'} alt='Disney Logo alt' width={120} height={100} className='cursor-pointer invert'/>
      </Link>

      <div className='flex space-x-6 items-center'>
        {navbars.map(navbar => (
          <Link href={navbar.url} key={navbar.id} className='text-xl text-white hover:text-blue-400'>
            {navbar.name}
          </Link>
        ))}
      </div>

      <div className='flex items-center space-x-2'>
        {/* Genre dropdown */}
        <GenreComponent />
        {/* Search Input */}
        <SearchInput />
        {/* Light & Dark mode */}
        <ThemeToggler />
      </div>
    </header>
  )
}

export default Header;