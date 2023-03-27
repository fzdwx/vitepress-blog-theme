import PageListItemCover from "./PageListItemCover";
import PageListItemContent from "./PageListItemContent";
import { Page } from "../utils/content.data";

interface Props {
  showCover: boolean;
  position: "left" | "right" | "top";
  page: Page;
}

const getCoverTop = ({ position, page }: Props) => {
  return (
    <>
      {position === "top" ? (
        <div class={"cover-top center mb-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ) : (
        <div />
      )}

      {position === "left" ? (
        <div class={"cover-left row-span-3 pr-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

const getCoverBottom = ({ position, page }: Props) => {
  return (
    <>
      {position === "right" ? (
        <div class={"cover-right row-span-3 pl-2"}>
          <PageListItemCover position={position} page={page} />
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default (props: Props) => {
  const { showCover, position, page } = props;

  return showCover ? (
    <div class={position !== "top" ? "grid grid-rows grid-flow-col" : ""}>
      {getCoverTop(props)}

      <div class={position !== "top" ? "col-span-3" : ""}>
        <PageListItemContent
          class="PageListItemContent"
          hasCover={showCover}
          page={page}
        />
      </div>

      {getCoverBottom(props)}
    </div>
  ) : (
    <div>
      <PageListItemContent
        class="PageListItemContent"
        hasCover={showCover}
        page={page}
      />
    </div>
  );
};
