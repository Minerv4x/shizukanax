import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <section className="flex h-full items-center p-16 ">
        <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
          <div className="max-w-md text-center">
            <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldnt find this page.
            </p>
            <p className="mb-8 mt-4 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              href="/"
              className="rounded px-8 py-3 font-semibold dark:bg-gray-700 light:bg-gray-800"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}