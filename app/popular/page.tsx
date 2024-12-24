"use client";
import useSWR from "swr";
import { RevealWrapper } from 'next-reveal';
import Link from "next/link";
import Image from "next/image";

const fetcher = (url:any) => fetch(url).then((res) => res.json());

export default function Page() {
    const { data, error } = useSWR("/api/popular", fetcher);

    if (error) return <div>An error has occurred. Are You Offline?</div>;

    if (!data)
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      );

    return (
        <div className="p-4 max-w-[1200px] mx-auto"> {/* Restrict max width for the page */}
            <div className="recent-section mb-12">
                <h2 className="text-2xl font-bold mb-6">Recent Episodes</h2>
                <div className="grid gap-4 grid-cols-2 md:gap-6 md:grid-cols-4">
                    {data.data.animeList.map((popular:any) => (
                        <RevealWrapper key={`${popular.episodeId}-${popular.title}`}>
                            <div className="lok">
                                <Link
                                    href={`${new URL(popular.samehadakuUrl).pathname}`}
                                    className="block group"
                                >
                                    <div className="relative w-full rounded-md overflow-hidden shadow-lg">
                                        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                                            <Image
                                                src={popular.poster}
                                                alt={popular.title}
                                                fill={true}	
                                                blurDataURL={popular.poster}
                                                loading="lazy"	
                                                placeholder="blur"	
                                                style={{ objectFit: "cover" }}	
                                                className="h-full w-full"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                            {/* Text Overlay */}
                                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                                <h3 className="text-lg font-bold">{popular.title}</h3>
                                                <p className="text-sm">{popular.releasedOn}</p>
                                                <p className="text-xs">{popular.type} | Score: {popular.score}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </RevealWrapper>
                    ))}
                </div>
            </div>
        </div>
    );
}