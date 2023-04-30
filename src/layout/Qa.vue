<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { Page } from '@/types';
import MainContent from '@/components/MainContent';
import PageMeta from '@/components/PageMeta.vue';
const { theme, page } = useData();

const { tag } = useUrlSearchParams<Record<string, string>>();

const route = useRouter();
route.onAfterRouteChanged = (to: string) => {
  const { tag } = useUrlSearchParams<Record<string, string>>();
  if (tag) {
    state.currentTag = tag
    collectQa(tag)
  }
};

const state = reactive({
  pages: [] as Page[],
  currentPages: [] as Page[],
  tags: [] as string[],
  showModal: false,
  modalIndex: 0,
  currentTag: "",
})

onMounted(() => {
  state.pages = getPages("qa", theme.value)
  state.pages.forEach(page => {
    if (page.frontmatter.tags) {
      //@ts-ignore
      page.frontmatter.tags.map(tag => {
        if (!state.tags.includes(tag)) {
          state.tags.push(tag)
        }
      })
    }
  })
  state.currentPages = state.pages.map(page => {
    const path = encodeURI(page.url.replace(".html", ".md"))
    if (theme.value.editLink) {
      if (theme.value.editLink.pattern) {
        if (typeof theme.value.editLink.pattern == "string") {
          page.frontmatter.editLink = theme.value.editLink.pattern.replace(":path", path)
        } else {
          page.frontmatter.editLink = theme.value.editLink.pattern({ relativePath: path });
        }
      }
    }
    return page
  })

  if (tag) {
    state.currentTag = tag
    collectQa(tag)
  }
})

function openModal(index: number) {
  state.showModal = true
  state.modalIndex = index
}

function closeModal() {
  state.showModal = false
  state.modalIndex = 0
}

const activeTag = (tag: string) => {
  if (state.currentTag == tag) {
    return "text-cyna-3"
  } else {
    return "text-gray-500"
  }
}

const changeTag = (tag: string) => {
  if (state.currentTag == tag) {
    state.currentTag = ""
  } else {
    state.currentTag = tag;
  }
  collectQa(state.currentTag)
}

const collectQa = (tag: string) => {
  if (tag == "") {
    state.currentPages = state.pages
  } else {
    state.currentPages = state.pages.filter(page => {
      if (page.frontmatter.tags) {
        return page.frontmatter.tags.includes(tag)
      }
    })
  }
}

</script>

<template>
  <MainContent v-if="!state.showModal">
    <header class="center mb-10 pt-10">
      <h1>
        {{ page.title }}
      </h1>
    </header>

    <span :class="activeTag(tag)" class="cursor-pointer mx-2 " @click='() => changeTag(tag)' v-for="tag in state.tags">
      {{ tag }}
    </span>

    <div class="center vp-doc prose dark:prose-invert">
      <div class="flex flex-wrap -mx-2">

        <div class="w-full md:w-1/3 px-2 mb-4" v-for="(page, index) in state.currentPages" :key="index">
          <div class="dark:bg-gray-500/20 rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
              <h4 @click="openModal(index)" class=" cursor-pointer font-medium text-2xl mb-2">{{ page.title }}</h4>
              <p @click="openModal(index)" class=" cursor-pointer line-clamp-3 mb-4">{{ formatDesc(page.desc) }}</p>
              <PageMeta :forat-date-pattern="`YYYY-DD`" :show-edit-link="false" :page="page"></PageMeta>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainContent>

  <MainContent v-if="state.showModal" class="vp-doc prose dark:prose-invert">
    <div @click.self="closeModal()"
      class="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center  backdrop-filter backdrop-blur-sm">
      <div class=" dark:bg-slate-400/10 max-h[80%] w-[95%] rounded-lg shadow-lg overflow-hidden md:max-w-4xl">
        <div class="p-4 ">
          <h2 class="font-medium text-lg center mb-2">{{ state.currentPages[state.modalIndex].title }}</h2>
          <PageMeta :show-edit-link="true" :page="state.currentPages[state.modalIndex]"></PageMeta>
          <div class=" mb-4" v-html="state.currentPages[state.modalIndex].html"></div>
        </div>
      </div>
    </div>
  </MainContent>
</template>
