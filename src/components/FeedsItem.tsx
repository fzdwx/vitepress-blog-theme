import { FeedItem } from "@/types";

export default ({ item }: { item: FeedItem }) => {
  return (
    <div class="flex flex-row links-feed-div  md:w-[700px] xl:w-[800px] 2xl:w-[800px]">
      <header class=" mr-5 basis-1/4 text-ellipsis whitespace-nowrap  overflow-hidden    w-full">
        {item.name}
      </header>
      <section class=" hover:text-dark-red  basis-1/2 whitespace-nowrap  overflow-hidden    w-full">
        <a
          target="_blank"
          class="links-feed-item"
          href={item.url}
          noIcon={true}
        >
          {item.title}
        </a>
      </section>
      <footer class="basis-1/4 text-ellipsis">{formatDate(item.time)}</footer>
    </div>
  );
};
