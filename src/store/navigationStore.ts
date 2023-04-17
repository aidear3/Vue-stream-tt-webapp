import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";


export const NavigationStore = {
  state: {
    navigationState: false,
  },
  getters: {
    getNavigationState(state: any): boolean {
      return state.navigationState;
    },
  },
  actions: { 
    changeNavigationState(context: ActionContext<any, any>, playload: boolean): void{
        context.commit('changeNavigationState', playload);
    }
  },
  mutations: {
    changeNavigationState(state: any, data: boolean): void{
      state.navigationState = data; 
    }
  },
  plugins: [
  
  ],
  
}
