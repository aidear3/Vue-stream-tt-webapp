<template>
    <v-container fluid style="padding:0px" @click="navigationStateChange()">
        <div v-if="phoneWidth <= 560">
            <v-row no-gutters>
                <div v-if="SVOD" :style="{ 'background-image': 'url(' + (isDev?SliderImage:encodeURI(SVOD?.wide_poster_url)) + ')' }" 
                    style="background-repeat: no-repeat; background-attachment:local; background-position:top; background-size:contain; width: 100%; height:500px">
                </div>
            </v-row>
            <v-row no-gutters>
                
                <v-col v-if="SVOD?.length" cols="6" class="d-flex justify-center" :style="SidebarStyle" style="padding-top: 150px;">
                    <div>
                        <v-btn class="d-flex justify-flex-end align-center pr-4 ml-16 font-weight-medium text-h6" v-if="SVOD?.package_status == false"
                                    style="background: hsl(242deg 2% 5%);" @click="onShowAccessOptions()">
                                    <v-icon
                                        style="font-size:34px;border-radius:50%;padding:28px;margin-right:12px;margin-left: -24px; z-index: 9999;" :style="ButtonColor">
                                        mdi-currency-usd
                                    </v-icon>
                                    Access Options
                                </v-btn>
                        <div class="d-flex flex-column justify-start align-start pl-16 mb-6">
                            <div class="font-weight-medium text-h3 pl-10 mb-10">{{ SVOD?.name_short }}</div>
                            <div class="font-weight-medium text-subtitle-2 text-left pl-10 mb-10">
                                {{ SVOD?.description }}
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Directors: </div>
                                <div class="text-left font-weight-medium text-subtitle-2">{{ SVOD?.director }}</div>
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Starring: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div class="font-weight-medium text-left text-subtitle-2">{{ SVOD?.actors }}</div>
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Runtime: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div class="font-weight-medium text-left text-subtitle-2">{{ this.setRuntime(SVOD?.duration) }}</div>
                            </div>

                            <div class="font-weight-medium text-subtitle-2 pl-10 mb-2">{{ SVOD?.content_rating }} - {{ SVOD?.year }} ({{
                                SVOD?.country }}) - {{ SVOD?.genre }} - {{ SVOD?.duration }}m</div>
                            <div class="pl-10 mt-16 d-flex justify-starter align-center">
                                <img :src="SVOD?.content_provider_logo" style="cursor: pointer; width: 60px; height: 60px; border-radius: 50%;" @click="goToProviderPage(SVOD?.content_provider_id)">
                                <div class="content-provider-name font-weight-medium text-h6 ml-2 mr-5" @click="goToProviderPage(SVOD?.content_provider_id)" style="cursor: pointer">{{ SVOD?.content_provider_name }}</div>
                                

                                <div class="d-flex flex-column pr-4 ml-16" v-if="SVOD?.package_status == true">
                                    <v-btn 
                                        v-if="SVOD?.trailer_url != ''" 
                                        @click="showTrailerModal(SVOD?.id, SVOD?.trailer_url)"
                                        rounded="lg" class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Trailer" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>

                                    <v-btn 
                                        v-if="SVOD?.resume > 0" 
                                        @click="resumeMovie(SVOD?.id ,SVOD?.resume)"
                                        rounded="lg" 
                                        class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Resume Play" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>

                                    <v-btn 
                                        @click="moviePlay(SVOD.id)"
                                        rounded="lg" 
                                        class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Play from beginning" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <div v-if="SVOD" :style="{ 'background-image': 'url(' + (isDev?SliderImage:encodeURI(SVOD?.wide_poster_url)) + ')' }" 
            style="background-repeat: no-repeat; background-attachment: fixed; background-position: center; background-size: cover;">
            <v-row no-gutters>
                <v-col v-if="SVOD?.length" cols="6" class="d-flex justify-center" :style="SidebarStyle" style="padding-top: 150px;">
                    <div>
                        <div class="d-flex flex-column justify-start align-start pl-16 mb-6">
                            <div class="font-weight-medium text-h3 pl-10 mb-10">{{ SVOD?.name_short }}</div>
                            <div class="font-weight-medium text-subtitle-2 text-left pl-10 mb-10">
                                {{ SVOD?.description }}
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Directors: </div>
                                <div class="text-left font-weight-medium text-subtitle-2">{{ SVOD?.director }}</div>
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Starring: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div class="font-weight-medium text-left text-subtitle-2">{{ SVOD?.actors }}</div>
                            </div>

                            <div class="d-flex justify-between align-start pl-10 mb-2">
                                <div class="text-left font-weight-medium text-subtitle-2" style="width: 90px;">Runtime: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div class="font-weight-medium text-left text-subtitle-2">{{ this.setRuntime(SVOD?.duration) }}</div>
                            </div>

                            <div class="font-weight-medium text-subtitle-2 pl-10 mb-2">{{ SVOD?.content_rating }} - {{ SVOD?.year }} ({{
                                SVOD?.country }}) - {{ SVOD?.genre }} - {{ SVOD?.duration }}m</div>
                            <div class="pl-10 mt-16 d-flex justify-starter align-center">
                                <img :src="SVOD?.content_provider_logo" style="cursor: pointer; width: 60px; height: 60px; border-radius: 50%;" @click="goToProviderPage(SVOD?.content_provider_id)">
                                <div class="content-provider-name font-weight-medium text-h6 ml-2 mr-5" @click="goToProviderPage(SVOD?.content_provider_id)" style="cursor: pointer">{{ SVOD?.content_provider_name }}</div>
                                <v-btn class="d-flex justify-flex-end align-center pr-4 ml-16 font-weight-medium text-h6" v-if="SVOD?.package_status == false"
                                    style="background: hsl(242deg 2% 5%);" @click="onShowAccessOptions()">
                                    <v-icon
                                        style="font-size:34px;border-radius:50%;padding:28px;margin-right:12px;margin-left: -24px; z-index: 9999;" :style="ButtonColor">
                                        mdi-currency-usd
                                    </v-icon>
                                    Access Options
                                </v-btn>

                                <div class="d-flex flex-column pr-4 ml-16" v-if="SVOD?.package_status == true">
                                    <v-btn 
                                        v-if="SVOD?.trailer_url != ''" 
                                        @click="showTrailerModal(SVOD?.id, SVOD?.trailer_url)"
                                        rounded="lg" class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Trailer" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>

                                    <v-btn 
                                        v-if="SVOD?.resume > 0" 
                                        @click="resumeMovie(SVOD?.id ,SVOD?.resume)"
                                        rounded="lg" 
                                        class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Resume Play" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>

                                    <v-btn 
                                        @click="moviePlay(SVOD.id)"
                                        rounded="lg" 
                                        class="font-weight-medium mt-2" 
                                        style="background: hsl(0deg 0% 89.76%);color: #222222;font-size: 14px;text-transform: initial;">
                                        <div class="d-flex justify-starter align-center">
                                            <v-label text="Play from beginning" style="opacity: 1; width: 150px;letter-spacing: -1px;cursor: pointer;"/>
                                            <v-icon class="ml-8" icon="mdi-play" />
                                        </div>
                                    </v-btn>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        </div>
        
    </v-container>
    <v-dialog v-model="dialog" max-width="450" hide-overlay="true">
        <v-card class="rounded-lg">
            <v-card-title class="text-h5 text-center">
                Access Options
            </v-card-title>
            <v-list class="mx-auto" dense>
                <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item v-for="(item, index) in accessOptions" :key="index" class="pa-0"
                        @click="onSelectAccessOption(item.package_id)">
                        <v-divider v-if="index < accessOptions.length" :key="index"></v-divider>

                        <v-list-item-content class="d-flex justify-space-between align-center px-3 py-2 item-select">
                            <v-img :src="iconLogo" width="40" height="40" class="mr-3"></v-img>
                            <div class="text-subtitle-1 justify-start align-center" style="width: 40vw;">
                                {{ item.package_name }}
                                <p class="text-caption text--disabled">{{ item.package_description }}</p>
                            </div>
                            <div class="text-subtitle-1 justify-start align-center pr-10">
                                {{ item.package_price }}
                            </div>
                        </v-list-item-content>

                        <v-divider v-if="index < accessOptions.length" :key="index"></v-divider>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-dialog>
    <v-dialog v-model="signDialog" persistent width="auto">
        <v-card>
            <v-card-title class="text-h5">
                Alert
            </v-card-title>
            <v-card-text>Please sign in to view the content or to see what pacakges are available</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="signDialog = false">
                    Cancel
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="Signin()">
                    Sign In
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="trailerDialog"
        persistent
        max-width="900"
    >
        <v-card class="rounded-lg">
            <v-card-title class="text-h5 pl-10 pt-8 pb-5">
                <v-icon aria-hidden="false" class="float-right" style="cursor: pointer;margin-top: -4px;" @click="onDismissModal">
                    mdi-close-circle-outline
                </v-icon>
            </v-card-title> 
            <v-card-text class="d-flex justify-center align-center">
                <VideoPlayer v-if="trailer_url != ''" :options="{ autoPlay: true, controls: false, preload: 'auto', loop: true, muted: false, sources: [{ src: trailer_url }] }" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template> 
      
<style scoped lang="scss">
@import '../../styles/home.scss';
</style>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '../../store';
import CardVod from '../../assets/img/card-vod.png';
import iconLogo from '../../assets/img/icon-live-logo-red.png';
import PlayIcon from '../../assets/img/icon-play.png';
import SliderImage from '../../assets/img/slider-1.jpg';
import VideoPlayer from '../../components/TrailerVideoPlayer.vue';
import { number } from '@intlify/core-base';
import { useMsal } from '../../composition-api/useMsal';
import { BACKGROUND_COLOR_1, loginRequest } from "../../mainConfig";
import { HIGHLIGHT_COLOR_1, 
    FONT_COLOR_1, 
    SIDEEFFECTBAR_1, 
    SIDEEFFECTBAR_2, 
    SIDEEFFECTBAR_3, 
    SIDEEFFECTBAR_4 } from '@/mainConfig';
import { devMode } from '../../utils/devConfig';
import { useDisplay } from 'vuetify/lib/framework.mjs';

export default {
    name: 'SVODAcess',
    components: {
        VideoPlayer
    },
    props: {
        categoryId: {
            type: number,
            required: true,
        },
    },
    data() {
        return {
            phoneWidth: window.innerWidth,
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            iconLogo: iconLogo,
            SliderImage: SliderImage,
            dialog: false,
            trailerDialog: false,
            trailer_url: '',
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
            vodId: this.$route.params.id,
            selectedItem: 0,
            isDev: devMode,
            ButtonColor: {
                backgroundColor: HIGHLIGHT_COLOR_1 + " !important",
                color: FONT_COLOR_1 + " !important"
            },
            SidebarStyle: {
                background: BACKGROUND_COLOR_1,
                background: 'linear-gradient(94deg, ' + SIDEEFFECTBAR_1 + ' 0%, ' + SIDEEFFECTBAR_2 + ' 50%, ' + SIDEEFFECTBAR_3 + ' 76%, transparent 89%, transparent 100%)',
                minHeight: '100vh'
            }
        }
    },
    mounted() {
        this.SVOD = [];
        this.getSVOD();
    },
    methods: {
        getSVOD() {
            this.$store.dispatch("setSVODById",
                {
                    vodId: this.vodId
                });
        },
        onShowAccessOptions() {
            let auth = this.$store.getters.getAuth;
            if (auth.auth.tokenMode == "guest") {
                this.signDialog = true;
            } else {
                this.dialog = true;
            }
            // this.dialog = true;
        },
        onSelectAccessOption(packageId) {
            this.$router.push({ path: '/svod/package/' + packageId });
        },
        resizeCardSpace(cnt) {
            this.cardSpaceMargin = cnt * 10;
        },
        goToProviderPage(providerId) {
            this.$router.push({ path: '/provider/' + providerId });
        },
        navigationStateChange() {
            this.$store.dispatch("changeNavigationState", false);
        },
        resumeMovie(id, resume) {
            this.$router.push({ path: '/player/movie/' + id + '&resume=' + resume });
        },
        moviePlay(id) {
            this.$router.push({ path: '/player/movie/' + id });
        },
        setRuntime(val) {
            let hours = 0;
            let minutes = 0;
            if( val > 60 ) {
                hours = Math.floor(val / 60);
                minutes = val % 60;

                return hours + "HR " + minutes + "M";
            } else {
                return minutes + "M";
            }
        },
        showTrailerModal(id, trailer_url) {
            this.trailer_url = encodeURI(trailer_url);
            this.trailerDialog = true;
        }, 
        onDismissModal() {
            this.trailer_url = '';
            this.trailerDialog = false;
        },  
        Signin () {
            this.signDialog = false;
            this.setupSign();
        }
    },
    computed: {
        devConfig() {
            return this.$store.state.SVODStore.SVOD[this.vodId];
        },
        SVOD() {
            let svdCnt = this.$store.state.SVODStore.SVOD.length;
            if (svdCnt > 0 && svdCnt >= this.vodId) {
                this.accessOptions = this.$store.state.SVODStore.SVOD[this.vodId].packages;
                console.log(">>>>>>>>>>>>>>>>>>>>>", this.$store.state.SVODStore.SVOD[this.vodId].movie_info[0]);
                return this.$store.state.SVODStore.SVOD[this.vodId].movie_info[0];
            }else {
                return null;
            }
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
        const store = useStore(key);
        const signDialog = ref(false);
        const { instance } = useMsal();
        const setupSign = () => {
            instance.loginPopup(loginRequest)
                .then((res) => {
                    // setAuth(response);  
                    let signInfo = {
                        loggedIn: true,
                        msalToken: res.accessToken,
                        tokenMode: res.tokenType
                    }
                    store
                        .dispatch("setToken", signInfo)
                        .then(() => {
                            localStorage.setItem("authToken", res.accessToken);
                            window.sessionStorage.setItem("tokenMode", res.tokenType);
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
            signDialog,
            setupSign,
            instance,
            modules: [],
        };
    },
} 
</script>

<style>
.content-provider-name:hover {
    text-decoration: underline;
}

</style>
      