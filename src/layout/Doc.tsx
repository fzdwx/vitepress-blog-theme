import { Page } from "@/types";
import { DefaultTheme, useData, useRoute } from "vitepress";
import VPDoc from "vitepress/dist/client/theme-default/components/VPDoc.vue";
import PageMeta from "../components/PageMeta.vue";
import SidebarVue from "./Sidebar.vue";

const title = (page: Page | undefined) => {
  if (!page) return <div></div>;

  return (
    <header class="post-title center">
      <h1>{page.title}</h1>
    </header>
  );
};

const meta = (page: Page | undefined) => {
  if (!page) return <div></div>;
  return (
    <div>
      <PageMeta showEditLink={true} page={page} class="center mt-10 md:mt-6" />
    </div>
  );
};

export default () => {
  const route = useRoute();
  const page = computed(() => getPage(route.path));
  const { theme } = useData();

  const docGroups = computed<Map<string, Page[]>>(() => {
    const pages = getPages("doc", theme.value);
    const groups: Map<string, Page[]> = new Map();
    pages.map((page) => {
      const group = page.frontmatter.group ? page.frontmatter.group : "Others";
      if (groups.get(group) === undefined) {
        groups.set(group, [page]);
      } else {
        groups.get(group)?.push(page);
      }
    });
    return groups;
  });

  const sidebarGroups = computed(() => {
    const siderBars: DefaultTheme.SidebarItem[] = [];
    docGroups.value.forEach((pages, group) => {
      const item: DefaultTheme.SidebarItem = {
        text: group,
        items: pages
          .sort((a, b) => {
            if (a.frontmatter.order === undefined) return -1;
            if (b.frontmatter.order === undefined) return 1;
            return b.frontmatter.order - a.frontmatter.order;
          })
          .map((page) => {
            return {
              text: page.title,
              link: page.url,
            };
          }),
      };
      siderBars.push(item);
    });

    return siderBars;
  });

  return (
    <div class={"center"}>
      <SidebarVue sidebarGroups={sidebarGroups.value} open={false} hasSidebar />
      <VPDoc class={"  prose dark:prose-invert"}>
        {{
          "doc-before": () => {
            return (
              <div class={" not-prose doc-meta "}>
                {title(page.value)}
                {meta(page.value)}
              </div>
            );
          },
        }}
      </VPDoc>
    </div>
  );
};
