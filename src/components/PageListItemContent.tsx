import { formatDesc } from "../utils/core";
import { Page } from "../utils/content.data";
import PageMeta from "../components/PageMeta.vue";
interface Props {
  hasCover: boolean;
  page: Page;
}

export default ({ hasCover, page }: Props) => {
  console.log(hasCover);

  return (
    <div class={hasCover ? "grid grid-flow-row-dense" : ""}>
      <div class="entry-header">
        <h2 class="text-2xl">{page.title}</h2>
      </div>
      <div class={`entry-content  123 ${hasCover ? " line-3 " : ""} `}>
        <p class="text-4">{formatDesc(page.desc)}</p>
      </div>
      <div class={"entry-footer"}>
        <PageMeta showEditLink={false} page={page} />
      </div>
    </div>
  );
};
