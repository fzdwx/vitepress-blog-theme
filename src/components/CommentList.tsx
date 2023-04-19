import dayjs from "dayjs";
import { defineComponent } from "vue";

interface Comment {
  body: string;
  created_at: string;
  updated_at: string;
  user: {
    avatar_url: string;
    html_url: string;
    login: string;
  };
  reactions: {
    "+1": number;
    "-1": number;
    confused: number;
    eyes: number;
    heart: number;
    hooray: number;
    laugh: number;
    rocket: number;
    total_count: number;
  };
  html_url: string;
  issue_url: string;
}

const fetchComments = async (id: number) => {
  const response = await fetch(`/issues/comment/${id}.json`);
  const data = await response.json();
  return data;
};

const commentItem = (comment: Comment) => {
  return (
    <div class="comment-main flex mx-auto my-8">
      <header>
        <a class="comment-userimg" target="_blank" href={comment.user.html_url}>
          <img
            src={comment.user.avatar_url}
            alt={comment.user.login}
            class="w-12 h-12"
          />
        </a>
      </header>
      <article class="comment-article flex-1 ml-3">
        <header class="flex">
          <a
            class="comment-username"
            target="_blank"
            href={comment.user.html_url}
          >
            {comment.user.login}
          </a>
          <time class="comment-time mx-3" title={comment.updated_at}>
            {dayjs(comment.updated_at).format("MM-DD")}
          </time>
          <div class="flex-1" />
          <a class="comment-reply" target="_blank" href={comment.html_url}>
            回复
          </a>
        </header>
        <section class="comment-body my-3" innerHTML={comment.body} />
        <footer>
          {/* <div class="comment-reaction flex">{comment.reactions}</div> */}{" "}
          {/*  todo  */}
        </footer>
      </article>
    </div>
  );
};

export default defineComponent({
  props: {
    id: Number,
    editUrl: String,
  },
  setup(props: any) {
    const state = reactive<{
      value: Comment[];
    }>({ value: [] });
    const fetch = async () => {
      const resp = await fetchComments(props.id);
      state.value = resp;
    };
    onMounted(async () => {
      await fetch();
    });
    return { state };
  },
  render() {
    return (
      <div>
        <div>
          <div class="flex items-center my-8">
            <div class="flex-1 h-px bg-gray-300" />
            <a target="_blank" href={this.editUrl}>
              <span class="mx-4">💬</span>
            </a>
            <div class="flex-1 h-px bg-gray-300" />
          </div>
          {this.state.value.map((comment) => {
            return commentItem(comment);
          })}
        </div>
      </div>
    );
  },
});
