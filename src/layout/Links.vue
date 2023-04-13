<script setup lang="ts">
import Feeds from "@/components/Feeds.jsx";
import MainContent from "@/components/MainContent";
import { FeedItem } from "@/types";
import dayjs from "dayjs";
import { useData } from "vitepress";

const parseFeedItems = async () => {
  const { frontmatter } = useData();
  const resp = await fetch(frontmatter.value.feedsUrl || "/links.json");
  const val = await resp.json();
  return val.items as FeedItem[];
};

const state = reactive({
  itemsGroup: {} as Record<string, FeedItem[]>,
});

onMounted(async () => {
  const sortItems = (await parseFeedItems()).sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  // group by month
  state.itemsGroup = sortItems.reduce((acc, item) => {
    /*  const month = new Date(item.time).toLocaleString("en-us", {
      month: "long",
      year: "numeric",
    }); */
    const month = dayjs(item.time).format("YYYY 年 M 月");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {} as Record<string, FeedItem[]>);
});

const { frontmatter } = useData();
</script>
<template>
  <MainContent>
    <header class="mt-10 center">
      <h1>{{ frontmatter.title || "Links" }}</h1>
    </header>
    <Feeds :itemsGroup="state.itemsGroup" />
  </MainContent>
</template>
