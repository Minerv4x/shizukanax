"use client";

import useSWR from "swr";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import ScrollProgress from "@/components/ui/scroll-progress";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

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

  // Animation Variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Faster delay between items
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Faster animation duration
  };

  return (
    
    <div className="anime-list container mx-auto px-4 py-8">
            <ScrollProgress className="top-[65px]" />
      <h2 className="text-2xl font-bold mb-6">Anime List</h2>
      {/* Breadcrumb Section */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Anime List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Iterate through the 'list' of anime grouped by starting letter */}
      {data.data.list.map((group: any, index: any) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when the section is in view
          variants={listVariants}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">{group.startWith}</h3>

          {/* Motion UL for staggered animations */}
          <motion.ul className="list-disc pl-5">
            {group.animeList.map((anime: any) => (
              <motion.li
                key={anime.animeId}
                variants={itemVariants}
                className="mb-2"
              >
                <Link href={`/anime/${anime.animeId}`} className="hover:underline">
                  {anime.title}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ))}
    </div>
  );
}
