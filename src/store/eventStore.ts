import { ActionContext } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Auth from '../types/authType'
import EventPackagesType from '@/types/eventPackageType';
import EventsType from '@/types/eventType';
import { getLiveEventsByCategoryId, getGuestToken, getEventsByContentProviderId, getSeriesByContentProviderId, getFilmsByContentProviderId } from '../utils/siberapi';



export const EventsStore = {
  state: {
    EventPackages: [],
    Events: [],
    ProviderEvents: [],
    FilmsEvents: [],
    SeriesEvents: [],
  },
  getters: {
    getLiveEvents(state: any): any {
      return state.Events;
    },
    getLiveEventsPackages(state: any): any {
      return state.EventPackages;
    },
    getProviderEvents(state: any): any {
      return state.ProviderEvents;
    },
    getSeriesEvents(state: any) : any {
      return state.SeriesEvents;
    },
    getFilmsEvents(state: any) : any {
      return state.FilmsEvents;
    }
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
    setLiveEventsByCategoryId(context: ActionContext<any, any>, playload: any): void {
      let auth = context.getters.getAuth;
      var token = auth.auth.msalToken;
      if (token == '') {
        token = localStorage.getItem('authToken') || "";
      }
      let apiParams = {
        token: token,
        category_id: playload.CategoryId
      }
      getLiveEventsByCategoryId(apiParams)
        .then(res => {
          let events = {
            events: res.data.response.events,
            category_id: playload.CategoryId
          }
          context.commit('setLiveEventsByCategoryId', events);

          let packages = {
            packages: res.data.response.packages,
            category_id: playload.CategoryId
          }

          context.commit('setLiveEventsPackagesByCategoryId', packages);
        });
    },
    getEventsByContentProviderId(context: ActionContext<any, any>, payload: any): void {
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
          getEventsByContentProviderId(apiParams)
            .then((res: any) => {
              context.commit('setProviderEvents', res.data.response.events);
            });
        })
      } else {
        let apiParams = {
          token: token,
          providerId: payload.providerId
        }
        getEventsByContentProviderId(apiParams)
          .then((res: any) => {
            context.commit('setProviderEvents', res.data.response.events);
          });
      }
    },
    getFilmsByContentProviderId(context: ActionContext<any, any>, payload: any): void {
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
          getFilmsByContentProviderId(apiParams)
            .then((res: any) => {
              context.commit('setFilmsEvents', res.data.response.movies);
            });
        })
      } else {
        let apiParams = {
          token: token,
          providerId: payload.providerId
        }
        getFilmsByContentProviderId(apiParams)
          .then((res: any) => {
            context.commit('setFilmsEvents', res.data.response.movies);
          });
      }
    },
    getSeriesByContentProviderId(context: ActionContext<any, any>, payload: any): void {
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
          getSeriesByContentProviderId(apiParams)
            .then((res: any) => {
              context.commit('setSeriesEvents', res.data.response.movies);
            });
        })
      } else {
        let apiParams = {
          token: token,
          providerId: payload.providerId
        }
        getSeriesByContentProviderId(apiParams)
          .then((res: any) => {
            context.commit('setSeriesEvents', res.data.response.movies);
          });
      }
    },
  },
  mutations: {
    setLiveEventsByCategoryId(state: any, data: any): void {
      state.Events[data.category_id] = data.events;
    },
    setLiveEventsPackagesByCategoryId(state: any, data: any): void {
      state.EventPackages[data.category_id] = data.packages;
    },
    setProviderEvents(state: any, data: any): void {
      state.ProviderEvents = data;
    },
    setFilmsEvents(state: any, data: any): void {
      state.FilmsEvents = data;
    },
    setSeriesEvents(state: any, data: any): void {
      state.SeriesEvents = data;
    },
  },

}
