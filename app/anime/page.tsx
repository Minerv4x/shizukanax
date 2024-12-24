"use client";

import useSWR from "swr";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AnimeList() {
  const { data, error } = useSWR("/api/anime", fetcher);

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
    <div className="anime-list container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Anime List</h2>
        {/* Breadcrumb Section */}
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Anime List</BreadcrumbPage>
    </BreadcrumbItem>
    <BreadcrumbItem>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

      {/* Iterate through the 'list' of anime grouped by starting letter */}
      {data.data.list.map((group, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{group.startWith}</h3>

<RevealWrapper>
          <ul className="list-disc pl-5">
            {group.animeList.map((anime) => (
              <li key={anime.animeId}>
                <Link href={`/anime/${anime.animeId}`} className=" hover:underline">
                  {anime.title}
                </Link>
              </li>
            ))}
          </ul>
</RevealWrapper>
        </div>
      ))}
    </div>
  );
}
