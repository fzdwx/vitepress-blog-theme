<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import PageMeta from "../components/PageMeta.vue";
import { getPage } from "../utils";
import MainContent from "../components/MainContent";
import CommentList from "../components/CommentList";

const route = useRoute();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);

const page = computed(() => {
  return getPage(route.path);
});

const { site } = useData();

const showComment = () => {
  if (
    site.value.themeConfig.issues &&
    site.value.themeConfig.issues.showComment
  ) {
    return true;
  }

  return false;
};
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
    <footer
      class="post-content"
      v-if="page.frontmatter.layout == 'issue' && showComment()"
    >
      <CommentList
        :id="page.frontmatter.id"
        :editUrl="page.frontmatter.editLink"
      />
    </footer>
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
