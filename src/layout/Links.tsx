import Link from "@/components/Link.vue";
import MainContent from "@/components/MainContent";
import { Links } from "@/types";
import { useData } from "vitepress";

const linkItem = (item: Links) => {
  return (
    <div>
      <header>
        <Link href={item.url} rel={item.name}>
          {item.name && <h2>{item.name}</h2>}
        </Link>
      </header>
      <article>{item.desc} </article>
    </div>
  );
};

export default () => {
  const { frontmatter } = useData();
  console.log(frontmatter.value.feeds);

  return (
    <div>
      <MainContent>{frontmatter.value.links.map(linkItem)}</MainContent>
    </div>
  );
};
