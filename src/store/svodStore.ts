import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Auth from '../types/authType'
import EventPackagesType from '@/types/eventPackageType';
import EventsType from '@/types/eventType';
import { getGuestToken, getSVODByCategoryId, getSVODById, getSVODSeriesById } from '../utils/siberapi';
import { pl } from 'element-plus/es/locale';



export const SVODStore = {
  state: {
    SVODs: [],
    SVOD: [],
    movies_by_actor: [],
    movies_by_director: []
  },
  getters: {
    getSVOD(state: any): any {
      return state.SVODs;
    },
  },
  actions: {
    setSVODByCategoryId(context: ActionContext<any, any>, playload: any): void {
      let auth = context.getters.getAuth;
      let token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }

      let apiParams = {
        token: token,
        category_id: playload.CategoryId
      }
      if (context.getters.getSVOD[playload.CategoryId]?.length) {

        let svods = {
          SVODs: context.getters.getSVOD[playload.CategoryId],
          category_id: playload.CategoryId
        }
        context.commit('setSVODByCategoryId', svods);

      } else {

        getSVODByCategoryId(apiParams)
          .then(res => {
            let svods = {
              SVODs: res.data.response.movies,
              category_id: playload.CategoryId
            }
            context.commit('setSVODByCategoryId', svods);
          });

      }

    },
    setSVODById(context: ActionContext<any, any>, playload: any): void {
      let auth = context.getters.getAuth;
      let token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }
      if (token == '' || auth.auth.tokenMode == "guest") {
        getGuestToken().then((value: any) => {
          let apiParams = {
            token: value.data.access_token,
            vodId: playload.vodId
          }
          getSVODById(apiParams)
            .then(res => {
              let svod = {
                SVOD: res.data.response,
                vodId: playload.vodId
              }
              context.commit('setSVODById', svod);
            });
        })
      } else {
        let apiParams = {
          token: token,
          vodId: playload.vodId
        }
        getSVODById(apiParams)
          .then(res => {
            let svod = {
              SVOD: res.data.response,
              vodId: playload.vodId
            }
            context.commit('setSVODById', svod);
          });
      }

    },
    setSVODSeriesById(context: ActionContext<any, any>, playload: any): void {
      let auth = context.getters.getAuth;
      let token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }
      if (token == '' || auth.auth.tokenMode == "guest") {
        getGuestToken().then((value: any) => {
          let apiParams = {
            token: value.data.access_token,
            vodId: playload.vodId
          }
          getSVODSeriesById(apiParams)
            .then(res => {
              let svod = {
                SVOD: res.data.response,
                vodId: playload.vodId
              }
              context.commit('setSVODById', svod);
            });
        })
      } else {
        let apiParams = {
          token: token,
          vodId: playload.vodId
        }
        getSVODSeriesById(apiParams)
          .then(res => {
            let svod = {
              SVOD: res.data.response,
              vodId: playload.vodId
            }
            context.commit('setSVODById', svod);
          });
      }
    },
  },
  mutations: {
    setSVODByCategoryId(state: any, data: any): void {
      state.SVODs[data.category_id] = data.SVODs;
    },
    setSVODById(state: any, data: any): void {
      state.SVOD[data.vodId] = data.SVOD;
    }
  },
}
