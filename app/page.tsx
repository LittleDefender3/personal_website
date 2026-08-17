import BackgroundWrapper from "@/app/components/BackgroundWrapper";
import Desktop from "@/app/components/Desktop";
import { getContentTree, getGithubRepoUrl } from "@/app/lib/content";

export default function Home() {
  const files = getContentTree();
  const repoUrl = getGithubRepoUrl();

  return (
    <>
      <BackgroundWrapper />
      <Desktop files={files} repoUrl={repoUrl} />
    </>
  );
}
