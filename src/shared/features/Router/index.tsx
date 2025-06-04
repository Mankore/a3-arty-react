import { Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { routes } from "@/shared/utils/variables";
import { About } from "@/pages/About";

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.base}>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
      </Route>
    </Routes>
  );
};
