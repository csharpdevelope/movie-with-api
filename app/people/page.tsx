'use client'

import PersonCard from "@/components/people/PersonCard";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Actor, getPopularPeople } from "@/lib/getPerson";
import { result } from "lodash";
import { useEffect, useState } from "react";

function PeoplePage() {

  const [data, setData] = useState<Actor[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  async function fetchData() {
    try {
      var result: Actor[] = data;
      const popularPeople = await getPopularPeople(page);

      for (const actor of popularPeople.results) {
        result.push(actor);
      }
      setData(result);
      setTotalResults(popularPeople.total_results);
      setTotalPage(popularPeople.total_pages);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);


  return (
    <div className="mt-20 md:mt-30 2xl:mt-36 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className=" grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {data.length != 0 ? (
          data.map((person: Actor) => <PersonCard person={person} key={person.id} />)
        ) : <div className="w-full flex justify-between gap-5">
              <Skeleton className="min-h-[200px] min-w-56 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
            </div> }
      </div>
      {totalResults != 0 && totalPage != page && <div 
            className="w-full rounded-full my-4 bg-blue-600 text-center cursor-pointer active:scale-95 text-white py-3" 
            onClick={() => {
              setPage(page + 1);
            }}>Load more</div>}
    </div>
  )
}

export default PeoplePage;