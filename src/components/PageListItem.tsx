import PageListItemCover from "./PageListItemCover";
import PageListItemContent from "./PageListItemContent";
import { Page } from "../types";
import { r, rs } from "../utils/core";

interface Props {
  showCover: boolean;
  position: "left" | "right" | "top";
  page: Page;
}

const getCoverTop = ({ position, page }: Props) => {
  return (
    <>
      {r(position === "top", () => (
        <div class={"cover-top center mb-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ))}

      {r(position === "left", () => (
        <div class={"cover-left row-span-3 pr-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ))}
    </>
  );
};

const getCoverBottom = ({ position, page }: Props) => {
  return (
    <>
      {r(position === "right", () => (
        <div class={"cover-right row-span-3 pl-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ))}
    </>
  );
};

export default (props: Props) => {
  const { showCover, position, page } = props;

  return r(
    showCover,
    () => {
      return (
        <div class={rs(position !== "top", "grid grid-rows grid-flow-col")}>
          {getCoverTop(props)}

          <div class={rs(position !== "top", "col-span-3")}>
            <PageListItemContent
              class="PageListItemContent"
              hasCover={showCover}
              page={page}
            />
          </div>

          {getCoverBottom(props)}
        </div>
      );
    },
    () => {
      return (
        <div>
          <PageListItemContent
            class="PageListItemContent"
            hasCover={showCover}
            page={page}
          />
        </div>
      );
    }
  );
};
