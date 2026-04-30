import styles from './page.module.css';

export default function Home() {
  // Access environment variables
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            Dylan Hawkins
          </h1>
          <p className={styles.subtitle}>
            Software Engineer | Full Stack Developer
          </p>
        </header>

        {/* Projects Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            My Projects
          </h2>
          <div className={styles.projectGrid}>
            
            {/* This Portfolio Website */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>Portfolio Website</h3>
              <p className={styles.projectDescription}>
                This site! Built with Next.js and deployed on Vercel with automatic CI/CD from GitHub.
              </p>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${styles.tagNextJS}`}>Next.js</span>
                <span className={`${styles.tag} ${styles.tagReact}`}>React</span>
                <span className={`${styles.tag} ${styles.tagTailwind}`}>Tailwind</span>
                <span className={`${styles.tag} ${styles.tagVercel}`}>Vercel</span>
              </div>
              {githubUsername && githubRepo && (
                <a 
                  href={`https://github.com/${githubUsername}/${githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  View Source →
                </a>
              )}
            </div>

            {/* Project Card 1 */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>Project One</h3>
              <p className={styles.projectDescription}>
                Description of your amazing project goes here.
              </p>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${styles.tagReact}`}>React</span>
                <span className={`${styles.tag} ${styles.tagNode}`}>Node.js</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>Project Two</h3>
              <p className={styles.projectDescription}>
                Another cool project you've built.
              </p>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${styles.tagPython}`}>Python</span>
                <span className={`${styles.tag} ${styles.tagML}`}>ML</span>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>
            Get In Touch
          </h2>
          <div className={styles.buttonContainer}>
            <a 
              href={`mailto:${email}`}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Email Me
            </a>
            <a 
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
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