import { FeedItemInfo } from "@/types";

export default ({ item }: { item: FeedItemInfo }) => {
  return (
    <div class="ml-5 w-[95%] min-w-[400px] md:w-[700px] xl:w-[800px] 2xl:w-[800px] flex flex-row links-feed-div">
      <header class="basis-1/6 opacity-50">
        {formatDate(item.time, "M/DD")}
      </header>
      <section class=" hover:text-cyna-3  basis-2/3 whitespace-nowrap overflow-hidden w-full">
        <a
          target="_blank"
          class="links-feed-item"
          href={item.url}
        >
          {item.title}
        </a>
      </section>
      <footer class=" invisible sm:visible mr-5 basis-1/6 opacity-50 text-ellipsis whitespace-nowrap overflow-hidden w-full">
        {item.name}
      </footer>
    </div>
  );
};
