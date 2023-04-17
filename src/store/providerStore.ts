import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { getGuestToken, getProviderInfo } from '../utils/siberapi';


export const ProviderStore = {
  state: {
    providers: null
  },
  getters: {
    getProvider(state: any): any {
      return state.providers;
    }
  },
  actions: { 
    setProvider(context: ActionContext<any, any>, payload: any): void{
      let auth = context.getters.getAuth;
      let token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }
      if (token == '' || auth.auth.tokenMode == "guest") {
        getGuestToken().then((value: any) => {
          let apiParams = {
            token: value.data.access_token,
            providerId: payload.providerId
          }
          getProviderInfo(apiParams)
            .then(res => {
              context.commit('setProvider', res.data);
            });
        })
      } else {
        let apiParams = {
          token: token,
          providerId: payload.providerId
        }
        getProviderInfo(apiParams)
          .then(res => {
            context.commit('setProvider', res.data);
          });
      }
    }
  },
  mutations: {
    setProvider(state: any, data: any): void{
      state.providers = data; 
    }
  },
  plugins: [
    // createPersistedState({
    //   auth: {
    //     // getItem: (key) => window.localStorage.getItem('signInfo'),
    //     // setItem(key, value) => commit('setToken', value)
    //   }
    // })
  ],
  
}
