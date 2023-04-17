import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Auth from '../types/authType'
import TVChannel from '@/types/tvChannelType';
import TVCategory from '@/types/tvCategoriesType';
import { getLiveTVByCategoryId } from '../utils/siberapi'; 



export const LiveStore = {
  state: { 
    tv_categories: [],
    tv_channels: []
  },
  getters: { 
    getLiveEventsCategory(state: any): any { 
      return state.tv_categories;
    },
    getLiveEventsChannel(state: any): any { 
      return state.tv_channels;
    },
    // getLiveEventsByCategoryId(state: Auth): Auth{
    //   return state;
    // },
    // getLiveEventById(state: Auth): Auth{
    //   return state;
    // },
    // getNPVRStatus(state: Auth): Auth{
    //   return state;
    // },
    // getEPGCurrent(state: Auth): Auth{
    //   return state;
    // },
    // getEPGAll(state: Auth): Auth{
    //   return state;
    // },
    // getEPGByChannelId(state: Auth): Auth{
    //   return state;
    // },
    // getEPGBySearch(state: Auth): Auth{
    //   return state;
    // }      
  },
  actions: { 
    getLiveTVByCategoryId(context: ActionContext<any, any>, playload: any): void{
      let auth = context.getters.getAuth;
      let apiParams = {
        token: auth.auth.msalToken,
        category_id: playload.CategoryId
      }
      getLiveTVByCategoryId(apiParams)
        .then(res => { 
          context.commit('setLiveTVByCategoryId', res.data.response.tv_channel); 
          context.commit('setLiveTVCategories', res.data.response.tv_categories); 
        });
    },

  },
  mutations: {
    setLiveTVByCategoryId(state: any, data: any): void{
      state.tv_channels = data; 
    },
    setLiveTVCategories(state: any, data: any): void{
      state.tv_categories = data; 
    }
  },
  // plugins: [
  //   // createPersistedState({
  //   //   auth: {
  //   //     // getItem: (key) => window.localStorage.getItem('signInfo'),
  //   //     // setItem(key, value) => commit('setToken', value)
  //   //   }
  //   // })
  // ],
  
}
