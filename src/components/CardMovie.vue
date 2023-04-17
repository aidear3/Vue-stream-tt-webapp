<template>   
    <div>
        <h4 class="text-left ml-50">
            Live and Upcoming
        </h4>  
        <swiper
            :slidesPerView="4"
            :spaceBetween="50"
             
            :modules="modules"
            class="mySwiper">
            <swiper-slide
                v-for="(item, index) in SVODs"
                :key="index"
                class="item bg-black no-border"
            > 
                <v-card
                    class="stream-card" 
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-img 
                        :src=item.poster_url 
                        class="card-item-img"
                    >
                        <v-card-text class="live-card-item-mark">   
                            <v-card-title class="live-card-item">
                                <div class="text-subtitle-3 fcw">
                                    <h5 class="fcw fs-18">Stream Name</h5>
                                    <h5 class="fcg">This is very long</h5>
                                </div>  
                                <v-avatar
                                    size="35" 
                                >
                                    <img :src="streamlogo" alt="streamlogo">
                                </v-avatar>
                            </v-card-title>   
                            
                            <v-progress-linear
                                color="white"
                                height="8"
                                background-color="#019dff"
                                background-opacity="0.6"
                                class="lcard-progress-bar"

                            ></v-progress-linear>  
                            
                            
                        </v-card-text>  
                    </v-img> 
                    
                    
                </v-card> 
            </swiper-slide>
        </swiper>
    </div>
</template>
      
<style scoped lang="scss">
    @import '../styles/home.scss';
</style>

<script>
import LiveLogo from '../assets/img/icon-live-logo-blue.png';  
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
    props: {
		categoryId: {
			type: number,
			required: true,
		}, 
	},
    data() {
        return { 
            LiveLogo: LiveLogo,
            LiveStatus: LiveStatus,
            CardLive: CardLive,
            CategoryData: this.categoryId,
            SVODs: [],
        }
    },
    mounted() {
         
    },
    methods: {
        getSVODs() {
             this.$store.dispatch("setSVODByCategoryId",
                {
                    CategoryId: this.categoryId
                }); 
		}, 
    },
    computed: {
		SVODs() {   
            if (this.$store.state.SVODStore.SVODs.length == 0) {
                this.getSVODs();
            }
            return this.$store.state.SVODStore.SVODs[this.categoryId];
		},
	},
    watch: {
		SVODs(newVal) { 
            
            return newVal; 
		},
        categoryId(newVal){
            return newVal;
        }
	},
    setup() {
        return {
        modules: [Pagination],
        };
    },
} 
</script>
      