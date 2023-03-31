import "../styles/douban.css";

interface DoubanProps {
  code: string; // 豆瓣id
  // tpye?: "movie" /* | "book" */; // 类型
  to?: string; // 跳转链接
}

const getDoubanInfo = (id: string, dataRef: Ref<Data | undefined>) => {
  if (window == undefined) {
    return;
  }
  const s = window.localStorage;

  let data = s.getItem(`douban-movie-${id}`);
  if (!data) {
    fetch(`https://douban.8610000.xyz/data/${id}.json`).then((res) => {
      res
        .json()
        .then((j) => {
          s.setItem(`douban-movie-${id}`, JSON.stringify(j));
          dataRef.value = j;
        })
        .catch((e) => {
          console.log(e);
        });
    });
  } else {
    const obj = JSON.parse(data);
    dataRef.value = obj;
  }
};

const directorName = (directors: Data["directors"]) => {
  if (directors == undefined) {
    return "未知";
  }
  return directors.map((d) => d.name).join(",");
};

interface Data {
  title: string;
  rating: {
    value: number;
  };
  directors: [
    {
      name: string;
    }
  ];
  genres: string[];
  year: string;
  intro: string;
  pic: {
    normal: string;
  };
}

export default ({ code, to }: DoubanProps) => {
  const data = ref<Data>();
  getDoubanInfo(code, data);

  const moive = computed(() => data.value);

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
              {moive.value?.title}
            </a>
          </div>
          <div class="rating">
            <div
              class={`rating-star allstar ${Math.ceil(
                moive.value?.rating.value || 0
              )}`}
            />
            <div class="rating-average"> {moive.value?.rating.value}</div>
          </div>
          <time class="post-preview--date">
            导演:
            {directorName(
              moive.value?.directors || ([{}] as Data["directors"])
            )}
            / 类型：{moive.value?.genres} / 上映时间：{moive.value?.year}
          </time>
          <section
            style="max-height:75px;overflow:hidden;"
            class="post-preview--excerpt"
          >
            {moive.value?.intro.replace(/\s*/g, "")}
          </section>
        </div>
      </div>
      <img
        referrerpolicy="no-referrer"
        loading="lazy"
        class="post-preview--image"
        src={moive.value?.pic.normal}
      />
    </div>
  );
};
