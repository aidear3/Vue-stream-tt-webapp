<template>
    <div class="d-flex" v-if="this.getPackage && this.getPackage.length > 0" style="margin-top:150px;margin-left: 100px;" @click="navigationStateChange()">
        <v-img :src="isDev?CardVod:this.packageObj[0].package_image" width="400" style="border-radius: 10px;"></v-img>
        <div class="d-flex flex-column justify-start text-left align-start px-16" style="width: 65vw;">
            <div class="d-flex justify-start align-center mb-5">
                <v-img :src="this.packageObj[0].content_provider_logo" width="50" height="50" style="border-radius: 50%;" class="mr-3"></v-img>
                <div class="d-flex justify-start align-start text-subtitle-1">
                    <!-- {{ item.title }} -->
                    {{ this.packageObj[0].package_name }}
                </div>
            </div>

            <div class="text-subtitle-1 justify-center align-start">
                <p class="text-caption text--disabled">
                    <!-- {{ item.subtitle }} -->
                    {{this.packageObj[0].package_description}}
                </p>
            </div>
        </div>
        <div class="d-flex flex-column justify-start pa-10 mr-10" style="align-items: center;">
            <div class="text-subtitle-1 mb-1">
                <!-- {{ item.title }} -->
                Subscription
                <!-- <p class="text-caption text--disabled">{{ item.subtitle }}</p> -->
            </div>
            <div class="text-h5 mb-6">
                <!-- {{ item.title }} -->
                ${{this.packageObj[0].package_price}}
                <!-- <p class="text-caption text--disabled">{{ item.subtitle }}</p> -->
            </div>
            <div class="text-subtitle-1 round-md">
                <!-- {{ item.price }} -->

                <v-btn depressed color="white" :style="ButtonColor" @click="gotoSubscriptionUrl(this.packageObj[0].package_subscription_url)">
                    Access Option
                </v-btn>
            </div>
        </div>
    </div>
    <div>
        <div class="text-h6 mb-2">
            All content included in Subscription
        </div>
        <v-divider class="mb-5"></v-divider>
        <v-row v-if="moviesInPackage && moviesInPackage.length > 0">
            <v-col cols="12" md="12">
                <h4 class="text-left ml-10 fcw">
                    <!-- {{category.categoryName}} -->
                    Films
                </h4>
            </v-col>
            <v-col cols="12" md="12">
                <SVODAccessContents :categoryList="moviesInPackage" type="movies" />
            </v-col>
        </v-row>
        <v-row v-if="seriesInPackage && seriesInPackage.length > 0">
            <v-col cols="12" md="12">
                <h4 class="text-left ml-10 fcw">
                    <!-- {{category.categoryName}} -->
                    Series
                </h4>
            </v-col>
            <v-col cols="12" md="12">
                <SVODAccessContents :categoryList="seriesInPackage" type="series" />
            </v-col>
        </v-row>
    </div>
</template> 
  
<style scoped lang="scss">
@import '../../styles/home.scss';
</style>

<script>
import CardVod from '../../assets/img/card-live.png';
import iconLogo from '../../assets/img/icon-live-logo-red.png';
import PlayIcon from '../../assets/img/icon-play.png';
import SVODAccessContents from '../../components/SVODAccessContents.vue';

import { number } from '@intlify/core-base';
import { HIGHLIGHT_COLOR_1, FONT_COLOR_1 } from '@/mainConfig';
import { devMode } from '../../utils/devConfig';

export default {
    name: 'SVODAcessContent',
    components: {
        SVODAccessContents,
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
            iconLogo: iconLogo,
            dialog: false,
            cardSpaceMargin: 5,
            slidesPerViewCnt: 7,
            devConfig: {},
            SVOD: [],
            accessOptions: [
                {
                    icon_url: '',
                    title: 'Rent',
                    subtitle: 'for 48 hours',
                    price: '$4.99',
                },
                {
                    icon_url: '',
                    title: 'Subscribe',
                    subtitle: 'for 30 days Package Access',
                    price: '$5.99',
                },
                {
                    icon_url: '',
                    title: 'Subscribe',
                    subtitle: 'for 30 days Package Access',
                    price: '$6.99',
                },
                {
                    icon_url: '',
                    title: 'Rent',
                    subtitle: 'for 6 months Package Access',
                    price: '$29.99',
                },
                {
                    icon_url: '',
                    title: 'Rent',
                    subtitle: 'for 6 months Package Access',
                    price: '$35.99',
                },
            ],
            selectedItem: 0,
            packageObj: [],
            moviesInPackage: [],
            seriesInPackage: [],
            isDev: devMode,
            ButtonColor: {
                backgroundColor: HIGHLIGHT_COLOR_1 + " !important",
                color: FONT_COLOR_1 + " !important"
            }
        }
    },
    mounted() {
        this.getPackages();
    },
    methods: {
        clearAllComponents() {
            this.moviesInPackage = [];
            this.seriesInPackage = [];
            this.packageObj = [];
        },
        onShowAccessOptions() {
            this.dialog = true;
        },
        resizeCardSpace(cnt) {
            this.cardSpaceMargin = cnt * 10;
        },
        navigationStateChange() {
            this.$store.dispatch("changeNavigationState", false);
        },
        getPackages() {
            this.clearAllComponents();
            this.$store.dispatch("setPackages", this.$route.params.packageId);
        },
        gotoSubscriptionUrl(url) {
            document.location.href = url;
        }
    },
    computed: {
        getPackage() {
            this.packageObj = this.$store.state.PackageStore.packages;
            if(this.packageObj.length > 0) {
                // var moviesString = this.packageObj[0].MoviesInPackage;
                // this.moviesInPackage = moviesString.split(",");
                // var seriesString = this.packageObj[0].SeriesInPackage;
                // this.seriesInPackage = seriesString.split(",");
                // if(this.moviesInPackage[0] == "") {
                //     this.moviesInPackage = [];
                // }
                // if(this.seriesInPackage[0] == "") {
                //     this.seriesInPackage = [];
                // }
                this.moviesInPackage = this.packageObj[0].MoviesInPackageArray;
                this.seriesInPackage = this.packageObj[0].SeriesInPackageArray;
            }
            return this.packageObj;
        },
    },
    watch: {
        SVOD(newVal) {
            return newVal;
        },
        categoryId(newVal) {
            return newVal;
        },
        vodId(newVal) {
            this.getSVOD();
            return newVal;
        },
        dialog(newVal) {
            return newVal;
        },
    },
    setup() {
        return {
            modules: [],
        };
    },
} 
</script>
  
