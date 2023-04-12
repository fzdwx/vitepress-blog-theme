<script setup lang="ts">
import { useUrlSearchParams } from "@vueuse/core";
import { useData, useRouter } from "vitepress";
import { ref } from "vue";
import { Page } from "../types";
import { getPages, tagsUrl } from "../utils";

import PageList from "./../components/PageList.vue";

const { layout, tag } = useUrlSearchParams<Record<string, string>>();

const { theme } = useData();

const state = ref<{
  layout: string;
  tag: string;
  allPages: Page[];
  currentPages: Page[];
  tags: Set<string>;
}>({
  layout: layout,
  tag: tag,
  allPages: getPages(layout, theme.value),
  currentPages: [],
  tags: new Set<string>(),
});

const refreshTags = async () => {
  state.value.tags = new Set<string>(
    state.value.allPages.map((page) => page.frontmatter.tags).flat()
  );
};

const refreshCurrentPages = async (tag: string) => {
  state.value.currentPages = tag
    ? state.value.allPages.filter((page) => {
        return page.frontmatter.tags?.includes(tag);
      })
    : state.value.allPages;
};

const refresh = async (tag: string) => {
  refreshTags();
  refreshCurrentPages(tag);
};

const resetTag = (tag: string) => {
  if (tag !== state.value.tag) {
    state.value.tag = tag;
    refreshCurrentPages(tag);
  }
};

const route = useRouter();
route.onAfterRouteChanged = (to: string) => {
  const { layout, tag } = useUrlSearchParams<Record<string, string>>();
  state.value.tag = tag;
  if (layout !== state.value.layout) {
    state.value.layout = layout;
    state.value.allPages = getPages(layout, theme.value);
    refresh(tag);
  } else {
    resetTag(tag);
  }
};

const { frontmatter } = useData();

refresh(state.value.tag);
</script>

<template>
  <div class="Tags">
    <main>
      <header class="ml-10 md:ml-8">
        <h1>
          {{ frontmatter.layoutTitleMap[state.layout] }}
          <span v-if="state.tag">:</span>
          <span class="pl-3 text-2xl">{{ state.tag }}</span>
        </h1>
      </header>
      <nav class="tag-list ml-10 md:ml-8 main-content">
        <a
          v-for="tag in state.tags"
          :href="tagsUrl(state.layout, tag)"
          @click="resetTag(tag)"
          :class="{ 'text-cyna-3': tag === state.tag }"
          class="tag"
          >{{ tag }}</a
        >
      </nav>
      <div class="tags-content">
        <div class="page-item-container">
          <div class="main">
            <PageList :pages="state.currentPages" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.Tags {
  display: flex;
  justify-content: center;
}

.tag {
  @apply px-4 py-2 mx-4 my-1;
  @apply bg-slate-300/30 dark:bg-slate-700/70 rounded-lg text-sm;
  @apply hover:text-cyna-3;
  display: inline-block;
}

.icon {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.tags-content {
  padding-top: 20px;
  margin-top: 20px;
}

@media (min-width: 640px) {
  .tags-content {
    padding-left: 14px;
    padding-right: 14px;
  }
}

@media (min-width: 960px) {
  .tags-content {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.page-item-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .page-item-container {
    flex-direction: row;
  }
}
</style>
