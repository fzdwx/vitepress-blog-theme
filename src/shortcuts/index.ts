import Center from "./Center";
import { App } from "vue";

/**
 * attach global component
 * @param app app
 */
const attachShortcuts = (app: App) => {
  //@ts-ignore
  app.component("Center", Center);
};

export { attachShortcuts };
