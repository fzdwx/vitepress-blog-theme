interface GistProps {
  id: string;
  user: string;
  height?: string;
}

export default ({ id, user, height }: GistProps) => {
  return (
    <>
      <iframe
        class={" gist-iframe  w-full " + (height ? height : "  h-60 ")}
        src={`https://gist.github.com/${user}/${id}.pibb`}
      ></iframe>
    </>
  );
};
