<script setup lang="ts">
import { Page } from "../utils/content.data";
import { formatDesc } from "../utils/core";
import PageMeta from "../components/PageMeta.vue";

defineProps<{
  pages: Page[];
}>();
</script>

<template>
  <div class="pages main-content">
    <article class="post-entry mr-10 ml-10" v-for="page of pages">
      <header class="entry-header">
        <h2 class="text-2xl">
          {{ page.title }}
        </h2>
      </header>
      <section class="entry-content">
        <p class="text-4">
          {{ formatDesc(page.desc) }}
        </p>
      </section>
      <footer class="entry-footer">
        <PageMeta :show-edit-link="false" :page="page" />
      </footer>
      <a class="entry-link" aria-label="123" :href="page.url"></a>
    </article>
  </div>
</template>

<style scoped>
.post-entry {
  position: relative;
  margin-bottom: var(--gap);
  padding: var(--gap);
  background: var(--bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-bg);
  box-shadow: var(--box-shadow);
}

.entry-header h2 {
  transition: var(--link-transition);
  display: inline-block;
}

.post-entry:hover .entry-header h2 {
  color: var(--link-hover-color);
  box-shadow: var(--link-hover-underline-shadow);
}

@media (max-width: 500px) {
  .first-entry .entry-header h1 {
    font-size: 30px;
  }

  .first-entry .entry-content {
    font-size: 16px;
  }
}

.entry-content {
  margin: 8px 0;
  color: var(--secondary);
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.entry-footer,
.entry-footer span > a {
  color: var(--secondary);
  font-size: 13px;
}

.entry-link {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
