interface Props {
  show: boolean;
  tags: string[];
  layout: string;
}

const tagList = (tags: string[], layout: string) => {
  return tags.map((tag) => {
    return (
      <div class="px-2 py-1 bg-pink1 dark:bg-slate-300/20 rounded-lg text-xs mr-2">
        <a href={tagsUrl(layout, tag)}>{tag}</a>
      </div>
    );
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
