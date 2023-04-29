interface Props {
  show: boolean;
  tags: string[];
  layout: string;
}

const tagList = (tags: string[], layout: string) => {
  return tags.map((tag) => {
   return (
    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
       <a class={""} href={tagsUrl(layout, tag)}>
          {tag}
        </a>
    </span>
   )
  });
};

export default ({ show, tags, layout }: Props) => {
  return (
    <div
      class={`meta-tag-list flex flex-wrap ${
        show ? " mt-3 " : " basis-3/5 flex-grow "
      }`}
    >
      {tagList(tags, layout)}
    </div>
  );
};
