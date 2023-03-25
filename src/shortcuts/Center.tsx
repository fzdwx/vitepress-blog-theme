import { SetupContext } from "vue";

export default (props: {}, { slots }: SetupContext) => {
  return (
    <div class={`center`}>
      {slots["default"] ? slots["default"]?.() : <span></span>}
    </div>
  );
};
