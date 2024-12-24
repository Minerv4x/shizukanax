"use client"
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealWrapper } from "next-reveal";

// Fetch data function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
    const { data, error, isLoading } = useSWR("/api/genres", fetcher);

    // Handling errors or loading state
    if (error) return <div>An error has occurred. Are You Offline?</div>

    if (!data)
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      )

    // Render the genres with a unique key
    return (

        <div className="flex flex-wrap justify-center gap-4 p-4">
            {data?.data?.genreList?.map((genres) => (
                <div key={genres.genreId} className="flex flex-col items-center">
                  <RevealWrapper>

                    <Button variant="secondary">
                        <Link href={`/genres/${genres.genreId}`}>
                            <p className="text-center">{genres.title}</p>
                        </Link>
                    </Button>
                  </RevealWrapper>
                </div>
            ))}
        </div>
    );
}
