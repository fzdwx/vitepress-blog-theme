<script setup lang="ts">
import { useData } from 'vitepress';
import { Page } from '@/types';
import MainContent from '@/components/MainContent';
import PageMeta from '@/components/PageMeta.vue';
const { theme, page } = useData();

const state = reactive({
  pages: [] as Page[],
  tags: [] as string[],
  showModal: false,
  modalIndex: 0,
})

onMounted(() => {
  const pages = getPages("qa", theme.value)
  state.pages = pages
  pages.map(page => {
    if (page.frontmatter.tags) {
      //@ts-ignore
      page.frontmatter.tags.map(tag => {
        if (!state.tags.includes(tag)) {
          state.tags.push(tag)
        }
      })
    }
  })

  console.log(state.tags);
})

function openModal(index: number) {
  state.showModal = true
  state.modalIndex = index
}
function closeModal() {
  state.showModal = false
  state.modalIndex = 0
}

function showModalClass() {
  if (state.showModal) {
    return "hidden"
  } else {
    return ""
  }
}

</script>

<template>
  <MainContent>
    <header :class="showModalClass()" class="post-title center mb-10 pt-10">
      <h1>
        {{ page.title }}
      </h1>
    </header>

    <div class="center vp-doc prose dark:prose-invert">
      <div class="flex flex-wrap -mx-2">

        <div :class="showModalClass()" class="w-full md:w-1/3 px-2 mb-4" v-for="(page, index) in state.pages"
          :key="index">
          <div class="dark:bg-gray-500/20 rounded-lg shadow-md overflow-hidden cursor-pointer" @click="openModal(index)">
            <div class="p-4">
              <h4 class=" font-medium text-2xl mb-2">{{ page.title }}</h4>
              <p class=" line-clamp-3 mb-4">{{ formatDesc(page.desc) }}</p>
              <PageMeta :forat-date-pattern="`YYYY-DD`" :show-edit-link="false" :page="page"></PageMeta>
            </div>
          </div>
        </div>

        <div v-if="state.showModal" @click.self="closeModal()"
          class="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center  backdrop-filter backdrop-blur-sm">
          <div class=" dark:bg-slate-400/10 max-h[80%] w-[95%] rounded-lg shadow-lg overflow-hidden md:max-w-4xl">
            <div class="p-4 ">
              <h2 class="font-medium text-lg mb-2">{{ state.pages[state.modalIndex].title }}</h2>
              <PageMeta :show-edit-link="true" :page="state.pages[state.modalIndex]"></PageMeta>
              <div class=" mb-4" v-html="state.pages[state.modalIndex].html"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainContent>
</template>
