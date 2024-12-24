"use client";
import useSWR from "swr";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RevealWrapper } from "next-reveal";
import Image from "next/image";
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

// Fetch data function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const params = useParams<{ slug: string }>();
  const [page, setPage] = useState(1); // State to track the current page
  const apiUrl = params?.slug ? `/api/genres/${params.slug}?page=${page}` : null; // Include page in the API URL
  const { data, error } = useSWR(apiUrl, fetcher);

  // Handling errors or loading state
  if (error) return <div className="text-red-500 text-center">An error has occurred. Are You Offline?</div>;

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );

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
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ul className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/">
              <a className="hover:text-gray-800 dark:hover:text-gray-300">Home</a>
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/genres">
              <a className="hover:text-gray-800 dark:hover:text-gray-300">Genres</a>
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 dark:text-gray-300">{data.genreName}</li>
        </ul>
      </nav>

      <div className="mb-8">
        <RevealWrapper>
          {/* Create a responsive grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {data?.data?.animeList?.map((anime:any) => (
              <div key={anime.animeId} className="relative flex-none w-full h-56 mb-4 group">
                <Link href={`/anime/${anime.animeId}`}>
                  {/* Image container with text overlay */}
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
                  <div className=" flex flex-wrap gap-2 px-2">
                    {anime.genreList?.map((genre:any) => (
                      <Link key={genre.genreId} href={`${genre.genreId}`}>
                        <p className="text-xs text-gray-200 hover:text-primary">{genre.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageClick(Math.max(page - 1, 1))}
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
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
