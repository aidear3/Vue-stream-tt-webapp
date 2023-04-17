<template>    
    <swiper
        :slidesPerView="4"
        :spaceBetween="20"
        :modules="modules"
        :observer="true"
        :observeParents="true"
        :parallax="true"
        navigation="navigation"
        class="mySwiper bg-none pl-5 pr-10">
        <swiper-slide
            v-for="(item, index) in testiContent"
            :key="index"
            class="item no-border bg-none"
        >  

            <div class="d-flex flex-column bg-none" >
                <div class="d-flex flex-column">
                    <img :src=CardSport class="card-top-img">
                    <!-- <v-progress-linear
                        color="blue"
                        height="5"
                        class="mb-20 card-progress"
                        value="50"
                    ></v-progress-linear>  -->
                </div>
                <div class="d-flex justify-start mb-6">
                    <v-avatar
                        size="80" 
                        class="mt20"
                    >
                        <img :src="FootballLogo" alt="FootballLogo">
                    </v-avatar>
                    <div class="d-flex flex-column text-left">
                        <div class="d-flex justify-space-between mt20 ml-5">
                            <h3 class="fm fcw">
                                Brazil vs Italy <br/>
                                Monday 21st November 2022 9:20 AM
                            </h3>
                        </div> 
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
import FootballLogo from '../assets/img/icon-football-logo.png';  
import CardSport from '../assets/img/card-sport.png';  
// import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
// import "swiper/css/pagination"; 
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

// import required modules
import { Pagination, Keyboard, Navigation, Scrollbar, A11y } from "swiper"; 

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return { 
            FootballLogo: FootballLogo,
            CardSport: CardSport,
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
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    },
    mounted() {
         
    },
    methods: {
        
    },
    setup() {
        return {
            modules: [Pagination, Keyboard, Navigation, Scrollbar, A11y],
        };
    },
} 
</script>
      