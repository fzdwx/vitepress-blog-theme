import "../styles/douban.css";

interface DoubanProps {
  code: string; // 豆瓣id
  // tpye?: "movie" /* | "book" */; // 类型
  to?: string; // 跳转链接
}

const getDoubanInfo = (id: string, dataRef: Ref<{}>) => {
  if (window == undefined) {
    return;
  }
  const s = window.localStorage;

  let data = s.getItem(`douban-movie-${id}`);
  if (!data) {
    fetch(`https://douban.8610000.xyz/data/${id}.json`).then((res) => {
      res.json().then((j) => {
        s.setItem(`douban-movie-${id}`, j);
        dataRef.value = j;
      });
    });
  } else {
    const obj = JSON.parse(data);
    dataRef.value = obj;
  }
};

const directorName = (data: Ref, directors: string[]) => {
  if (directors.length === 0) {
    return "未知";
  }
  // @ts-ignore
  return directors.map((d) => d.name).join(",");
};

export default ({ code, to }: DoubanProps) => {
  const data = ref();
  getDoubanInfo(code, data);
  return (
    <div class="post-preview">
      <div class="post-preview--meta">
        <div class="post-preview--middle">
          <div class="post-preview--title">
            <a
              target="_blank"
              style="box-shadow: none; font-weight: bolder;"
              href={rs(
                to == undefined,
                `https://movie.douban.com/subject/${code}/`,
                to
              )}
            >
              {data.value.title}
            </a>
          </div>
          <div class="rating">
            <div
              class={`rating-star allstar ${Math.ceil(
                data.value.rating.value
              )}`}
            />
            <div class="rating-average"> {data.value.rating.value}</div>
          </div>
          <time class="post-preview--date">
            导演: {directorName(data, data.value.directors)} / {/*  */}
            类型：{data.value.genres} /{/*  */}
            上映时间：{data.value.year}
          </time>
          <section
            style="max-height:75px;overflow:hidden;"
            class="post-preview--excerpt"
          >
            {data.value.intro.replace(/\s*/g, "")}
          </section>
        </div>
      </div>
      <img
        referrerpolicy="no-referrer"
        loading="lazy"
        class="post-preview--image"
        src={data.value.pic.normal}
      />
    </div>
  );
};
