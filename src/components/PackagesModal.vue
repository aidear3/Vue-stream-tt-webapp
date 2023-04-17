<template>
    <v-layout row justify-center> 

        <v-dialog
            v-model="dialog"
            max-width="1200"
            hide-overlay="false"
        >
            <v-card class="rounded-lg" style="background-color: rgb(17 17 17 / 100%);">
                <v-card-title v-if="!isShowDetailPackage" class="text-h5 pl-10 pt-8 pb-5 d-flex justify-space-between">
                    <div>Packages</div> 
                    <input type="text" placeholder="Search" class="input text-search"> 
                    <v-icon aria-hidden="false" style="cursor: pointer;margin-top: -4px;" @click="onDismissModal">
                        mdi-close-circle-outline
                    </v-icon>
                </v-card-title> 
                <v-card-title v-else cclass="text-h5 pl-10 pt-8 pb-5 d-flex justify-space-between">
                    <div>{{ selectedPackageItem.packageCategory }} included in Packages</div> 
                    <v-icon aria-hidden="false" style="cursor: pointer;margin-top: -4px;" @click="onDismissModal">
                        mdi-close-circle-outline
                    </v-icon>
                </v-card-title>  

                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    v-if="!isShowDetailPackage" 
                    class="ml-10"
                >
                    <v-tab 
                        v-for="(item, index) in PackageCategoryItems" 
                        :value="item.packageId"   
                        class=" pa-4 mx-4 rounded-lg"
                        style="border: 0px;">
                        {{ item.packageTitle }}
                    </v-tab>
                </v-tabs>
                
                <v-responsive
                    class="overflow-y-auto"
                    max-height="645"
                > 
                    <v-window v-model="tab">
                        <v-window-item
                            v-for="(item, index) in PackageCategoryItems" 
                            :key="item.packageId"
                            :value="item.packageId"
                        >
                            <v-container fluid >
                                <v-row   
                                    class="pl-2 pr-4"
                                    v-if="isShowDetailPackage" 
                                >
                                    <v-col
                                        cols="5"
                                        md="5"
                                    >
                                        <v-img
                                            :src="selectedPackageItem.packageDetailImg"
                                            aspect-ratio="2"
                                            style="cursor: pointer;" 
                                        ></v-img>
                                        <v-card-title class="text-h5 pa-5 d-flex justify-space-between">
                                            <div style="color: green;">Price: {{ selectedPackageItem.packagePrice }} (usd) / month</div> 
                                        </v-card-title>
                                    </v-col>
                                    <v-col
                                        cols="7"
                                        md="7"
                                    >
                                        <div class="d-flex justify-start align-center mb-5">
                                            <img :src="iconLogo" width="50" height="50" class="mr-3">
                                            <div class="text-subtitle-1">
                                                 
                                                {{ selectedPackageItem.packageTitle }}
                                            </div> 
                                        </div> 
                                        <div class="text-h6 d-flex justify-space-between align-center mb-5" style="width: 40vw;">
                                            {{ selectedPackageItem.packageTitle }}
                                            <p class="text-caption text--disabled">{{ selectedPackageItem.packagePrice }}</p>
                                        </div>
                                        <div class="text-caption text--disabled justify-start align-center mb-5 pr-10">
                                            {{ selectedPackageItem.packageDetailDescription }}
                                        </div>
                                        <div class="d-flex justify-start align-center mb-5">
                                            <v-btn
                                                class="d-flex justify-flex-end align-center pr-4 ml-2"
                                                style="background: hsl(242deg 2% 5%);cursor: pointer;" 
                                            > 
                                                <img 
                                                    :src="iconLogo" 
                                                    width="50" 
                                                    height="50" 
                                                    class="mr-3" 
                                                    style="border-radius:50%;margin-right:12px;margin-left: -24px; z-index: 9999;">

                                                Go To Package
                                            </v-btn>
                                        </div>  
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-card-title v-if="isShowDetailPackage"  class="text-h5 pl-10 pt-5 pb-1 d-flex justify-space-between">
                                        <div>{{ selectedPackageItem.packageCategory }} included in Packages</div> 
                                    </v-card-title>  
                                </v-row>
                            </v-container>

                            <v-container fluid class="pa-7">
                                <v-row 
                                    v-for="(detailItem, detailIndex) in PackageDetailItems"
                                    :key="detailIndex"
                                    class="pa-2"
                                    style="border-top: 1px solid #ddd;cursor: pointer;"
                                    @click="onSelectPackage(detailItem)"
                                >
                                    <v-col
                                        cols="3"
                                        md="3"
                                    >
                                        <v-img
                                            :src="detailItem.packageDetailImg"
                                            aspect-ratio="2"
                                        ></v-img>
                                    </v-col>
                                    <v-col
                                        cols="9"
                                        md="9"
                                    >
                                        <div class="text-subtitle-1 d-flex justify-space-between align-center" style="width: 40vw;">
                                            {{ detailItem.packageTitle }}
                                            <p class="text-caption text--disabled">{{ detailItem.packagePrice }}</p>
                                        </div>
                                        <div class="text-caption text--disabled justify-start align-center pr-10">
                                            {{ detailItem.packageDetailDescription }}
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-window-item>
                    </v-window>
                </v-responsive>
            </v-card>
        </v-dialog>
    </v-layout>
</template>



<style scoped lang="scss">
    @import '../styles/home.scss';
</style>

<script>
import {devMode} from '../utils/devConfig';
import CardLive from '../assets/img/card-live.png'; 
import iconLogo from '../assets/img/icon-live-logo-red.png'; 

export default {
    name: 'PackagesModal',
    components: {
        
    },
    mounted() {
        this.SVOD = []; 
        // this.getSVOD();
    },
    data() {
        return {  
            dialog: true,
            CardLive:CardLive,
            iconLogo: iconLogo,
            devConfig:{},
            selectedPackageItem: [],
            isShowDetailPackage: false,
            SVOD: [],
            tab: null,
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
            PackageCategoryItems: [
                { 
                    packageId: 1,
                    iconUrl: '',
                    packageTitle: 'My Packages' 
                },
                { 
                    packageId: 2,
                    iconUrl: '',
                    packageTitle: 'All Packages' 
                },
                { 
                    packageId: 3,
                    iconUrl: '',
                    packageTitle: 'SVOD Packages' 
                },
                { 
                    packageId: 4,
                    iconUrl: '',
                    packageTitle: 'TV Packages' 
                },
                { 
                    packageId: 5,
                    iconUrl: '',
                    packageTitle: 'Sports Packages' 
                }
            ],
            PackageDetailItems: [
                { 
                    packageDetailId: 1,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'Films And Series',
                    packagePrice: '$7.75' 
                },
                { 
                    packageDetailId: 2,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'Events',
                    packagePrice: '$7.75' 
                },
                { 
                    packageDetailId: 3,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'Live Channels',
                    packagePrice: '$7.75' 
                },
                { 
                    packageDetailId: 4,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'Sports',
                    packagePrice: '$7.75' 
                },
                { 
                    packageDetailId: 5,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'VODS',
                    packagePrice: '$7.75' 
                },
                { 
                    packageDetailId: 6,
                    packageDetailImg: CardLive,
                    packageDetailDescription: "The justify-content flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the x-axis but is reversed when using flex-direction: column, modifying the y-axis. Choose from start (browser default), end, center, space-between, or space-around.",
                    iconUrl: '',
                    packageTitle: 'Name of Series',
                    packageCategory: 'Films And Series',
                    packagePrice: '$7.75' 
                },
            ],
            vodId: this.$route.params.id,
            selectedItem: 0,
            isDev: devMode
        }
    },
    methods: {
        getSVOD() {
             this.$store.dispatch("setSVODById",
                {
                    vodId: this.vodId
                }); 
		}, 
        onShowAccessOptions(){
            this.dialog = true;
        },
        onSelectAccessOptioin(packageId){
            this.$router.push({path:'/svod/package/' + packageId });
        },
        viewMoreClicked(idx) {
			this.$emit("viewMoreClicked", idx);
		},
        onSelectPackage(packageDetail){
            this.isShowDetailPackage = true;
            this.selectedPackageItem = packageDetail;
        },
        onDismissModal(){
            this.dialog=false;
        }
    },
    computed: {
        devConfig(){
            return this.$store.state.SVODStore.SVOD[this.vodId];
        },
		// SVOD() {   
        //     let svdCnt = this.$store.state.SVODStore.SVOD.length;
        //     if (svdCnt == 0) {
        //         this.getSVOD();
        //     }
            
        //     return this.$store.state.SVODStore.SVOD[this.vodId];
		// }, 
	},
    watch: {
		// SVOD(newVal) {  
        //     return newVal; 
		// },
        categoryId(newVal){
            return newVal;
        },
        vodId(newVal){
            this.getSVOD();
            return newVal;
        },
        dialog(newVal){ 
            this.$emit('disabledDialog', newVal)
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
      