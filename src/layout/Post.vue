<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed } from "vue";
import PageMeta from "../components/PageMeta.vue";
import { getPage } from "../utils/core";

const route = useRoute();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);

const page = computed(() => {
  return getPage(route.path);
});
</script>

<template>
  <div class="post" v-if="page !== undefined">
    <header class="post-title center">
      <h1>{{ page.title }}</h1>
    </header>
    <PageMeta :show-edit-link="true" :page="page" class="center" />
    <article class="flex justify-center mt-10 md:mt-6x">
      <Content
        class="post-content vp-doc prose prose-gray dark:prose-invert"
        :class="pageName"
      />
    </article>
  </div>
</template>

<style scoped>
.post {
  width: 100%;
}

.post-content {
  @apply max-w-[800px] mr-20 ml-20;
}

@media (min-width: 768px) {
  .post {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .post {
    padding: 32px 32px 0;
  }
}

@media (min-width: 1480px) {
  .post-content {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}
</style>
