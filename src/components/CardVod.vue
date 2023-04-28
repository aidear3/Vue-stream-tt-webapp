<template>
    <swiper :breakpoints="swiperOptions.breakpoints" :slidesPerView="getSlides" :spaceBetween="cardSpaceMargin" :modules="modules" :observer="true"
        :observeParents="true" :parallax="true" navigation="navigation" class="mySwiper bg-none pl-0 pr-5 py-5">
        <swiper-slide v-for="(item, index) in SVODs" :key="index" class="item no-border bg-none subscription-item">
            <!-- CardVod -->
            <!-- item.poster_url -->
            <v-img :src=isDev?CardVod:item.poster_url :class="item.package_status ? card_vod_img : card_vod_img_disabled" :title="item.caption"
                @click="onClickSVOD(item.id, item.is_series)" style="position: relative" cover>

                <v-img v-if="!item.package_status" :src="PremiumRibbonIcon" :class="item.package_status ? active_vod : disabled_vod" class="premium-ribbon">
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
import PremiumRibbonIcon from '../assets/img/icon-premium-ribbon.png';
import { useMsal } from '../composition-api/useMsal';
// import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
// import "swiper/css/pagination";  
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
        categoryId: {
            type: number,
            required: true,
        },
    },
    data() {
        return {
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            CardLive: CardLive,
            LockImage: LockImage,
            PremiumRibbonIcon: PremiumRibbonIcon,
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
            card_vod_img: "card-vod-img",
            card_vod_img_disabled: "card-vod-img-disabled",
            currentRoute: this.$router.currentRoute,
            isDev: devMode,
            swiperOptions: {
          breakpoints: {       
      
      200: {       
         slidesPerView: 1,       
         spaceBetween: 10    
      } ,
      450: {       
         slidesPerView: 2,       
         spaceBetween: 10    
      } ,
      
      768: {       
         slidesPerView: 3,       
         spaceBetween: 10    
      } ,
      1278: {       
         slidesPerView: 4,       
         spaceBetween: 10    
      } ,
      
      1920: {       
         slidesPerView: 4,       
         spaceBetween: 10    
      } 

   }   
        }
        }
    },
    mounted() {
        this.getSVODs();
    },
    methods: {
        getSVODs() {
            this.$store.dispatch("setSVODByCategoryId",
                {
                    CategoryId: this.categoryId
                });
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
            this.getSVODs();
            this.data = this.$store.state.SVODStore.SVODs[this.categoryId];
            return this.$store.state.SVODStore.SVODs[this.categoryId];
        },
        getSlides() {
            let width = window.innerWidth;
            if(width > 572) {
                this.slidesPerViewCnt = 7;
            }else {
                this.slidesPerViewCnt = 2.1;
            }
            return this.slidesPerViewCnt;
        }
    },
    watch: {
        SVODs(newVal) {
            this.getSVODs();
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
.active-vod {
    opacity: 1;
}

.disabled-vod {
    position: absolute !important;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1001;
    margin: 0 !important;
    align-items: center;
    justify-content: center;
    display: flex !important;
}

.disabled-vod img {
    width: 100% !important;
    position: static;
}

.disabled-vod .v-responsive__sizer {
    display: none;
}

.card-vod-img .v-img__img--cover {
    z-index: -1;
    position: absolute;
    top: 0;
    left: auto;
    width: 257px;
    height: 379px;
    border-radius: 20px;
}
.card-vod-img .v-img__img--cover{
    margin-left:0 !important
}
.card-vod-img-disabled .v-img__img--cover {
    z-index: -1;
    position: absolute;
    top: 0;
    left: auto;
    width: 257px;
    height: 379px;
    border-radius: 20px;
    background: #000;
    opacity: 0.5;
}

@media screen and (min-width: 1536px) and (max-width: 1699px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 165px !important;
        height: 249px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 165px !important;
        height: 249px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 1700px) and (max-width: 1999px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 195px !important;
        height: 293px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 195px !important;
        height: 293px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 2000px) and (max-width: 2150px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 240px !important;
        height: 360px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 240px !important;
        height: 360px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 2151px) and (max-width: 2400px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 260px !important;
        height: 388px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 260px !important;
        height: 388px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 2401px) and (max-width: 2560px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 285px !important;
        height: 430px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 285px !important;
        height: 430px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 2561px) and (max-width: 2880px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 320px !important;
        height: 485px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 320px !important;
        height: 485px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}

@media screen and (min-width: 2881px) {
    .card-vod-img .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 420px !important;
        height: 630px !important;
        border-radius: 20px;
    }
    .card-vod-img-disabled .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 420px !important;
        height: 630px !important;
        border-radius: 20px;
        background: #000;
        opacity: 0.5;
    }
}
@media screen and (max-width: 560px) {
    .v-img__img--cover {
        z-index: -1;
        top: 0;
        left: auto;
        width: 230px !important;
        height: 345px !important;
        border-radius: 20px !important;
        margin-left: 10px !important;
    }
    .premium-ribbon {
        width: 235px;
        padding-bottom: 22px;
    }
}
@media screen and (max-width: 768px)

.swiper[data-v-9ef02bd0] {
    padding-right: 0 !important;
    padding-left: 0 !important;
}
</style>
