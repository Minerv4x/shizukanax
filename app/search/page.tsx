"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

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

export default function Search() {
  const searchParams = useSearchParams(); // Get query parameters
  const query = searchParams.get("q") || ""; // Extract 'q' parameter

  // Use SWR to fetch data
  const { data, error } = useSWR<SearchResponse>(
    query ? `/api/search?q=${query}` : null,
    fetcher
  );

  return (
    <div className="p-4">
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
              <Link href={`/anime/${item.animeId}`} className="shrink-0">
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
        <div></div>
      )}
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import useSWR from "swr";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // Define types for the response and anime item
// interface Genre {
//   title: string;
//   genreId: string;
//   href: string;
//   samehadakuUrl: string;
// }

// interface Anime {
//   title: string;
//   poster: string;
//   score: string;
//   status: string;
//   animeId: string;
//   href: string;
//   samehadakuUrl: string;
//   genreList: Genre[];
// }

// interface SearchResponse {
//   statusCode: number;
//   statusMessage: string;
//   ok: boolean;
//   data: {
//     animeList: Anime[];
//   };
// }

// // Fetcher function to get data from the API
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function Search() {
//   const [searchTerm, setSearchTerm] = useState(""); // Manage search input
//   const [query, setQuery] = useState(""); // Query state to trigger SWR fetch
//   const [hasSearched, setHasSearched] = useState(false); // Flag to track if search has been performed

//   // Use SWR to fetch data when the query changes
//   const { data, error } = useSWR<SearchResponse>(
//     query ? `/api/search?q=${query}` : null, // Only fetch if query is not empty
//     fetcher
//   );

//   const handleSearch = () => {
//     setQuery(searchTerm); // Set query to the input value
//     setHasSearched(true); // Mark that a search has been performed
//   };

//   // Handle key press for the input
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch(); // Call handleSearch when Enter is pressed
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4 flex w-full max-w-sm items-center space-x-2">
//         <Input
//           type="text"
//           placeholder="Search Anime"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
//           onKeyDown={handleKeyDown} // Add key down event handler
//           className="w-full"
//         />
//         <Button type="button" onClick={handleSearch}>
//           Search
//         </Button>
//       </div>

//       {/* Display loading state after search is initiated */}
//       {hasSearched && data === undefined && <div>Loading...</div>}

//       {/* Display error state after search is initiated */}
//       {hasSearched && error && <div>Error fetching data</div>}

//       {/* Display search results or no results found message */}
//       {hasSearched && data?.ok && data.data.animeList.length > 0 ? (
//         <div className="space-y-4">
//           {data.data.animeList.map((item) => (
//             <div
//               key={item.animeId}
//               className="flex flex-col items-start gap-4 border-b pb-4 md:flex-row"
//             >
//               {/* Anime Image */}
//               <Link href={`/anime/${item.animeId}`} className="shrink-0">
//                 <Image
//                   src={item.poster}
//                   alt={item.title}
//                   height={150}
//                   width={100}
//                   className="h-48 w-32 object-cover"
//                 />
//               </Link>

//               {/* Anime Data */}
//               <div className="flex flex-col justify-between">
//                 <h3 className="text-lg font-semibold">{item.title}</h3>
//                 <p className="text-sm">Score: {item.score}</p>
//                 <p className="text-sm">Status: {item.status}</p>
//                 <Link
//                   href={`/anime/${item.animeId}`}
//                   className="text-blue-500 hover:underline"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         hasSearched && <div>No results found.</div>
//       )}
//     </div>
//   );
// }