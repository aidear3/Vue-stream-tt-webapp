<template>
    <swiper :slidesPerView="slidesPerViewCnt" :spaceBetween="cardSpaceMargin" :modules="modules" :observer="true"
        :observeParents="true" :parallax="true" navigation="navigation" class="mySwiper bg-none pl-5 pr-5">
        <swiper-slide v-for="(item, index) in this.categoryList" :key="index" class="item no-border bg-none"
            @click="onClickPlayer(item.id)">

            <v-img :src="isDev?CardVod:item.poster_url" class="card-vod-img" :title="item.name_short"
                style="position: relative" cover>
            </v-img>
        </swiper-slide>
        <template v-slot:button-prev>
            <div @click="$refs.swiper.swiperInstance.slidePrev()" class=" swiper-top-position swiper-button-prev"></div>
        </template>
        <template v-slot:button-next>
            <div @click="$refs.swiper.swiperInstance.slideNext()" class=" swiper-top-position swiper-button-next"></div>
        </template>
    </swiper>
</template>
      
<style scoped lang="scss">
@import '../styles/home.scss';
</style>

<script>
import CardVod from '../assets/img/card-vod.png';
import CardLive from '../assets/img/card-live.png';
import PlayIcon from '../assets/img/icon-play.png';
import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import { getSVODById, getSVODSeriesById, getGuestToken } from '@/utils/siberapi';

import { devMode } from '../utils/devConfig';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        categoryList: {
            type: Array,
            required: true,
        },
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            CardLive: CardLive,
            cardSpaceMargin: 10,
            slidesPerViewCnt: 7,
            devConfig: {},
            SVODs: [],
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            currentRoute: this.$router.currentRoute,
            isDev: devMode
        }
    },
    mounted() {
        this.clearAllComponents();
    },
    methods: {
        clearAllComponents() {
            this.SVODs = [];
        },
        getSVODs(id) {
            if (this.type == "movies") {
                let auth = this.$store.getters.getAuth;
                let token = auth.auth.msalToken;
                if (token == '') {
                    token = localStorage.getItem('authToken') || "";
                }
                if (token == '' && auth.auth.tokenMode == "guest") {
                    getGuestToken().then((value) => {
                        let apiParams = {
                            token: value.data.access_token,
                            vodId: id
                        }
                        getSVODById(apiParams).then((res) => {
                            this.SVODs.push(res.data.response.movie_info[0]);

                        });
                    })
                } else {
                    let apiParams = {
                        token: token,
                        vodId: id
                    }
                    getSVODById(apiParams).then(res => {
                        this.SVODs.push(res.data.response.movie_info[0]);
                    });
                }
            } else {
                let auth = this.$store.getters.getAuth;
                let token = auth.auth.msalToken;
                if (token == '') {
                    token = localStorage.getItem('authToken') || "";
                }
                if (token == '' && auth.auth.tokenMode == "guest") {
                    getGuestToken().then((value) => {
                        let apiParams = {
                            token: value.data.access_token,
                            vodId: id
                        }
                        getSVODSeriesById(apiParams).then((res) => {
                            this.SVODs.push(res.data.response.series);
                        });
                    })
                } else {
                    let apiParams = {
                        token: token,
                        vodId: id
                    }
                    getSVODSeriesById(apiParams).then(res => {
                        this.SVODs.push(res.data.response.series);
                    });
                }
            }
        },
        resizeCardSpace(cnt) {
            this.cardSpaceMargin = cnt * 10;
        },
        onClickSVOD(vod_id) {
            this.$router.push({ path: '/svod/movie/' + vod_id });
        },
        onClickPlayer(vod_id) {
            this.$router.push({ path: '/svod/player/' + vod_id });
        }
    },
    computed: {
        SVODs() {
            this.categoryList.forEach(item => {
                this.getSVODs(item);
            });
            return this.SVODs;
        },
    },
    watch: {
        SVODs(newVal) {
            return newVal;
        },
        categoryList(newVal) {
            return newVal;
        }
    },
    setup() {
        return {
            modules: [Pagination, Keyboard, Navigation, Scrollbar, A11y],
        };
    },
} 
</script>
      