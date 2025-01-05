import { Link } from "@/shared/ui/catalyst/link";
import { ArtilleryText, TargetText } from "./CustomText";

export const Important = () => {
  return (
    <section>
      <h1 className="text-3xl">Important</h1>
      <div className="mt-4 text-lg/8">
        A few important notes:
        <br />
        <ul className="list-outside list-decimal pl-5">
          <li>
            Surface <b>MUST</b> be flat
          </li>
          <li>
            Ideally, <ArtilleryText /> must face the <TargetText />, otherwise
            the barrel <u>WILL</u> change elevation and introduce error
          </li>
          <li>
            When changing any inputs / checkmarks in sidebar, solution will be
            recalculated for all markers
          </li>
          <li>
            Height Adjustment is height difference between <TargetText />
            .z and <ArtilleryText />
            .z
            <ul className="list-outside list-disc pl-5">
              <li>
                For correct solution, put the height difference in there, check
                the height manually in game by hovering over the location on map
              </li>
              <li>
                <b>IF BACKEND IS RUNNING:</b>
                <ul className="list-outside list-disc pl-5">
                  <li>Height will be automatically fetched</li>
                  <li>
                    If you place artillery on an elevated surface, you can use
                    this input to adjust the solution output e.g. if{" "}
                    <ArtilleryText /> is on top of a 20m building, put -20 in
                    Height Adjustment input
                  </li>
                  <li>Backend must return {"{x, y, z}"} in JSON format</li>
                  <li>
                    <u className="text-blue-500">
                      <Link
                        href="https://github.com/Mankore/a3-go-coordinate-server"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Example golang implementation (dirty)
                      </Link>
                    </u>
                  </li>
                  <li>Backend runs on http://127.0.0.1:3000</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};
