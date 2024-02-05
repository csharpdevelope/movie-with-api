import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/utils/pageUtils";
import React from "react";

type Prop = {
  currentPage: number;
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationCustom({currentPage, totalPage, setCurrentPage} : Prop) {

  const visiblePages = getVisiblePages(currentPage, totalPage);
  const changeCurrentPage = (page: number) => {
    if (page == currentPage) return;
    setCurrentPage(page);
  }

  return (
    <Pagination className="flex justify-end" defaultValue={currentPage}>
      <PaginationContent>
        <PaginationItem className='cursor-pointer' onClick={() => {
          if (currentPage == 1) setCurrentPage(totalPage);
          else setCurrentPage(currentPage - 1);
          }}>
          <PaginationPrevious />
        </PaginationItem>
        
        {visiblePages.map(page => (
          page !== 0 ? 
          <PaginationItem key={page + "_pagination"} className='cursor-pointer'>
            <PaginationLink isActive={page === currentPage} onClick={() => changeCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem> : 
          <PaginationItem key={page + "_pagination"}>
            <PaginationEllipsis />
          </PaginationItem>
        ))}
        <PaginationItem className='cursor-pointer' onClick={() => {
          if (currentPage == totalPage) setCurrentPage(1);
          else setCurrentPage(currentPage + 1);
        }}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom;