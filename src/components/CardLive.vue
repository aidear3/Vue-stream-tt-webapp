<template>    
    <swiper
        :options="SwiperOptions"
        class="mySwiper bg-none pr-5">
        <swiper-slide
            v-for="(item, index) in LiveTV"
            :key="index"
            class="item no-border bg-none"
        >
            <div class="d-flex flex-column bg-none" >
                <div class="d-flex flex-column">
                    <img 
                        :src=item.image_wide 
                        class="card-top-img"
                        style="width: 23vw; height: 15vw; border-radius: 1vw;"
                    >
                    <!-- <v-progress-linear
                        color="blue"
                        height="5"
                        class="mb-20 card-progress"
                        value="50"
                    ></v-progress-linear>  -->
                </div>
                <div class="d-flex justify-start">
                    <v-avatar
                        size="80" 
                        class="mt20"
                    >
                        <img :src="item.icon_url" style="width: 6vw; height: 6vw; border-radius: 1vw;">
                    </v-avatar>
                    <div class="d-flex flex-column text-left" style="width: 100%;">
                        <div class="d-flex justify-space-between mt20 ml-5">
                            <h3 class="fm fcw">
                                {{item.caption_short}} <br/>
                                <!-- {{item.caption}} <br/> -->
                            </h3>
                            <v-img 
                                v-if="item.channel_status == 'ACTIVE'" 
                                :src="LiveStatus" 
                                width="56" 
                                height="25" 
                                class="ml-10" 
                                style="float:right;">
                            </v-img>
                        </div>
                        
                        <h3 class="fm fcg ml-5">
                            {{item.caption}}<br/>
                            <!-- 13th Feb 2024 - 08:00 pm -->
                        </h3> 
                    </div>
                </div> 
            </div> 
        </swiper-slide>
    </swiper>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
</template>
      
<style scoped lang="scss">
    @import '../styles/home.scss';
</style>

<script>
import CardLive from '../assets/img/card-live.png'; 
import LiveLogo from '../assets/img/icon-live-logo-blue.png';  
import LiveStatus from '../assets/img/live-status.png';  
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination"; 
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";

import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper"; 
import { number } from '@intlify/core-base';

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
            SwiperOptions: {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slidesPerView: 4,
                spaceBetween: 20,
                observer: true,
                observeParents: true,
                parallax:true,
                modules: [Pagination, Keyboard, Navigation, Scrollbar, A11y]
            },
            LiveLogo: LiveLogo,
            LiveStatus: LiveStatus,
            CardLive: CardLive,
            CategoryData: this.categoryId,
            LiveTV: [],
        }
    },
    mounted() {
         
    },
    methods: {
        getLiveTV() {
             this.$store.dispatch("setLiveEventsByCategoryId",
                {
                    CategoryId: this.categoryId
                }); 
		}, 
    },
    computed: {
		LiveTV() {  
            if (this.$store.state.LiveStore.tv_channels.length == 0) {
                this.getLiveTV();
            }
            return this.$store.state.LiveStore.tv_channels;
		},
	},
    watch: {
		LiveTV(newVal) { 
            
            return newVal; 
		},
        categoryId(newVal){
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
      
