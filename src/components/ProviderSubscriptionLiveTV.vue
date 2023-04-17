<template>
    <div v-if="LiveEvents.length > 0">
        <h4 class="text-left ml-10 fcw mb-3 mt-8">Live TV</h4>
    </div>
    <swiper v-if="LiveEvents.length > 0" :slidesPerView="4" :spaceBetween="15" :modules="modules" :observer="true" :observeParents="true"
        :parallax="true" navigation="navigation" ref="swiper" class="bg-none pr-5">
        <swiper-slide v-for="(item, index) in LiveEvents" :key="index" class="item no-border bg-none subscription-item"
            @click="goToPackage(item.package_id)">
            <div class="d-flex flex-column bg-none mb-10">
                <div style="display: relative;">
                    <img :src=isDev?CardLive:item.package_image class="card-top-img event-vod-img">
                </div>

                <div class="d-flex justify-start mt-5">
                    <div class="d-flex flex-column text-left" style="width: 100%;">
                        <div class="d-flex flex-column ">
                            <h3 class="fm fcw text-truncate event_short_name text-truncate pb-1">
                                {{ item.package_name }} 
                            </h3>
                            <h3 class="fm fcg text-truncate mt-3 pb-3" style="font-size: 1vw; font-weight: 100;">
                                $ {{ item.ppgroup_price }}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
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
import CardLive from '../assets/img/card-live.png';
import LiveLogo from '../assets/img/icon-live-logo-blue.png';
import LiveStatus from '../assets/img/live-status.png';
import VideoPlayer from '@/components/VodeoPlayer.vue';
import LockImage from '../assets/img/lock.svg';
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import { devMode } from '../utils/devConfig';
// import required modules
import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper";
import { number } from '@intlify/core-base';
import { getGuestToken, getSubscriptionSVOD, getSubscriptionLiveTV } from '@/utils/siberapi';

export default {
    components: {
        Swiper,
        SwiperSlide,
        VideoPlayer,
    },
    props: {
        providerId: {
            type: number,
            required: true,
        }
    },
    data() {
        return {
            LiveLogo: LiveLogo,
            LiveStatus: LiveStatus,
            CardLive: CardLive,
            CategoryData: this.categoryId,
            LockImage: LockImage,
            ttt: [],
            subscriptions: [],
            isDev: devMode,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            disabled_vod: "disabled-event-vod",
        }
    },
    mounted() {
        this.getSubscriptionSVOD();
    },
    methods: {
        getSubscriptionSVOD() {
            let auth = this.$store.getters.getAuth;
            let token = auth.auth.msalToken;
            if (token == '') {
                token = localStorage.getItem('authToken') || "";
            }
            
            let apiParams = {
                token: token,
                providerId: this.providerId
            }
            getSubscriptionLiveTV(apiParams)
            .then(res => {
                if(res.data.response.packages && res.data.response.packages != null && res.data.response.packages.length > 0) {
                    this.ttt = res.data.response.packages;
                } 
            });
        },  
        goToPackage(id) {
            this.$router.push({ path: '/svod/package/' + id });
        }
    },
    computed: {
        LiveEvents() {
            if(this.ttt.length > 0) {
                this.ttt.forEach(item => {
                    if(item.package_pgroups_cards.length > 0) {
                        item.package_pgroups_cards.forEach(card => {
                            let obj = {};
                            obj.package_id = item.package_id;
                            obj.package_name = item.package_name;
                            obj.package_image = item.package_image;
                            obj.ppgroup_price = card.pgroup_price;
                            obj.subscription = card.custom_data ? card.custom_data.subscription : '';
                            this.subscriptions.push(obj);
                        })
                    }                    
                });
            }
            return this.subscriptions;
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
        return {
            modules: [Pagination, Keyboard, Navigation, Scrollbar, A11y],
        };
    },
} 
</script>
<style>
.active-event-vod {
    opacity: 1;
}

.disabled-event-vod {
    background: rgb(17 17 17);
    position: absolute !important;
    left: 0;
    right: 0;
    bottom: 102px;
    top: 0;
    z-index: 1001;
    margin: 0;
    opacity: 0.5 !important;
    align-items: center;
    justify-content: center;
    display: flex !important;
}

.event-vod-img {
    width: 441px;
    height: 249px;
    border-radius: 1vw;
}

</style>