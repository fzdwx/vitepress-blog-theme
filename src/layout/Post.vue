<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed } from "vue";
import PageMeta from "../components/PageMeta.vue";
import { getPage } from "../utils/core";
import MainContent from "../components/MainContent";

const route = useRoute();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);

const page = computed(() => {
  return getPage(route.path);
});
</script>

<template>
  <MainContent>
    <header class="post-title text-center">
      <h1>{{ page.title }}</h1>
    </header>
    <PageMeta :show-edit-link="true" :page="page" />
    <Content
      class="post-content vp-doc prose dark:prose-invert"
      :class="pageName"
    />
  </MainContent>
</template>

<style scoped>
@media screen and (min-width: 600px) {
  .post-content {
    @apply max-w-[900px] min-w-[700px] xl:mr-20 xl:ml-20;
  }
}

@media (min-width: 1480px) {
  .post-content {
    min-width: 640px;
  }
}
</style>
