import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { getGuestToken, getPackagesById } from '../utils/siberapi';


export const PackageStore = {
  state: {
    packages: []
  },
  getters: {
    getPackages(state: any): any {
      return state.packages;
    }
  },
  actions: { 
    setPackages(context: ActionContext<any, any>, payload: any): void{
      let auth = context.getters.getAuth;
      let token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }
      if (token == '' || auth.auth.tokenMode == "guest") {
        getGuestToken().then((value: any) => {
          let apiParams = {
            token: value.data.access_token,
            packageId: payload
          }
          getPackagesById(apiParams)
            .then(res => {
              context.commit('setPackages', res.data.response.packages);
            });
        })
      } else {
        let apiParams = {
          token: token,
          packageId: payload
        }
        getPackagesById(apiParams)
          .then(res => {
            context.commit('setPackages', res.data.response.packages);
          });
      }
    }
  },
  mutations: {
    setPackages(state: any, data: any): void{
      state.packages = data; 
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
