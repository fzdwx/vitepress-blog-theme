<script setup lang="ts">
import { Page } from "../utils/content.data";
import PageListItemCover from "./PageListItemCover";
import PageListItemContent from "./PageListItemContent";

defineProps<{
  pages: Page[];
}>();

const show = (page: Page) => {
  return page.frontmatter.cover !== undefined;
};

const position = (page: Page) => {
  if (page.frontmatter.cover.position) {
    return page.frontmatter.cover.position;
  }
  return "top";
};
</script>

<template>
  <div class="pages main-content">
    <div
      class="post-entry mr-10 ml-10"
      v-for="page of pages"
      :class="{
        'grid grid-rows grid-flow-col ': show(page) && position(page) !== 'top',
      }"
    >
      <!--  cover top  -->
      <div v-if="show(page) && position(page) === 'top'" class="center mb-2">
        <PageListItemCover :position="position(page)" :page="page" />
      </div>

      <!--  cover left  -->
      <div
        v-if="show(page) && position(page) === 'left'"
        class="row-span-3 pr-2"
      >
        <PageListItemCover :position="position(page)" :page="page" />
      </div>

      <!--  item content -->
      <div
        :class="{
          'col-span-3': show(page) && position(page) !== 'top',
        }"
      >
        <PageListItemContent :hasCover="show(page)" :page="page" />
      </div>

      <!--  cover right -->
      <div
        v-if="show(page) && position(page) === 'right'"
        class="pl-2 row-span-3"
      >
        <PageListItemCover :position="position(page)" :page="page" />
      </div>
      <a class="entry-link" aria-label="123" :href="page.url"></a>
    </div>
  </div>
</template>
