import { Page } from "../types";

interface Props {
  show: boolean;
  showEditLink: boolean;
  page: Page;
  editLinkPattern: any;
  relativePath: string;
  editLink: string;
  editLinkText: string;
}

const editLink = ({ editLinkPattern, relativePath, editLink }: Props) => {
  // preset editLink
  if (editLink) {
    return editLink;
  }

  if (typeof editLinkPattern === "function") {
    return editLinkPattern(relativePath);
  }
  return editLinkPattern.replace(":path", relativePath);
};

export default (porps: Props) => {
  const { show, page, showEditLink, editLinkText } = porps;
  return (
    <div class="dark:text-dark-text/[.86]">
      <div class="inline-block text-sm mr-4">🕔 {formatDate(page.date)}</div>

      {page.date != page.update && show ? (
        <div class="inline-block text-sm mr-4">{formatDate(page.update)}</div>
      ) : (
        <span></span>
      )}

      {showEditLink ? (
        <div class="inline-block">
          <span
            class={`\
            pl-2 border-solid border-l-2\
            border-l-blue-1\
            dark:border-l-white/40\
            edit-link-border\
          `}
          />
          <a class={""} href={editLink(porps)} target="_blank">
            {editLinkText}
          </a>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};
