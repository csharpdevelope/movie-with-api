'use client'

import PersonCard from "@/components/people/PersonCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Actor, getPopularPeople } from "@/lib/getPerson";
import { useEffect, useState } from "react";

function PeoplePage() {

  const [data, setData] = useState<Actor[]>([]);

  async function fetchData() {
    try {
      const popularPeople = await getPopularPeople();
      setData(popularPeople.results);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="mt-20 md:mt-30 2xl:mt-36 mb-10 max-w-[1800px] px-5 lg:px-30 2xl:px-40">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {data.length != 0 ? (
          data.map((person: Actor) => <PersonCard person={person} key={person.id} />)
        ) : <div className="w-full flex justify-between gap-5">
              <Skeleton className="min-h-[200px] min-w-56 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
              <Skeleton className="min-h-[200px] min-w-72 w-96 rounded-xl" /> 
            </div> }
      </div>
    </div>
  )
}

export default PeoplePage;