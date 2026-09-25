import { LibraryExplorer } from "@/components/library-explorer";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <LibraryExplorer />
    </SiteShell>
  );
}
