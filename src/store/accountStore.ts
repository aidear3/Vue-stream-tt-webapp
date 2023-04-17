import { ActionContext } from 'vuex' 
import AccountType from '@/types/accountType';

export const AccountStore = {
  state: {
    Account:{
      customer_id: 0,
      child: false,
      client_ip: '',
      status: 0,
      message: '',

      max_vod_rating: '',
      max_tv_rating: '',
      
      languages: [],

      user_name: '',
      user_email: '',
      user_username: '',
      user_device_id: 0,
      user_gender: '',
      user_age: '',

      dvr_usage_limit: 0,
      dvr_usage: 0,
      test_account: 0,

      block_tvod: 0,
      block_svod: 0,
      block_ppv: 0,

      npvr_status: 0,
      catchup_status: 0,
      restart_status: 0,
      vod_status: 0,

      token: '',
      wmsAuthSign: '',
      system_state: false,

      property_id: 0,
      property_building: '',
      property_apartment: '',
      property_name: '',
      property_image: '',
      property_background_image: '',
      property_media_url: '',
      property_vast_url: '',
      ui_type: '',
      
      profiles: [],
      messages: [],
    }
      
  },
  getters: { 
    getAccount(state: any): any{
      return state.Account;
    }
  },
  actions: { 
    setAccount(context: ActionContext<any, any>, data: any): void{
      context.commit('setAccount', data);
    } 
  },
  mutations: {
    setAccount(state: any, data: any): void{ 
      state.Account = data; 
    }
  }, 
  
}
