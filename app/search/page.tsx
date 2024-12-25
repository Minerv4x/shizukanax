"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

// Define types for the response and anime item
interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

interface Anime {
  title: string;
  poster: string;
  score: string;
  status: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
}

interface SearchResponse {
  statusCode: number;
  statusMessage: string;
  ok: boolean;
  data: {
    animeList: Anime[];
  };
}

// Fetcher function to get data from the API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SearchContent() {
  const searchParams = useSearchParams(); // Get query parameters
  const query = searchParams.get("q") || ""; // Extract 'q' parameter

  // Use SWR to fetch data
  const { data, error } = useSWR<SearchResponse>(
    query ? `/api/search?q=${query}` : null,
    fetcher
  );

  return (
    (<div className="p-4">
      {/* Display loading state */}
      {data === undefined && <div>Loading...</div>}
      {/* Display error state */}
      {error && <div>Error fetching data</div>}
      {/* Display search results or no results found message */}
      {data?.ok && data.data.animeList.length > 0 ? (
        <div className="space-y-4">
          {data.data.animeList.map((item) => (
            <div
              key={item.animeId}
              className="flex flex-col items-start gap-4 border-b pb-4 md:flex-row"
            >
              {/* Anime Image */}
              <Link href={`/anime/${item.animeId}`} className="shrink-0" legacyBehavior>
                <Image
                  src={item.poster}
                  alt={item.title}
                  height={150}
                  width={100}
                  className="h-48 w-32 object-cover"
                />
              </Link>

              {/* Anime Data */}
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">Score: {item.score}</p>
                <p className="text-sm">Status: {item.status}</p>
                <Link
                  href={`/anime/${item.animeId}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No results found.</div>
      )}
    </div>)
  );
}

export default function Search() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchContent />
    </Suspense>
  );
}
