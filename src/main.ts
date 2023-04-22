import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { vuetify } from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import { store, key } from "./store/index";
import { msalPlugin } from "./plugins/msalPlugin";
import { msalInstance } from "./mainConfig";
import { AuthenticationResult, EventType } from "@azure/msal-browser";
import { CustomNavigationClient } from "./router/NavigationClient";

// The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const app = createApp(App);

app.use(ElementPlus);
app.use(vuetify);
app.use(router);
app.use(store, key);
app.use(i18n);
app.use(msalPlugin, msalInstance);
router.isReady().then(() => {
  // Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect
  app.mount('#app');
});
