"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const params = useParams<{ slug: string }>();
  console.log("Slug:", params?.slug);

  // Construct API URL based on slug parameter
  const apiUrl = params?.slug ? `/api/anime/${params.slug}` : null;

  // Use SWR to fetch the data
  const { data: seriesData, error: seriesError } = useSWR(apiUrl, fetcher);

  if (seriesError) {
    return (
      <div className="text-center text-red-500">An error has occurred.</div>
    );
  }

  if (!seriesData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  console.log(seriesData);

  // Extract relevant anime data
  const {
    title,
    poster,
    score,
    japanese,
    english,
    synopsis,
    genreList,
    episodeList,
    aired,
  } = seriesData?.data || {};

  return (
    (<div className="container mx-auto px-4 py-6">
            <Breadcrumb>
<BreadcrumbList>
<BreadcrumbItem>
  <Link href="/" className="breadcrumb-link">
    Home
  </Link>
</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
  <Link href="/" className="breadcrumb-link">
    Home
  </Link>
</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>{title}</BreadcrumbPage>
  </BreadcrumbItem>
  <BreadcrumbItem>
  </BreadcrumbItem>
</BreadcrumbList>
</Breadcrumb>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {/* Flex layout for image and synopsis */}
      <div className="flex flex-col md:flex-row mb-6">
        {/* Image on top for mobile and smaller screens */}
        <div className="w-full mb-4 md:w-1/3 md:mb-0 md:max-w-[250px]">
          <Image
            src={poster}
            alt={title}
            width={400} // Fixed width for PC
            height={600} // Fixed height for PC
            className="w-full rounded-sm object-cover"
            layout="intrinsic" // Maintain aspect ratio
            priority={true} // Prioritize image loading
          />
        </div>

        {/* Synopsis on the right */}
        <div className="w-full md:w-2/3 md:pl-6">
          <p className="text-lg font-semibold mb-2">Score: {score?.value}</p>
          <p className="text-lg mb-2">Aired: {aired}</p>
          <p className="text-lg mb-4">Status: {seriesData?.data?.status}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Genres:</h3>
            <ul className="list-disc pl-6">
              {genreList?.map((genre:any) => (
                <li key={genre.genreId}>
                  <a href={genre.samehadakuUrl} className="text-blue-500">
                    {genre.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Synopsis:</h3>
            <p>{synopsis?.paragraphs?.join(" ")}</p>
          </div>
        </div>
      </div>
      {/* Episodes List */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Episodes:</h3>
        {Array.isArray(episodeList) ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {episodeList.map((episode) => (
              <div
                key={episode.episodeId} // Use episode.episodeId for unique keys
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Link href={`/episode/${episode.episodeId}`} legacyBehavior>
                  <p className="text-blue-500 hover:text-blue-700 font-semibold text-center block">
                    Episode: {episode.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No episodes available.</p>
        )}
      </div>
    </div>)
  );
}