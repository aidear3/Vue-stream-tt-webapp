import MenuFeatureItem from './menuFeatureType';
import Category from './menuCategoryType';
import SubMenuItem from './menuSubType';

export default interface MainMenuType {
    id: number;
    position: number,
    menuType: string,
    menuItemLayout: string,
    menuItemName: string,
    icon_url: string,
    menuItemColour: string,

    featured_items: Array<MenuFeatureItem>,
    categories: Array<Category>,
    sub_menu_items: Array<SubMenuItem>
}

export default interface MainMenuTypes{
  MainMenuTypes: Array<MainMenuType>
}