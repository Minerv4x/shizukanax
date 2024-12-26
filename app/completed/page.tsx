"use client";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Adjust the import path as necessary
import BlurFade from "@/components/ui/blur-fade";

// Fetch function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Completed() {
  const [page, setPage] = useState(1); // State to track the current page
  const { data, error } = useSWR(`/api/completed?page=${page}`, fetcher, {
    keepPreviousData: true, // Prevent re-fetching the previous data during pagination
  }); // Fetch data based on the current page

  if (error) return <div>An error occurred. Please try again later.</div>;

  if (!data || !data.data || !data.data.animeList) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const totalPages = data.pagination.totalPages; // Assuming your API returns total pages

  // Function to handle pagination click events
  const handlePageClick = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  // Function to calculate the range of pages to display in the pagination
  const calculatePaginationRange = (totalPages: number, currentPage: number) => {
    const maxVisiblePages = 5; // Adjust this value for the desired number of visible pages
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if endPage is less than maxVisiblePages
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = calculatePaginationRange(totalPages, page);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Completed Anime</h2>
      {/* Anime List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {data.data.animeList.map((anime: any) => (
          <BlurFade delay={0.25} inView key={anime.animeId}>

            <div className="relative flex-none w-full h-56 mb-4 group">
              <Link href={`/anime/${anime.animeId}`} legacyBehavior>
                <div className="relative w-full h-full">
                  <Image
                    loading="lazy"
                    width={400} // Fixed width for PC
                    height={600} // Fixed height for PC
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full object-cover rounded"
                    />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-2 rounded">
                    <div className="text-center">
                      <h3 className="font-semibold">{anime.title}</h3>
                      <p className="text-sm">{anime.score} | {anime.type}</p>
                      <p className="text-sm">{anime.status}</p>
                    </div>
                  </div>
                </div>
              </Link>
              {/* Anime genres section, visible on hover */}
              <div className="absolute bottom-0 left-0 w-full p-2 rounded-b bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-left text-white px-2">Genres:</p>
                <div className="flex flex-wrap gap-2 px-2">
                  {anime.genreList?.map((genre: any) => (
                    genre.animeId ? ( // Check if genre.animeId is defined
                      <Link key={genre.animeId} href={genre.animeId} legacyBehavior>
                        <p className="text-xs text-gray-200 hover:text-primary">{genre.title}</p>
                      </Link>
                    ) : (
                      <p key={genre.title} className="text-xs text-gray-200">{genre.title}</p>
                    )
                  ))}
                </div>
              </div>
            </div>
                  </BlurFade>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(Math.max(page - 1, 1)); // Decrement page
              }}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(1); // Go to first page
                  }}
                  isActive={page === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && <PaginationEllipsis />}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <PaginationItem key={startPage + index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(startPage + index); // Click to go to the page
                }}
                isActive={page === startPage + index}
              >
                {startPage + index}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(totalPages); // Go to last page
                  }}
                  isActive={page === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(Math.min(page + 1, totalPages)); // Increment page
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
