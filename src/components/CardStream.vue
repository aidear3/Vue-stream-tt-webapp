<template>    
    <swiper
        :slidesPerView="4"
        :spaceBetween="20"
        :modules="modules"
        class="mySwiper bg-none pr-5">
        <swiper-slide
            v-for="(item, index) in testiContent"
            :key="index"
            class="item no-border bg-none"
        >
            <div class="d-flex flex-column bg-none" >
                <div class="d-flex flex-column">
                    <img :src=CardLive class="card-top-img">
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
                        <img :src="LiveLogo" alt="LiveLogo">
                    </v-avatar>
                    <div class="d-flex flex-column text-left" style="width: 100%;">
                        <div class="d-flex justify-space-between mt20 ml-5">
                            <h3 class="fm fcw">
                                Stream Name#1 <br/>
                                This is very long
                            </h3>
                            <v-img :src="LiveStatus" width="56" height="25" class="ml-10" style="float:right">
                            </v-img>
                        </div>
                        
                        <h3 class="fm fcg ml-5">
                            Channel Name<br/>
                            13th Feb 2024 - 08:00 pm
                        </h3> 
                    </div>
                </div> 
            </div> 
        </swiper-slide>
    </swiper>
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

// import required modules
import { Pagination } from "swiper"; 

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return { 
            LiveLogo: LiveLogo,
            LiveStatus: LiveStatus,
            CardLive: CardLive,
            testiContent: [
                {
                    text: 'Sed imperdiet enim ligula, vitae viverra justo porta vel.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Alex Tebalek - CTO La Lieur'
                },
                {
                    text:
                    'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jean Doe - VP Company'
                },
                {
                    text:
                    'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jena Doe - Graphic Designer'
                },
                {
                    text: 'Sed imperdiet enim ligula, vitae viverra justo porta vel.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jovelin - Senior Graphic Designer'
                },
                {
                    text:
                    'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jihan Doe - CEO Software House'
                },
                {
                    text:
                    'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jovelin - Senior Graphic Designer'
                },
                {
                    text:
                    'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
                    avatar: 'imgAPI.avatar[10]',
                    name: 'Jovelin - Senior Graphic Designer'
                }
            ],
        }
    },
    mounted() {
         
    },
    methods: {
        
    },
    setup() {
        return {
        modules: [Pagination],
        };
    },
} 
</script>
      
