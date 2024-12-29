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
import "./globals.css";
import Image from "next/image"; // Import the Image component
import { motion } from "framer-motion"; // Import framer-motion
import SparklesText from "@/components/ui/sparkles-text";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

// Fetch data utility function
const fetcher = (url: any) => fetch(url).then((res) => res.json());

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

  // Animation Variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Adjust the delay between items
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }, // Faster animation duration
  };

  return (
    <div className="">
      {/* Breadcrumb Navigation */}
      <section className="container mx-auto px-4 py-8">
       <BlurFade>
        {/* Breadcrumb Navigation */}
        <section className="container mx-auto px-4 py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                Home
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="/anime" className="breadcrumb-link">
                  Anime List
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{data.data?.recent?.title || "Recent Episodes"}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Recent Episodes Section */}
          <div className="recent-section mb-12">
            <h2 className="text-2xl font-bold mb-6"></h2>
            <SparklesText text="Recent Episodes" className="text-2xl font-bold mb-6" sparklesCount={10} />
              <motion.div
                className="flex gap-6 overflow-x-auto whitespace-nowrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation when the section is in view
                variants={listVariants}
                style={{ overflowY: 'hidden' }} // Only hide vertical overflow
              >
                {data.data.recent.episodeList.map((episode: any) => (
                  <motion.div
                    key={episode.id || episode.title}
                    className="group relative w-72 flex-shrink-0 rounded-md overflow-hidden shadow-lg"
                    variants={itemVariants}
                    style={{ position: 'relative' }} // Make sure it's positioned properly
                  >
                    <Link href={`/episode${new URL(episode.samehadakuUrl).pathname}`}>
                      <div className="aspect-[16/9] relative">
                        <Image
                          loading="lazy"
                          src={episode.poster}
                          alt={episode.poster ? `${episode.title} Poster` : "Default Alt Text"}
                          fill={true}
                          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-sm"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={episode.poster}
                        />
                              <BorderBeam colorFrom="#d4d3cf" colorTo="#376e5a" className="rounded-sm" />

                        {/* Anime title on hover */}
                        <motion.div
                          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white"
                          transition={{ duration: 0.3 }}
                        >
                          <h1 className="text-xs font-semibold line-clamp-2">{episode.title}</h1>
                          <p className="text-xs">{episode.releasedOn}</p>
                          <p className="text-xs text-gray-300">{episode.description}</p>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
          </div>

          {/* Continue with other sections like Movies and Batch Releases as usual */}
        </section>
      </BlurFade>

        {/* Movies Section */}
        <div className="movie-section mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>
          <motion.div
            className="flex gap-6 overflow-x-auto whitespace-nowrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
            style={{ overflowY: 'hidden' }} // Only hide vertical overflow
          >
            {data.data.movie.animeList.map((movie: any) => (
              <motion.div
                key={movie.id || movie.title}
                className="group relative w-48 flex-shrink-0 rounded-md overflow-hidden shadow-lg"
                variants={itemVariants}
                style={{ position: 'relative' }} // Make sure it's positioned properly
              >
                <Link href={`${new URL(movie.samehadakuUrl).pathname}`} legacyBehavior>
                  <div className="aspect-[9/16] relative"> {/* Aspect ratio 9:16 */}
                    <Image
                      loading="lazy"
                      src={movie.poster}
                      alt={movie.title}
                      fill={true}
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-sm"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={movie.poster}
                    />
                    {/* Anime title on hover */}
                    <motion.div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-xs font-semibold line-clamp-2">{movie.title}</h1>
                      <p className="text-xs text-gray-400">Release Date: {movie.releaseDate}</p>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Batch Releases Section */}
        <div className="batch-section mb-12">
          <h2 className="text-2xl font-bold mb-6">Batch Releases</h2>
          <motion.div
            className="flex gap-6 overflow-x-auto whitespace-nowrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
            style={{ overflowY: 'hidden' }} // Only hide vertical overflow
          >
            {data.data.batch.batchList.map((batch: any) => (
              <motion.div
                key={batch.id || batch.title}
                className="group relative w-48 flex-shrink-0 rounded-md overflow-hidden shadow-lg"
                variants={itemVariants}
                style={{ position: 'relative' }} // Make sure it's positioned properly
              >
                <Link href={`${new URL(batch.samehadakuUrl).pathname}`} legacyBehavior>
                  <div className="aspect-[9/16] relative"> {/* Aspect ratio 9:16 */}
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
                    {/* Anime title on hover */}
                    <motion.div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 text-white"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-xs font-semibold line-clamp-2">{batch.title}</h1>
                      <p className="text-xs text-gray-400">{batch.releasedOn}</p>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
