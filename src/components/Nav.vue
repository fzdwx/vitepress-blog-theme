<script setup lang="ts">
import { useData } from "vitepress";
import NavBar from "./NavBar.vue";

const { site } = useData();
</script>

<template>
  <header class="Nav">
    <div class="fixed header-bar" />
    <NavBar>
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <img class="nav-icon" :src="site.themeConfig.icon" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
    </NavBar>
  </header>
</template>

<style scoped>
.Nav {
  width: 100%;
  z-index: 1020;
  position: sticky;
  top: 0;
}

.nav-icon {
  @apply w-8 mb-3 pr-1;
}

.header-bar {
  width: 100% !important;
  border-top: 4px solid;
  border-image-source: linear-gradient(
    100deg,
    var(--blue-2),
    var(--cyna-2) 50%,
    #8ed6fb
  );
  border-image-slice: 1;
}
</style>
