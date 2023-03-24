<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import { posts } from "../utils/core";

import PageList from "./../components/PageList.vue";

const { page, frontmatter, site } = useData();

const router = useRouter();
</script>

<template>
  <div class="Home">
    <main class="main">
      <div class="home-content">
        <div class="container">
          <div class="main">
            <PageList :pages="posts" />
          </div>
        </div>
      </div>
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
