<script setup lang="ts">
import { Page } from "../types";
import PageListItem from "./PageListItem";

defineProps<{
  pages: Page[];
}>();

const showCover = (page: Page) => {
  return page.frontmatter.cover !== undefined;
};

const position = (page: Page) => {
  if (page.frontmatter.cover && page.frontmatter.cover.position) {
    return page.frontmatter.cover.position;
  }
  return "top";
};
</script>

<template>
  <div class="pages main-content">
    <div class="post-entry mr-10 ml-10" v-for="page of pages" :class="{}">
      <PageListItem
        :position="position(page)"
        :showCover="showCover(page)"
        :page="page"
      />
      <a class="entry-link" :aria-label="page.title" :href="page.url"></a>
    </div>
  </div>
</template>
