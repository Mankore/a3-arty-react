import { CustomSidebar } from "@/shared/ui/layout/CustomSidebar";
import { Page } from "@/shared/ui/layout/Page";

export const About = () => {
  return (
    <Page sidebar={<CustomSidebar></CustomSidebar>}>
      <div className="text-zinc-950 dark:text-white">About</div>
    </Page>
  );
};
