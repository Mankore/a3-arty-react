import { ArtilleryText, TargetText } from "./CustomText";
export const HowTo = () => {
  return (
    <section>
      <h1 className="text-3xl">How To</h1>

      <ul className="mt-4 text-lg">
        <li>
          <b>Step 1:</b> Place <ArtilleryText /> marker
        </li>
        <li>
          <b>Step 2:</b> Place <TargetText /> marker
        </li>
        <li>
          <b>Step 3:</b> Hover over <TargetText /> marker ( or click it ) to
          view solution
        </li>
      </ul>
    </section>
  );
};
