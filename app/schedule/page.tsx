"use client";
import Link from "next/link";
import useSWR from "swr";
import "../globals.css";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/blur-fade";

// Fetcher function to retrieve data
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR("/api/schedule", fetcher);

  // Handle error state
  if (error) return <div>An error has occurred. Are You Offline?</div>;

  // Handle loading state
  if (!data)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="size-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Render schedule data
  return (
    <div className="p-4 mx-auto max-w-7xl">

      {data.data.days.map((day: any, index: any) => (
        <div key={`${day.day}-${index}`} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{day.day}</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for staggered effect
            >
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-4 overflow-x-auto">
              {day.animeList.map((anime: any) => (
                <BlurFade delay={0.25} inView key={anime.animeId}>
                <div
                  key={anime.animeId}
                  className="relative flex-none w-40 h-56 mb-1"
                >
                  <Link href={`${new URL(anime.samehadakuUrl).pathname}`}>
                    {/* Image container with text overlay */}
                    <div className="relative w-full h-full">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-full object-cover rounded"
                        />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-2 rounded">
                        <div className="text-center">
                          <h3 className="font-semibold">{anime.title}</h3>
                          <p className="text-sm">{anime.score}</p>
                        </div>
                      </div>
                    </div>
                    {/* Anime genres and link */}
                    <div className="absolute bottom-0 left-0 w-full p-2 rounded-b">
                      <p className="text-xs text-left px-2">Genres: {anime.genres}</p>
                    </div>
                  </Link>
                </div>
                  </BlurFade>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
