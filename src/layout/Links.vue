<script setup lang="ts">
import LinksItem from "@/components/LinksItem";
import MainContent from "@/components/MainContent";
import { FeedItem } from "@/types";
import { useData } from "vitepress";

const parseFeedItems = async () => {
  const { frontmatter } = useData();
  const resp = await fetch(frontmatter.value.feedsUrl || "/links.json");
  const val = await resp.json();
  return val.items as FeedItem[];
};

const state = reactive({
  feedItems: [] as FeedItem[],
});

onMounted(async () => {
  state.feedItems = (await parseFeedItems()).sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
});
</script>
<template>
  <MainContent>
    <item
      class="links-feed-wrap"
      v-for="item in state.feedItems"
      :key="item.title"
    >
      <LinksItem :item="item" />
    </item>
  </MainContent>
</template>
