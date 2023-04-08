import { Page } from "../types";

interface Props {
  page: Page;
  position: "left" | "right" | "top";
}

export default ({ page, position }: Props) => {
  const cover = page.frontmatter.cover;
  if (!cover) {
    return <div />;
  }

  return (
    <div className={`page-meta-cover ${"page-meta-cover-" + position}`}>
      <img class={position === "top" ? "" : "h-[160px]"} src={cover.image} />
    </div>
  );
};
