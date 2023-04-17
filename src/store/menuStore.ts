import { ActionContext } from 'vuex'
import MainMenuTypes from '../types/menuType';



export const MenuStore = {
  state: { 
      MainMenuTypes: [],
      SideMenus:[],
      MenuIds:[]
  },
  getters: {
    getMainMenu(state: any): any {
      return state.MainMenuTypes
    }, 
  },
  actions: { 
    setMainMenu(context: ActionContext<any, any>, playload: any): void{
      context.commit('setMainMenu', playload);
    },
    setCategory(context: ActionContext<any, any>, playload: any): void{
      context.commit('setCategory', playload);
    },
    setHomeCategory(context: ActionContext<any, any>, playload: any): void{
      context.commit('setHomeCategory', playload);
    }
  },
  mutations: {
    setMainMenu(state: any, playload: any): void{ 
      playload.forEach((menu: { id: string | number; }, index: any) => {
        state.MenuIds.push(index); 
        state.MainMenuTypes[menu.id] = menu;
      });
       
      
      state.SideMenus = playload;
    }, 
  },
  
}
