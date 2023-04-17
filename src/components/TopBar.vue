<template>
    <v-app-bar class="d-flex justify-space-between align-baseline"
        :style="backgroundStyle">
        <div class="navmb" style="display: flex; justify-content: space-around;align-items: center;width: 100%;">
           <v-btn icon id="menu_flat_icon" class="ml-7"  @click="changeStateValue()">
                <v-icon size="50">mdi-menu</v-icon>
            </v-btn>
            <router-link to="/">
                <div class="streamTT" style="@media screen and (max-width : 560px){margin-left:0px !important}">
                <img :src=logo class="d-flex justify-start align-center"
                    style="margin-left: 50px;float:left; width: 177px;"/>
                </div>
            </router-link>
             
        </div>

        <div class="d-flex justify-end align-center mr-10" style="width: 90% ;" @click="navigationChange()" id="menu_hidden" ref="menu_hidden">
            <v-menu open-on-hover v-for="(menu, index) in TopMenu" :key="index">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="d-flex align-center top-bar-menu" style="text-transform: capitalize; font-size: 16px; font-weight: 400; border-radius: 30px; ">
                        <img v-if="menu.icon != ''" :src="menu.icon" class="mr-2" style="width:20px; height: 20px;"/>
                        {{ menu.item }}
                    </v-btn>
                </template>

                <v-list v-if="menu.subItems.length > 0">
                    <v-list-item v-for="(item, id) in menu.subItems" :key="id">
                        <v-list-item-title class="d-flex align-center" style="border-radius: 30px;text-transform: capitalize; font-size: 16px; font-weight: 400;">
                            <v-btn class="d-flex align-center top-bar-menu" style="text-transform: capitalize; font-size: 16px; font-weight: 400;border-radius: 30px;">
                                <img v-if="item.icon != ''" :src="item.icon" class="mr-2" style="width:20px; height: 20px;"/>{{ item.name }}
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">
                        Download Apps
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, index) in state.WatchOnItems" :key="index">
                        <v-list-item-title>{{ item.item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" v-on:click="selectPackage(state.PackageItems[0].item)">
                        Packages
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, index) in state.PackageItems" :key="index"
                        v-on:click="selectPackage(item.item)">
                        <v-list-item-title>{{ item.item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">
                        About Us
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, index) in state.AboutItems" :key="index">
                        <v-list-item-title>{{ item.item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->

            <!-- <v-btn icon id="play_video">
                <v-icon>mdi-play-network</v-icon>
            </v-btn>

            <v-btn icon class="">
                <v-icon>mdi-play-box-lock-outline</v-icon>
            </v-btn> -->

            <v-btn depressed color="white" class="mr-15 white--text top-bar-menu" v-if="isUserLoggedIn.tokenMode == 'guest'"
                v-on:click="signinPopup('msal_login')" style="text-transform: capitalize; font-size: 16px; font-weight: 400;">
                Sign In
            </v-btn>

            <v-menu open-on-hover v-if="isUserLoggedIn.tokenMode != 'guest'" style="margin-right: 50px;">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon x-large class="top-bar-menu"
                        style="border-radius: 30px;background-color: #ffffff;color: #000;font-size: 20px;margin-left: 30px;margin-right: 50px;">
                        <v-icon x-large>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, index) in SignoutMenu[0].subItems" :key="index">
                        <v-btn class="d-flex align-center top-bar-menu" style="text-transform: capitalize; font-size: 16px; font-weight: 400;">
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-btn>
                    </v-list-item>

                    <!-- <v-list-item v-on:click="logoutPopup">
                        <v-list-item-title>Sign out</v-list-item-title>
                    </v-list-item> -->
                </v-list>
            </v-menu>

        </div>

        <v-dialog v-model="showDialog" max-width="450">
            <v-card class="rounded-lg">
                <v-card-title class="text-h5 text-center mt-3">
                    Too Many Logged in Devices!
                    <v-divider></v-divider>
                    <div class="text-subtitle-1 justify-center align-center mt-4">
                        Select a device to sign out of to 
                    </div>
                    <div class="text-subtitle-1 justify-center align-center">
                        get access on this device
                    </div>
                </v-card-title>
                <v-list class="mx-auto" dense>
                    <v-list-item-group v-model="selectedItem" color="primary">
                        <v-list-item v-for="(item, index) in getDevices" :key="index" class="pa-0">
                            <v-divider v-if="index < getDevices.length" :key="index"></v-divider>

                            <v-list-item-content class="d-flex justify-space-between align-center px-3 py-2 item-select">
                                <v-img v-if="item.device_type == 'website'" :src="webImage" width="40" height="40" class="mr-3"></v-img>
                                <v-img v-if="item.device_type == 'android'" :src="android" width="40" height="40" class="mr-3"></v-img>
                                <v-img v-if="item.device_type == 'iphone'" :src="iphone" width="40" height="40" class="mr-3"></v-img>
                                <div class="text-subtitle-1 justify-start align-center" style="width: 40vw;">
                                    Last Seen:
                                    <p class="text-caption text--disabled">{{ item.device_last_seen }}</p>
                                </div>
                                <div class="text-subtitle-1 justify-start align-center">
                                    <button class="bg-blue px-5 py-1" style="border-radius: 10px; line-height: 19px;">Sign out</button>
                                </div>
                            </v-list-item-content>

                            <v-divider v-if="index < getDevices.length" :key="index"></v-divider>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script>
import { useMsal } from '../composition-api/useMsal';
import { loginRequest, BACKGROUND_COLOR_1, FONT_COLOR_1, TopMenu, Signout } from "../mainConfig";
import { key } from '../store'
import { useStore } from 'vuex'
import logo from '../assets/img/stream-logo.png';
import webImage from '../assets/img/chrome.png';
import iphone from '../assets/img/apple.png';
import android from '../assets/img/android.png';
import { changeTimeFormatEST } from '../utils/date';

export default {
    data() {
        return {
            logo: logo,
            selectedItem: 0,
            dialog: false,
            deviceList: [],
            iphone: iphone,
            android: android,
            webImage: webImage,
            TopMenu: TopMenu,
            SignoutMenu: Signout,
            backgroundStyle: {
                backgroundColor: 'transparent',
                border: '0px',
                boxShadow: '0px 0px 0px 0px',
                'color': FONT_COLOR_1
            },
            state: {
                tokenMode: 'guest',
            }
        }
    },
    beforeCreate() {
        let tokenMode = window.sessionStorage.getItem("tokenMode");
        if (tokenMode == null || tokenMode == "" || tokenMode == "guest") {
            this.$store.dispatch("setToken", { tokenMode: 'guest' });
        } else {
            let msalToken = window.localStorage.getItem("authToken");
            let signInfo = {
                loggedIn: true,
                msalToken: msalToken,
                tokenMode: tokenMode
            }
            this.$store.dispatch("setToken", signInfo);
        }
    },
    computed: {
        isUserLoggedIn() {
            let auth = this.$store.getters.getAuth;
            this.state.tokenMode = auth.auth.tokenMode;
            return auth.auth;
        },  
        getDevices() {
            let auth = this.$store.getters.getAuth;
            if(auth.devices && auth.devices.length > 0) {
                this.dialog = true;
                this.deviceList = auth.devices;
                this.deviceList.filter(item => item.device_last_seen = changeTimeFormatEST(item.device_last_seen));
            }
            return this.deviceList;
        },
        showDialog() {
            // let auth = this.$store.getters.getAuth;
            // if(auth.devices && auth.devices.length > 0) {
            //     this.dialog = true;
            // }
            return this.dialog;
        }
    },
    methods: {
        changeStateValue() {
            let navigationState = this.$store.getters.getNavigationState;
            navigationState = !navigationState;
            this.$store.dispatch("changeNavigationState", navigationState);
          this.$refs.menu_hidden.classList.toggle("activenavbar")
         this.$el.querySelector(".v-toolbar__content").classList.toggle("activeheader")
        },
        setAuth(res) {
            let signInfo = {
                loggedIn: true,
                msalToken: res.accessToken,
                tokenMode: state.tokenMode
            }
            this.$store
                .dispatch("setToken", signInfo)
                .then(() => {
                    window.localStorage.setItem('signInfo', JSON.stringify(signInfo));
                })
                .catch(err => {
                    console.log(err);
                });
        },
        navigationChange() {
            this.$store.dispatch("changeNavigationState", false);
            this.$emit("navigationChange", false);
        },
        selectPackage(itemId) {
            this.$emit("showModal", itemId);
        },
        signinPopup(isSignIn) {
            this.loginPopup(isSignIn);
        }
    },
    watch: {

    },
    setup() {
        const { instance } = useMsal();
        const store = useStore(key)
        const loginPopup = (isSignIn) => {
            if (isSignIn != 'msal_login') {
                let tokenMode = window.sessionStorage.getItem("tokenMode");
                if (tokenMode == "") {
                    store.dispatch("setToken", { tokenMode: 'guest' });
                }
            } else {
                instance.loginPopup(loginRequest)
                    .then((res) => {
                        let signInfo = {
                            loggedIn: true,
                            msalToken: res.accessToken,
                            tokenMode: res.tokenType
                        }
                        store.dispatch("setToken", signInfo)
                            .then(() => {
                                localStorage.setItem("authToken", res.accessToken);
                                window.sessionStorage.setItem("tokenMode", res.tokenType);
                                window.localStorage.setItem('signInfo', JSON.stringify(signInfo));
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }).catch((e) => {
                        // error.value = e;
                        // result.value = null;
                    });
            }
        }
        const logoutPopup = () => {
            instance.logoutPopup({
                mainWindowRedirectUri: "/"
            }).then((res) => {
                window.sessionStorage.removeItem("tokenMode");
                window.localStorage.removeItem("authToken");
                store.dispatch("setToken", { tokenMode: 'guest' });
            });
        }
        const logoutRedirect = () => {
            instance.logoutRedirect();
        }

        return {
            loginPopup,
            logoutPopup,
            logoutRedirect
        }
    }
}

</script>

<style>
    /* .v-btn:hover > .v-btn__overlay {
            opacity: 1;
            background-color: #8b0000;
    } */
    .top-bar-menu:hover {
            opacity: 1;
            background-color: #8b0000;
            border-radius: 30px;
    }
    .v-btn--variant-text .v-btn__overlay {
            border-radius: 30px;
    }
    .v-btn--variant-text .v-btn__underlay {
            border-radius: 30px;
    }
    @media screen and (max-width: 768px) {
        #menu_hidden {
            padding-top:20px !important;
            width: 90%;
            justify-content: center !important;
            flex-direction: column;
            align-items: center !important;
            position: relative;
            margin-right:0 !important;
            top: -300px;
            transition: all 0.3s ease-in-out;
        }
        .activenavbar button {
margin-bottom: 10px !important;
margin-right:0 !important;
        padding:0 !important;
        }
         header .v-toolbar__content{
            height:64px ;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            transition: all 0.3s ease-in-out;
        }
        .activenavbar{
            top: 0 !important;
            display:flex !important;
        }
        .activeheader{
            height:290px !important
        }
        .navmb{
            flex-direction:row-reverse;
        }
       
    }
    header{
        background: black !important;
        margin-top: 0px !important; 
        padding-top: 10px !important;
        padding-bottom: 10px !important;

    }
</style>