import { Obj } from '@popperjs/core';
import { ActionContext } from 'vuex'
import Auth from '../types/authType'
import { getMenuList, getGuestToken, getConnection, showUserDevices } from '../utils/siberapi';

export const AuthStore = {
  state: {
    auth: {
      loggedIn: false,
      msalToken: "",
      tokenMode: 'guest',
      devices: []
    }
  },

  getters: {
    getAuth(state: Auth): Auth {
      return state
    },
    getToken(state: Auth): Auth {
      return state;
    },
  },
  actions: {
    setToken(context: ActionContext<Auth, Auth>, playload: Auth): void {
      if (playload.tokenMode == 'guest') {
        getGuestToken()
          .then(res => {
            playload.msalToken = res.data.access_token;
            playload.loggedIn = false;
            localStorage.setItem("authToken", res.data.access_token);
            context.commit('setToken', playload);
            getConnection(res.data.access_token).then(res1 => {
              if (res1.data.response.account.customer_id && res1.data.response.account.status != 400) {
                getMenuList(res.data.access_token)
                  .then(res => {
                    let accountData = res.data.response.account;
                    let menuData = res.data.response.main_menu_items;
                    context.dispatch('setAccount', accountData, { root: true });
                    context.dispatch('setMainMenu', menuData, { root: true });
                  });
              } else if (res1.data.response.account.status == 400) {
                console.log("Error 400 in login");
              }
            });
          });
      } else {
        context.commit('setToken', playload);
        getConnection(playload.msalToken).then(res1 => {
          if (res1.data.response.account.customer_id && res1.data.response.account.status != 400) {
            getMenuList(playload.msalToken)
              .then(res => {
                window.sessionStorage.setItem("tokenMode", playload.tokenMode);
                let accountData = res.data.response.account;
                let menuData = res.data.response.main_menu_items;
                context.dispatch('setAccount', accountData, { root: true });
                context.dispatch('setMainMenu', menuData, { root: true });
              });
          } else if (res1.data.response.account.status == 400) {
            showUserDevices(playload.msalToken).then( res => {
              context.dispatch('setDevices', res.data.response.devices);
            }) 
          }

        });
      }
    },
    setDevices(context: ActionContext<Auth, Auth>, data: any): void{
      context.commit('setDevices', data);
    } 
  },
  mutations: {
    setToken(state: Auth, data: Auth): void {
      state.auth = data;
    },
    setDevices(state: Auth, data: Array<Obj>): void {
      state.devices = data;
    }
  },

}
