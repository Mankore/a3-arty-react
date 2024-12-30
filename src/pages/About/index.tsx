import { CustomSidebar } from "@/shared/layout/CustomSidebar";
import { Page } from "@/shared/layout/Page";

export const About = () => {
  return (
    <Page sidebar={<CustomSidebar></CustomSidebar>}>
      <div className="text-zinc-950 dark:text-white">About</div>
    </Page>
  );
};
