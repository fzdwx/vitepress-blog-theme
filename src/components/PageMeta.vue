<script setup lang="ts">
import { useData } from "vitepress";
import { Page } from "../utils/content.data";
import { formatDate, tagsUrl } from "../utils/core";

const data = useData();
const layout = data.page.value.frontmatter.layout;

const props = defineProps<{
  page: Page;
  showEditLink: boolean;
}>();

const editLink = () => {
  if (props.page.frontmatter.editLink) {
    return props.page.frontmatter.editLink;
  }

  if (typeof data.theme.value.editLink.pattern === "function") {
    return data.theme.value.editLink.pattern(data.page.value.relativePath);
  }
  return data.theme.value.editLink.pattern.replace(
    ":path",
    data.page.value.relativePath
  );
};
</script>

<template>
  <div class="pageMeta flex items-center dark:text-dark-text/[.86]">
    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zM9 9a1 1 0 011-1h1a1 1 0 110 2H10a1 1 0 01-1-1zM9 11a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zM9 5a1 1 0 100 2 1 1 0 000-2z"
      ></path>
    </svg>
    <span class="text-sm mr-4">{{ formatDate(page.date) }}</span>

    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zM5 11a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zM14 8a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM10 5a1 1 0 100 2 1 1 0 000-2z"
      ></path>
    </svg>
    <span class="text-sm mr-4">{{ formatDate(page.update) }}</span>

    <div class="flex flex-wrap" v-if="page.frontmatter.tags">
      <div
        v-for="tag in page.frontmatter.tags"
        class="px-2 py-1 bg-pink1 dark:bg-slate-300/20 rounded-lg text-xs mr-2"
      >
        <a :href="tagsUrl(layout, tag)"> {{ tag }} </a>
      </div>
    </div>
    <div v-if="showEditLink">
      <span class="editLink"></span>
      <a :href="editLink()" target="_blank">
        {{ data.theme.value.editLink?.text }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.editLink {
  @apply pl-2;
  @apply border-l-blue-1 border-solid border-l-2;
  @apply dark:border-l-white/40;
}
</style>
