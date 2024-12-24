"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Import Breadcrumb components
import Link from "next/link";
import useSWR from "swr";
import { RevealWrapper } from "next-reveal";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./globals.css";
import Image from "next/image"; // Import the Image component

// Fetch data utility function
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IndexPage() {
  const { data, error } = useSWR("/api/home", fetcher);

  if (error) return <div>An error has occurred. Are You Offline?</div>;

  if (!data) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle API error responses
  if (!data.ok || data.statusCode === 404) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl text-red-500">Oops! Content not found.</div>
          <p className="text-gray-500 dark:text-gray-400">We couldn't load the content. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <section className="container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/anime">
                Anime
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{data.data?.recent?.title || "Recent Episodes"}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Recent Episodes Section */}
        <div className="recent-section mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Episodes</h2>
          <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: "100%" }}>
            <div className="flex gap-6 whitespace-nowrap">
              {data.data.recent.episodeList.map((episode) => (
                <RevealWrapper key={episode.id || episode.title}> {/* Use episode.title as a fallback */}
                  <div className="group relative w-72 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                    <Link href={`/episode${new URL(episode.samehadakuUrl).pathname}`}>
                      <div className="aspect-[16/9] relative">
                        <Image
                          loading="lazy"
                          src={episode.poster}
                          alt={episode.poster ? `${episode.title} Poster` : "Default Alt Text"}
                          fill={true}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={episode.poster}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white">
                          <h3 className="text-base font-semibold line-clamp-2">{episode.title}</h3>
                          <p className="text-xs">{episode.releasedOn}</p>
                          <p className="text-xs text-gray-300">{episode.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </SimpleBar>
        </div>

        {/* Batch Releases Section */}
        <div className="batch-section mb-12">
          <h2 className="text-2xl font-bold mb-6">Batch Releases</h2>
          <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: "100%" }}>
            <div className="flex gap-6 whitespace-nowrap">
              {data.data.batch.batchList.map((batch) => (
                <RevealWrapper key={batch.id || batch.title}> {/* Use batch.title as a fallback */}
                  <div className="group relative w-80 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                    <Link href={`${new URL(batch.samehadakuUrl).pathname}`}>
                      <div className="aspect-[16/9] relative">
                        <Image
                          loading="lazy"
                          src={batch.poster}
                          alt={batch.title}
                          fill={true}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={batch.poster}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white">
                          <h3 className="text-base font-semibold line-clamp-2">{batch.title}</h3>
                          <p className="text-xs text-gray-400">{batch.releasedOn}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </SimpleBar>
        </div>

        {/* Upcoming Movies Section */}
        <div className="movie-section mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>
          <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: "100%" }}>
            <div className="flex gap-6 whitespace-nowrap">
              {data.data.movie.animeList.map((movie) => (
                <RevealWrapper key={movie.id || movie.title}> {/* Use movie.title as a fallback */}
                  <div className="group relative w-80 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                    <Link href={`${new URL(movie.samehadakuUrl).pathname}`}>
                      <div className="aspect-[16/9] relative">
                        <Image
                          loading="lazy"
                          src={movie.poster}
                          alt={movie.title}
                          fill={true}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={movie.poster}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white">
                          <h3 className="text-base font-semibold line-clamp-2">{movie.title}</h3>
                          <p className="text-xs text-gray-400">Release Date: {movie.releaseDate}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </SimpleBar>
        </div>
      </section>
    </div>
  );
}
