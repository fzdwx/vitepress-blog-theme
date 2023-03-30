import Center from "./Center";
import Gist from "./Gist";
import { App } from "vue";

/**
 * attach global component
 * @param app app
 */
const attachShortcuts = (app: App) => {
  //@ts-ignore
  app.component("Center", Center);
  app.component("Gist", Gist);
};

export { attachShortcuts };
