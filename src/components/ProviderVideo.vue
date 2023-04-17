<template>
    <div v-if="this.ttt.length > 0">
        <h4 class="text-left ml-10 fcw mb-6 mt-8">{{this.category == 'video'? 'Uploaded Videos' : 'Upcoming or Past Live Videos'}}</h4>
    </div>
    <v-row>
        <v-col cols="3" v-for="(item, index) in LiveEvents" :key="index" @click="onClickLiveTV(item.live_event_id)" class="mb-5">
            <div class="d-flex flex-column bg-none subscription-item">
                <div style="display: relative;">
                    <img :src=isDev?CardLive:item.live_event_image_wide class="card-top-img event-vod-img" style="border-radius: 1vw;">
                    <div v-if="!item.package_status" :class="disabled_vod">
                        <img :src="LockImage" style="width: 100px; height: 100px">
                    </div>
                </div>

                <!-- <div class="d-flex justify-start align-center ml-5">
                    <v-avatar size="80" class="mt20">
                        <img :src="item.content_provider_logo" style="width: 80px; height: 80px; border-radius: 50%;">
                    </v-avatar>
                    <div class="d-flex flex-column text-left" style="width: 100%;">
                        <div class="d-flex justify-space-between mt20 ml-5">
                            <h3 class="fm fcw text-truncate" style="max-width: 17vw;">
                                {{ item.live_event_name_short }} <br />
                            </h3>
                            <v-img v-if="item.channel_status == 'ACTIVE'" :src="LiveStatus" width="56" height="25"
                                class="ml-10" style="float:right;">
                            </v-img>
                        </div>

                        <h3 class="fm fcg ml-5 text-truncate" style="max-width: 17vw;font-size: 1vw;font-weight: 100;">
                            {{ item.content_provider_name }}<br />
                            {{ item.live_event_date }}
                        </h3>
                    </div>
                </div> -->

                <div class="d-flex justify-start ml-10">
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
    <swiper :slidesPerView="4" :spaceBetween="15" :modules="modules" :observer="true" :observeParents="true"
        :parallax="true" navigation="navigation" ref="swiper" class="bg-none pr-5">
        <swiper-slide v-for="(item, index) in LiveEvents" :key="index" class="item no-border bg-none"
            @click="onClickLiveTV(item.live_event_id)">
            
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
import { changeTimeFormatEST } from '../utils/date';
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import { devMode } from '../utils/devConfig';

// import required modules
import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper";
import { number } from '@intlify/core-base';

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
        },
        category: {
            type: String,
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
            isDev: devMode,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            disabled_vod: "disabled-event-vod",
        }
    },
    mounted() {
        this.getEventsByContentProviderId();
    },
    methods: {
        getEventsByContentProviderId() {
            this.$store.dispatch("getEventsByContentProviderId",
                {
                    providerId: this.providerId
                });
        },
        onClickLiveTV(id) {
            this.$router.push({ path: '/event/player/' + id });
        }
    },
    computed: {
        LiveEvents() {
            let resultVal = [];
            let val = [];
            val = this.$store.state.EventsStore.ProviderEvents;
            if (val != null && val.length > 0) {
                val.sort((a, b) => {
                    const dateA = new Date(a.live_event_date);
                    const dateB = new Date(b.live_event_date);
                    return dateB - dateA;
                });
                val.map(item => {
                    item.live_event_date = changeTimeFormatEST(item.live_event_date);
                    if(this.category == 'video') {
                        if (item.live_event_playback_status == "uploaded" || item.live_event_playback_status == "upload_pending") {
                            resultVal.push(item);
                        }
                    }else {
                        if (item.live_event_playback_status != "uploaded" && item.live_event_playback_status != "upload_pending") {
                            resultVal.push(item);
                        }
                    }
                    
                })
            }
            this.ttt = resultVal;
            return resultVal;
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

</style>