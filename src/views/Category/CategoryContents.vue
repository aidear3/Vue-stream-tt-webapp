<template>
    <v-container fluid style="padding:0px" @click="navigationStateChange()">
        <div class="d-flex flex-column text-left mt-10 mr-10">
            <h1 style="margin-top: 75px; margin-bottom: 25px; margin-left: 125px;">{{ getTitle }}</h1>
        </div>
        <v-row v-if="menuContentType == 'LIVE_EVENTS'">
            <v-col col="3" md="3" v-for="(item, index) in LiveData" :key="index" class="px-5"
                @click="onClickLiveTV(item.live_event_id)">
                <div class="d-flex flex-column bg-none subscription-item">
                    <div style="position: relative;">
                        <img :src=isDev?CardLive:item.live_event_image_wide class="card-top-img"
                            style="width: 23vw; height: 13vw; border-radius: 1vw;">
                        <div v-if="!item.package_status" :class="disabled_vod">
                            <img :src="LockImage" style="width: 100px; height: 100px">
                        </div>
                    </div>
                    <!-- <div v-else class="d-flex flex-column">
                        <iframe 
                            style="width: 23vw; height: 13vw; border-radius: 1vw;"
                            :src=item.trailer_url 
                            allowfullscreen 
                            frameborder="0" 
                            scrolling=false> 
                        </iframe>
                    </div> -->
                    <div class="d-flex justify-start">
                        <v-avatar size="40" class="mt-5">
                            <img :src="item.content_provider_logo" style="width: 40px; height: 40px; border-radius: 50%;" @click="onClickProvider(item.content_provider_id)">
                        </v-avatar>
                        <div class="d-flex flex-column text-left" style="width: 100%;" @click="onClickLiveTV(item.live_event_id)">
                            <div class="d-flex justify-space-between mt-3 ml-5">
                                <div class="d-flex flex-column fm fcw event_short_name  justify-center" style="max-width: 300px;height: 60px;font-size: 14px;">
                                    <p class="text-truncate">{{ item.live_event_name_short }}</p>
                                    <p class="text-truncate">{{ item.content_provider_name }}</p>
                                </div>
                                <v-img v-if="item.channel_status == 'ACTIVE'" :src="LiveStatus" width="56" height="25"
                                    class="ml-10" style="float:right;">
                                </v-img>
                            </div>

                            <h3 class="fm fcg ml-5 text-truncate" style="max-width: 17vw; font-size: 14px; font-weight: 100;">
                                {{ item.live_event_date }}
                                <!-- 13th Feb 2024 - 08:00 pm -->
                            </h3>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row v-else-if="menuContentType == 'SVOD'" class="pl-5">
            <v-col col="2" md="2" v-for="(item, index) in LiveData" :key="index" class="px-5 d-flex justify-content-center">
                <v-img :src=isDev?CardVod:item.poster_url
                    :class="item.package_status?card_vod_img:card_vod_img_disabled" :title="item.caption"
                    class="subscription-item"
                    @click="item.package_status?onClickSVOD(item.id, item.is_series) : showDialog()"
                    style="position:relative; width: 250px; height: 375px; object-fit: 'fill'; " cover>
                    <!-- <v-img 
                    :src=PlayIcon
                    width="140"
                    class="card-play-icon"
                    >
                </v-img>
                <v-progress-linear
                    color="white"
                    height="5"
                    background-color="#019dff"
                    background-opacity="0.6"
                    class="card-vod-progress"

                ></v-progress-linear>  -->
                    <v-img v-if="!item.package_status" :src="PremiumRibbonIcon"
                        :class="item.package_status?active_vod:disabled_vod">
                    </v-img>
                </v-img>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent width="auto">
            <v-card>
                <v-card-title class="text-h5">
                    Alert
                </v-card-title>
                <v-card-text>Please sign in to view the content or to see what pacakges are available</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="Signin()">
                        Sign In
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped lang="scss">
@import '../../styles/home.scss';
</style>

<script>
import { ref } from 'vue';
import CardLive from '../../assets/img/card-live.png';
import CardVod from '../../assets/img/card-vod.png';
import PlayIcon from '../../assets/img/icon-play.png';
import LiveLogo from '../../assets/img/icon-live-logo-blue.png';
import LiveStatus from '../../assets/img/live-status.png';
import LockImage from '../../assets/img/lock.svg';
import PremiumRibbonIcon from '../../assets/img/icon-premium-ribbon.png';
import { useMsal } from '../../composition-api/useMsal';

import { changeTimeFormatEST } from '../../utils/date';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { loginRequest } from "../../mainConfig";
import { devMode } from '../../utils/devConfig';

// import required modules
import { Pagination } from "swiper";
import { number } from '@intlify/core-base';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            LiveLogo: LiveLogo,
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            LockImage: LockImage,
            PremiumRibbonIcon: PremiumRibbonIcon,
            LiveStatus: LiveStatus,
            CardLive: CardLive,
            CategoryData: this.$route.params.categoryId,
            categoryId: this.$route.params.categoryId,
            isDev: devMode,
            LiveData: [],
            menuContentType: this.$route.params.menuContentType,
            menuDataState: [],
            active_vod: "active-vod",
            disabled_vod: "disabled-vod",
            disabled_event_vod: "disabled-event-vod",
            card_vod_img: "card-vod-img",
            card_vod_img_disabled: "card-vod-img-disabled",
        }
    },
    mounted() {

    },
    methods: {
        getLiveEvents() {
            this.$store.dispatch("setLiveEventsByCategoryId",
                {
                    CategoryId: this.categoryId
                });
        },
        onClickLiveTV(id) {
            this.$router.push({ path: '/event/player/' + id });
        },
        getSVODs() {
            this.$store.dispatch("setSVODByCategoryId",
                {
                    CategoryId: this.categoryId
                });
        },
        onClickSVOD(vod_id, is_series) {
            if (!is_series) {
                this.$router.push({ path: '/svod/movie/' + vod_id });
            } else {
                this.$router.push({ path: '/svod/series/' + vod_id });
            }
        },
        showDialog() {
            this.dialog = true;
        },
        Signin() {
            this.dialog = false;
            this.setupSign();
        },
        navigationStateChange() {
            this.$store.dispatch("changeNavigationState", false);
        }
    },
    beforeCreate() {
        window.scrollTo(0, 0);
    },
    computed: {
        getTitle() {
            var title = '';
            let menuData = this.$store.state.MenuStore.SideMenus;
            menuData.forEach(categories => {
                categories.categories.forEach(category => {
                    if (category.menuCategoryIds == this.$route.params.categoryId) {
                        title = category.categoryName;
                        return true;
                    }
                })
            });
            return title;
        },
        LiveEvents() {
            if (this.menuContentType == "LIVE_EVENTS") {
                if (this.$store.state.EventsStore.Events.length == 0) {
                    this.getLiveEvents();
                }
                let resultValue = this.$store.state.EventsStore.Events[this.categoryId];

                if (resultValue != null && resultValue.length > 0) {
                    resultValue.map(item => {
                        item.live_event_date = changeTimeFormatEST(item.live_event_date);
                        this.LiveData.push(item);
                    })
                }

                return this.LiveData;
            } else if (this.menuContentType == "SVOD") {
                this.getSVODs();
                this.LiveData = this.$store.state.SVODStore.SVODs[this.categoryId];
                return this.$store.state.SVODStore.SVODs[this.categoryId];
            }
        },
    },
    watch: {
        LiveEvents(newVal) {
            return newVal;
        },
        categoryId(newVal) {
            return newVal;
        }
    },
    setup() {
        const dialog = ref(false);
        const { instance } = useMsal();
        const setupSign = () => {
            instance.loginPopup(loginRequest)
                .then((res) => {
                    // setAuth(response);  
                    let signInfo = {
                        loggedIn: true,
                        msalToken: res.accessToken,
                        tokenMode: state.tokenMode
                    }
                    this.$store
                        .dispatch("setToken", signInfo)
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
        return {
            dialog,
            setupSign,
            instance,
            modules: [Pagination],
        };
    },
} 
</script>

<style>

</style>