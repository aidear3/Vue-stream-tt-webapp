import Auth from '../types/authType'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie';
import { AuthStore } from './authStore'
import { AccountStore } from './accountStore'
import { MenuStore } from './menuStore'
import { LiveStore } from './liveStore'
import { EventsStore } from './eventStore'
import { SVODStore } from './svodStore'
import { SportStore } from './sportStore'
import { DeviceStore } from './deviceStore'
import { NavigationStore } from './navigationStore'
import { PackageStore } from './packageStore'
import { ProviderStore } from './providerStore'

interface storeTypes extends Auth {}
export const key: InjectionKey<Store<storeTypes>> = Symbol()

export const store = createStore<storeTypes>({
  modules: {
    AuthStore,
    AccountStore,
    MenuStore,
    LiveStore,
    EventsStore,
    SVODStore,
    SportStore,
    DeviceStore,
    NavigationStore,
    PackageStore,
    ProviderStore
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.get(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
})
