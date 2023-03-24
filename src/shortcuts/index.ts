//@ts-nocheck
import Center from "./Center.vue";
import { App } from "vue";

/**
 * attach global component
 * @param app app
 */
const attachShortcuts = (app: App) => {
  app.component("Center", Center);
};

export { attachShortcuts };
