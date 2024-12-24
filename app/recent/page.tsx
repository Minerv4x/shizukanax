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
import { RevealWrapper } from "next-reveal";

// Fetch function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnimeEpisodes() {
  const [page, setPage] = useState(1); // State to track the current page
  const { data, error } = useSWR(`/api/recent?page=${page}`, fetcher); // Fetch data based on the current page

  if (error) return <div>An error occurred. Please try again later.</div>;

  if (!data || !data.data || !data.data.episodeList) {
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
    setPage(newPage);
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
    <div className="anime-episodes container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Latest Anime Episodes</h2>

      {/* Iterate over the episode list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data.data.episodeList.map((episode: any) => (
    <RevealWrapper key={episode.episodeId}>
      <li className="rounded-lg shadow-md overflow-hidden">
        <Link href={`/anime/${episode.episodeId}`}>
          <div className="relative w-full h-48">
            <Image
              loading="lazy"
              src={episode.poster}
              alt={episode.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 p-2 rounded">
              <h3 className="text-sm font-semibold">{episode.title}</h3>
              <p className="text-sm text-gray-300">{episode.releasedOn}</p>
              <p className="text-sm text-gray-300">Episodes: {episode.episodes}</p>
            </div>
          </div>
        </Link>
      </li>
    </RevealWrapper>
  ))}
</ul>


      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageClick(Math.max(page - 1, 1))}
              disabled={page === 1}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageClick(1)}
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
                onClick={() => handlePageClick(startPage + index)}
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
                  onClick={() => handlePageClick(totalPages)}
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
              onClick={() => handlePageClick(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
