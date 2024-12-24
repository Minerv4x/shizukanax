"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Custom Button component
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
// Fetch data utility function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EpisodePage() {
  const { slug } = useParams<{ slug: string }>(); // Destructure the slug directly from params

  const apiUrl = slug ? `/api/episode/${slug}` : null;
  const { data: seriesData, error: seriesError } = useSWR(apiUrl, fetcher);

  const [videoUrl, setVideoUrl] = useState<string>("");

  // Effect to update video URL based on fetched data
  useEffect(() => {
    if (seriesData?.data?.defaultStreamingUrl) {
      setVideoUrl(seriesData.data.defaultStreamingUrl);
    }
  }, [seriesData]);

  const handleResolutionChange = (selectedServer: string) => {
    const defaultServer = seriesData?.data?.defaultStreamingUrl;

    if (selectedServer === seriesData?.data?.defaultServer) {
      setVideoUrl(defaultServer); // Use default server URL
    } else {
      fetch(`/api/server/${selectedServer}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          const newUrl = data?.data?.url || defaultServer; // Fallback to default if no URL
          setVideoUrl(newUrl);
        })
        .catch(() => {
          setVideoUrl(defaultServer); // Fallback to default if error occurs
        });
    }
  };

  // Loading state
  if (!seriesData) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (seriesError) {
    return <div className="text-center text-red-500">An error occurred. Please try again.</div>;
  }

  const episode = seriesData.data;
  const serverQualities = episode.server?.qualities || [];
  const download = episode.downloadUrl; // Contains download URL data

  // Filter out invalid server qualities
  const validServerQualities = serverQualities.filter((quality:any) => quality.serverList?.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">

        {/* Breadcrumb Section */}
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink >Episode</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{episode.title}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>


        {/* Video Player Section */}
        <div className="relative w-full h-0 pb-[56.25%] mb-8">
          {videoUrl ? (
            videoUrl.endsWith(".mp4") ? (
              <video
                key={videoUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                controls
                src={videoUrl}
              />
            ) : (
              <iframe
                key={videoUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                allowFullScreen
                src={videoUrl}
                frameBorder="0"
              />
            )
          ) : (
            <div className="text-center text-red-500">Unable to load video.</div>
          )}
        </div>

        {/* Episode Information */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{episode.title}</h2>
            <img
              src={episode.poster}
              alt={`${episode.title} Poster`}
              className="rounded-lg shadow-lg w-full sm:w-1/3 mx-auto mb-4"
            />
            <p className="text-lg mb-4">Released On: {episode.releasedOn}</p>
            <p className="text-lg font-semibold mb-2">Synopsis:</p>
            <p className="text-gray-600">{episode.synopsis.paragraphs.join(" ")}</p>
          </div>

          {/* Server Resolution Options */}
          <div className="flex-1">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Available Resolutions:</h3>
              {validServerQualities.length > 0 ? (
                <div className="space-y-4">
                  {validServerQualities.map((quality:any, index:any) => (
                    <div key={index}>
                      <h4 className="text-lg font-medium">{quality.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {quality.serverList.map((server:any, i:any) => (
                          <Button

                            key={i}
                            onClick={() => handleResolutionChange(server.serverId)}
                            className="w-full sm:w-auto"
                            variant="secondary"
                          >
                            {server.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No valid server qualities available. Using default video source.</p>
              )}
            </div>
          </div>
        </div>

        {/* Download Links Section */}
        <div className="space-y-8 mt-8">
          <h3 className="text-xl font-semibold">Download Links:</h3>
          {download && download.formats.length > 0 ? (
            download.formats.map((format:any, index:any) => (
              <div key={index} className="border-b pb-4 mb-4">
                <h4 className="text-lg font-medium mb-2">{format.title}</h4>
                <div className="space-y-6">
                  {format.qualities.map((quality:any, qIndex:any) => (
                    <div key={qIndex}>
                      <h5 className="text-md font-semibold mb-2">{quality.title}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {quality.urls && quality.urls.length > 0 ? (
                          quality.urls.map((url:any, uIndex:any) => (
                            <Button
                              key={uIndex}
                              variant="secondary"
                              className="w-full rounded-lg py-2 px-4 transition-colors"
                              onClick={() => window.open(url.url, "_blank")}
                            >
                              {url.title}
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
    </div>
  );
}
