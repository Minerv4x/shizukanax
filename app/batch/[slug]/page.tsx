"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const params = useParams<{ slug: string }>();
  console.log("Slug:", params?.slug);

  // Construct API URL based on slug parameter
  const apiUrl = params?.slug ? `/api/batch/${params.slug}` : null;

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
  const downloadFormats = seriesData?.data?.downloadUrl?.formats || [];

  // Extract relevant anime data
  const {
    title,
    poster,
    score,
    japanese,
    english,
    synopsis,
    genreList,
    aired,
  } = seriesData?.data || {};

  return (
    <div className="container mx-auto px-4 py-6">
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
          <p className="text-lg font-semibold mb-2">Score: {score}</p>
          <p className="text-lg mb-2">Aired: {aired}</p>
          <p className="text-lg mb-4">Status: {seriesData?.data?.status}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Genres:</h3>
            <ul className="list-disc pl-6">
              {genreList?.map((genre:any) => (
                <li key={genre.genreId}>
                  <Link href={`${new URL(genre.samehadakuUrl).pathname}`} className="text-blue-500">
                    {genre.title}
                  </Link>
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

      {/* Download Links Section */}
      <div className="space-y-8 mt-8">
        <h3 className="text-xl font-semibold">Download Links:</h3>
        {downloadFormats.length > 0 ? (
          downloadFormats.map((format:any, formatIndex:any) => (
            <div key={formatIndex} className="border-b pb-3 mb-3">
              <h4 className="text-lg font-medium mb-2">{format.title}</h4>
              <div className="space-y-6">
                {format.qualities.map((quality:any, qualityIndex:any) => (
                  <div key={qualityIndex}>
                    <h5 className="text-md font-semibold mb-2">{quality.title}</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {quality.urls && quality.urls.length > 0 ? (
                        quality.urls.map((urlObj:any, urlIndex:any) => (
                          <Button
                            key={urlIndex}
                            variant="secondary"
                            className="w-full rounded-lg py-2 px-4 transition-colors"
                            onClick={() => window.open(urlObj.url, "_blank")}
                          >
                            {urlObj.title}
                          </Button>
                        ))
                      ) : (
                        <p className="text-gray-500">No links available for this quality.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No download links available.</p>
        )}
      </div>
    </div>
  );
}
