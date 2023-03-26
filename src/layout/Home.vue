<script setup lang="ts">
import { useData } from "vitepress";
import { getPages } from "../utils/core";

import PageList from "./../components/PageList.vue";

const { theme } = useData();

const posts = computed(() => getPages("post", theme.value));
</script>

<template>
  <div class="Home">
    <main class="home-content">
      <article class="main-content">
        <Content
          class="home-intro vp-doc prose dark:prose-invert max-w-[800px] mr-20 ml-20 pb-8"
        />
      </article>
      <PageList :pages="posts" />
    </main>
  </div>
</template>

<style scoped>
.home-content {
  padding-top: 20px;
  margin-top: 20px;
}

@media (min-width: 640px) {
  .home-content {
    padding-left: 14px;
    padding-right: 14px;
  }
}

@media (min-width: 960px) {
  .home-content {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}
</style>
