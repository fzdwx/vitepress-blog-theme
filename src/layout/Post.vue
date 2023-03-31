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
    <div class="post-main">
      <div class="post-container">
        <div class="mt-10 md:mt-6x">
          <header class="post-title text-center">
            <h1>{{ page.title }}</h1>
          </header>
          <PageMeta :show-edit-link="true" :page="page" />
          <Content
            class="post-content vp-doc prose dark:prose-invert"
            :class="pageName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 100%;
}

.post-main {
  @apply flex justify-center content-center;
}

@media screen and (max-width: 600px) {
  .post-container {
    @apply m-3 w-[95%] py-10 px-5;
  }
}

@media screen and (min-width: 600px) {
  .post-content {
    @apply max-w-[900px] min-w-[700px] xl:mr-20 xl:ml-20;
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
