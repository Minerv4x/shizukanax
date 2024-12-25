"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion"; // Import framer-motion

// Fetch data function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR("/api/genres", fetcher);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Delay between each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Handling errors or loading state
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

  // Render the genres with a unique key
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="container mx-auto p-4">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Genre List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Genre Buttons Section */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {data?.data?.genreList?.map((genres: any) => (
          <motion.div
            key={genres.genreId}
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <Button variant="secondary">
              <Link href={`/genres/${genres.genreId}`}>
                <p className="text-center">{genres.title}</p>
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
