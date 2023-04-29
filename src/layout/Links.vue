<script setup lang="ts">
import Feeds from "@/components/Feeds.jsx";
import MainContent from "@/components/MainContent";
import { FeedItem, FeedItemInfo } from "@/types";
import dayjs from "dayjs";
import { useData } from "vitepress";

const parseFeedItems = async () => {
  const { frontmatter } = useData();
  const resp = await fetch(frontmatter.value.feedsUrl || "/links.json");
  const val = await resp.json();
  return val.items as FeedItem[];
};

interface FeedUser {
  name: string
  avater: string
}

const state = reactive({
  currentName: "",
  itemsGroup: {} as Record<string, FeedItemInfo[]>,
  allItems: [] as FeedItem[],
  users: [] as FeedUser[],
});

function collectItemInfo(name?: string) {
  const infoList = [] as FeedItemInfo[];
  if (name == undefined || name == "") {
    infoList.push(...state.allItems.flatMap(item => item.info))
  } else {
    infoList.push(...state.allItems.filter(item => item.name === name).flatMap(item => item.info))
  }

  const sortItems = (infoList).sort(
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
  }, {} as Record<string, FeedItemInfo[]>);
}

onMounted(async () => {
  state.allItems = await parseFeedItems()
  collectItemInfo(state.currentName);
  state.users = state.allItems.map(item => {
    return {
      name: item.name,
      avater: item.avatar
    }
  })
});

const changeFeed = (name: string) => {
  if (state.currentName == name) {
    state.currentName = ""
  } else {
    state.currentName = name;
  }
  collectItemInfo(state.currentName)
}

const { frontmatter } = useData();
</script>
<template>
  <MainContent>
    <header class="mt-10 center">
      <h1>{{ frontmatter.title || "Links" }}</h1>
    </header>
    <div class="flex">
      <div class=" mx-2 " v-for="user in state.users">
        <span class=" cursor-pointer" @click='() => changeFeed(user.name)'>
          {{ user.name }}
        </span>
      </div>
    </div>
    <Feeds :itemsGroup="state.itemsGroup" />
  </MainContent>
</template>
