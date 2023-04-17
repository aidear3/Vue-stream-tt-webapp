<template>
    <v-navigation-drawer expand-on-hover rail rail-width="100" class="lighten-3" :clipped="clipped" enable-resize-watcher
        app style="color: #fff;
        box-shadow: 0px 0px 0px 0px;
        border: 0px;
        top: 0px; 
        padding-top: 105px;
        padding-left: 20px;
        padding-right: 10vw;
        height: 100vh;"
        :style="showMenuBar ? backgroundStyle_show : backgroundStyle_hide">
        <v-list nav :style="navStyle">
            <v-list-item prepend-icon="mdi-magnify" :style="searchItemStyle">
                <v-list-item-content>
                    Search
                </v-list-item-content>
            </v-list-item>

            <v-list-group expand-icon="" collapse-icon="" v-for="(menuItem, index) in menuItems">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :prepend-avatar="menuItem?.icon_url" class="mb-3"
                        :style="getActiveMenu == menuItem.id ? activeItemStyle : inActiveItemStyle"
                        @click="onClickParentMenu(index)">
                        <v-list-item-content>
                            <div>{{ menuItem?.menuItemName }}</div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <v-list-group expand-icon="" collapse-icon="" v-if="menuItem.sub_menu_items.length"
                    v-for="(subItem, subIndex) in menuItem.sub_menu_items">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" :style="getActiveMenu == subItem.id ? activeItemStyle : inActiveItemStyle"
                            :prepend-avatar="subItem.icon_url" @click="onClickSubMenu(index, subIndex)">
                            <v-list-item-content>
                                <div>{{ subItem?.subMenuName }}</div>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-group>
            </v-list-group>

            <!-- <v-list-item 
                prepend-icon="mdi-account-cog-outline" 
                title="Account Settings" 
                value="Account Settings" 
                style="text-align: left; calc(var(--v-icon-size-multiplier) * 2.5em);color: #fff;opacity: 1;" 
            >
            </v-list-item> -->
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import {
    FONT_COLOR_1,
    HIGHLIGHT_COLOR_2,
    SIDEEFFECTBAR_1,
    SIDEEFFECTBAR_2,
    SIDEEFFECTBAR_3,
    SIDEEFFECTBAR_4
} from '@/mainConfig'
export default {
    data: () => ({
        isOverLeave: false,
        currentRoute: '',
        backgroundStyle_show: {
            background: 'linear-gradient(90deg, ' + SIDEEFFECTBAR_1 + ' 0%, ' + SIDEEFFECTBAR_2 + ' 53%, ' + SIDEEFFECTBAR_3 + ' 86%, ' + SIDEEFFECTBAR_4 + ' 100%)',
            width: '30vw',
            paddingRight: '10vw'
        },
        backgroundStyle_hide: {
            background: 'transparent',
            width: '0vw',
            paddingRight: '6px'
        },
        navStyle: {
            textAlign: 'left',
            color: FONT_COLOR_1
        },
        searchItemStyle: {
            textAlign: 'left',
            paddingTop: '2px',
            fontSize: '20px',
            color: FONT_COLOR_1
        },
        activeItemStyle: {
            backgroundColor: HIGHLIGHT_COLOR_2,
            borderLeft: '2px solid green',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px'
        },
        inActiveItemStyle: {
            backgroundColor: '',
            borderLeft: '',
            borderTopLeftRadius: '',
            borderBottomLeftRadius: ''
        }
    }),
    mounted() {
    },
    methods: {
        mouseOverNavigationBar() {
            this.isOverLeave = true;
        },
        mouseLeaveNavigationBar() {
            this.isOverLeave = false;
        },
        onClickParentMenu(index) {

            let MainMenuTypes = this.$store.state.MenuStore.SideMenus;
            if (!MainMenuTypes[this.$store.state.MenuStore.MenuIds[index]].sub_menu_items.length) {
                let menuId = MainMenuTypes.length ? MainMenuTypes[this.$store.state.MenuStore.MenuIds[index]].id : [];
                this.currentRoute = menuId;
                this.$router.push({ path: '/menu/' + menuId });
            }
        },
        onClickSubMenu(index, subIndex) {
            let MainMenuTypes = this.$store.state.MenuStore.SideMenus;
            if (MainMenuTypes[this.$store.state.MenuStore.MenuIds[index]].sub_menu_items.length) {
                let subMenuId = MainMenuTypes.length ? MainMenuTypes[this.$store.state.MenuStore.MenuIds[index]].sub_menu_items[subIndex].id : [];
                let menuId = MainMenuTypes.length ? MainMenuTypes[this.$store.state.MenuStore.MenuIds[index]].id : [];
                // path: '/menu/:menuId/s/:subMenuId',
                this.currentRoute = subMenuId;
                this.$router.push({ path: '/menu/' + menuId + '/s/' + subMenuId });
            }
        }
    },
    computed: {
        menuItems() {
            return this.$store.state.MenuStore.SideMenus;
        },
        showMenuBar() {
            this.$store.state.NavigationStore.navigationState ? this.isOverLeave = true : this.isOverLeave = false;
            return this.isOverLeave;
        },
        getActiveMenu() {
            if (this.currentRoute == "") {
                let router = this.$router.currentRoute._value.params;
                if (router.menuId) {
                    if (router.subMenuId) {
                        this.currentRoute = router.subMenuId;
                    } else {
                        this.currentRoute = router.menuId
                    }

                } else {
                    let menus = this.$store.state.MenuStore.SideMenus;
                    menus.forEach(item => {
                        if (item.menuItemName == "Home") {
                            this.currentRoute = item.id;
                        }
                    });
                }
            }
            return this.currentRoute;
        }
    },
    watch: {
        menuItems(newVal) {
            return newVal;
        },
        $route(to, from) {
            this.$store.dispatch("changeNavigationState", false);
        }
    },
} 
</script>