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
  <div
    class="page-meta flex items-center"
    :class="{
      'flex-col': layout !== 'home',
    }"
  >
    <div class="dark:text-dark-text/[.86]">
      <div class="inline-block text-sm mr-4">
        🕔 {{ formatDate(page.date) }}
      </div>
      <div
        v-if="layout !== 'home' && page.date != page.update"
        class="inline-block text-sm mr-4"
      >
        {{ formatDate(page.update) }}
      </div>
      <div class="inline-block" v-if="showEditLink">
        <span class="editLink"></span>
        <a :href="editLink()" target="_blank">
          {{ data.theme.value.editLink?.text }}
        </a>
      </div>
    </div>
    <div
      class="meta-tag-list flex flex-wrap"
      :class="{
        'mt-3': layout !== 'home',
        'basis-3/5': layout === 'home',
        'flex-grow': layout === 'home',
      }"
      v-if="page.frontmatter.tags"
    >
      <div
        v-for="tag in page.frontmatter.tags"
        class="px-2 py-1 bg-pink1 dark:bg-slate-300/20 rounded-lg text-xs mr-2"
      >
        <a :href="tagsUrl(layout, tag)"> {{ tag }} </a>
      </div>
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
