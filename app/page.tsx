export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Name
          </h1>
          <p className="text-xl text-gray-600">
            Software Engineer | Full Stack Developer
          </p>
        </header>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            My Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2">Project One</h3>
              <p className="text-gray-600 mb-4">
                Description of your amazing project goes here.
              </p>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Node.js</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2">Project Two</h3>
              <p className="text-gray-600 mb-4">
                Another cool project you've built.
              </p>
              <div className="flex gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Python</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">ML</span>
              </div>
            </div>

            {/* Add more project cards as needed */}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Get In Touch
          </h2>
          <div className="flex justify-center gap-4">
            <a href="mailto:your.email@example.com" 
               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Email Me
            </a>
            <a href="https://github.com/yourusername" 
               className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

{/*import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/}