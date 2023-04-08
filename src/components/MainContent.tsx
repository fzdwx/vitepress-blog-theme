import { SetupContext } from "vue";

export default (props: {}, { slots }: SetupContext) => {
  return (
    <div class="main-content-center">
      <div class={"flex  items-center  justify-center"}>
        <div class="main-content-container ">
          <div class="main-content-solot">{slots.default?.()}</div>
        </div>
      </div>
    </div>
  );
};
