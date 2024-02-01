import { Genres } from '@/typings';
import {ChevronDown} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';
import { getGenreByType } from '@/lib/getCollection';

async function GenreComponent() {

  const data = await getGenreByType("movie");
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white flex justify-center item-center border-none outline-none'>
        Genre <ChevronDown className='ml-1' />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Select Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.genres.map(genre => (
          <DropdownMenuItem key={genre.id}>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default GenreComponent;