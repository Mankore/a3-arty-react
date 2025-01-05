import { CustomSidebar } from "@/shared/ui/layout/CustomSidebar";
import { Page } from "@/shared/ui/layout/Page";
import { Controls } from "./ui/Controls";
import { HowTo } from "./ui/HowTo";
import { Divider } from "@/shared/ui/catalyst/divider";
import { Important } from "./ui/Important";

export const About = () => {
  return (
    <Page sidebar={<CustomSidebar></CustomSidebar>}>
      <div className="text-zinc-950 dark:text-white scroll-x-hidden">
        <Controls />
        <Divider className="my-8" />
        <HowTo />
        <Divider className="my-8" />
        <Important />
      </div>
    </Page>
  );
};
