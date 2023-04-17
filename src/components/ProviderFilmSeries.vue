<template>
    <div>
        <h4 v-if="this.data.length > 0" class="text-left ml-10 fcw mt-8">{{ this.category == 'film' ? 'Films' : 'Series' }}</h4>
    </div>
    <swiper :slidesPerView="slidesPerViewCnt" :spaceBetween="cardSpaceMargin" :modules="modules" :observer="true"
        :observeParents="true" :parallax="true" navigation="navigation" class="mySwiper bg-none pl-5 pr-5">
        <swiper-slide v-for="(item, index) in SVODs" :key="index" class="item no-border bg-none">
            <!-- CardVod -->
            <!-- item.poster_url -->
            <v-img :src=isDev?CardVod:item.poster_url class="card-vod-img" :title="item.caption"
                @click="onClickSVOD(item.id, item.is_series)" style="position: relative" cover>

                <v-img v-if="!item.package_status" :src="LockImage" :class="item.package_status ? active_vod : disabled_vod">
                </v-img>

            </v-img>

        </swiper-slide>
        <template v-slot:button-prev>
            <div @click="$refs.swiper.swiperInstance.slidePrev()" class=" swiper-top-position swiper-button-prev"></div>
        </template>
        <template v-slot:button-next>
            <div @click="$refs.swiper.swiperInstance.slideNext()" class=" swiper-top-position swiper-button-next"></div>
        </template>
    </swiper>
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
</template>
      
<style scoped lang="scss">
@import '../styles/home.scss';
</style>

<script>
import { ref } from 'vue';
import CardVod from '../assets/img/card-vod.png';
import CardLive from '../assets/img/card-live.png';
import PlayIcon from '../assets/img/icon-play.png';
import LockImage from '../assets/img/lock.svg';
import { useMsal } from '../composition-api/useMsal';
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper";
import { number } from '@intlify/core-base';
import { loginRequest } from "../mainConfig";
import { devMode } from '../utils/devConfig';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        providerId: {
            type: number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            CardLive: CardLive,
            LockImage: LockImage,
            cardSpaceMargin: 10,
            slidesPerViewCnt: 7,
            data: [],
            devConfig: {},
            SVODs: [],
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            active_vod: "active-vod",
            disabled_vod: "disabled-vod",
            currentRoute: this.$router.currentRoute,
            isDev: devMode
        }
    },
    mounted() {
        this.getSeriesFilmsByContentProviderId();
    },
    methods: {
        getSeriesFilmsByContentProviderId() {
            if(this.category == "film") {
                this.$store.dispatch("getFilmsByContentProviderId",
                {
                    providerId: this.providerId
                });
            } else {
                this.$store.dispatch("getSeriesByContentProviderId",
                {
                    providerId: this.providerId
                });
            }
            
        },
        resizeCardSpace(cnt) {
            this.cardSpaceMargin = cnt * 10;
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
        }
    },
    computed: {
        devConfig() {
            return this.$store.state.SVODStore.SVODs[this.categoryId];
        },
        SVODs() {
            if(this.category == "film") {
                this.data = this.$store.state.EventsStore.FilmsEvents;
            } else {
                this.data = this.$store.state.EventsStore.SeriesEvents;
            }

            return this.data;
        },
    },
    watch: {
        SVODs(newVal) {
            return newVal;
        },
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
            modules: [Pagination, Keyboard, Navigation, Scrollbar, A11y],
        };
    },
} 
</script>

<style>

</style>