<template>
    <v-container fluid style="padding:0px" @click="navigationStateChange()">
        <div v-if="SVOD != null" :style="{ 'background-image': 'url(' + SVOD?.custom_data.featured_img + ')' }"
            style="background-repeat: no-repeat; background-position: center; background-size: cover; ">
            <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-starter" :style="SidebarStyle"
                    style="padding-top: 150px; padding-left: 100px;">
                    <div class="d-flex flex-column justify-start align-start mb-6 pl-16">
                        <div class="d-flex justify-between align-center justify-center">
                            <img :src="SVOD?.content_provider_logo"
                                style="cursor: pointer; width: 80px; height: 80px; border-radius: 50%;"
                                @click="goToProviderPage(SVOD?.content_provider_id)">
                            <div class="d-flex flex-column justify-start">
                                <div class="font-weight-medium text-h3 pl-10">{{ SVOD?.content_provider_name }}</div>
                                <div class="font-weight-medium text-h6 pl-10">{{ SVOD?.custom_data.country }}</div>
                            </div>
                        </div>

                        <div class="font-weight-medium text-subtitle-2 text-left mt-10 mb-10">
                            {{ SVOD?.content_provider_description }}
                        </div>

                        <div class="d-flex align-center" style="width: 30vw;">
                            <div class="text-subtitle-1 round-md" style="width: 10vw;">
                                <v-btn depressed color="white" :style="ButtonColor">
                                    Subscribe
                                </v-btn>
                            </div>
                            <div class="d-flex align-center">
                                <v-img v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.website != ''" :src="WebLogo" :aspect-ratio="1"
                                    width="40" height="40" />
                                <v-img class="ml-2" v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.facebook != ''" :src="FacebookLogo"
                                    :aspect-ratio="1" width="40" height="40" />
                                <v-img class="ml-2" v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.instagram != ''"
                                    :src="InstagramLogo" :aspect-ratio="1" width="40" height="40" />
                                <v-img class="ml-2" v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.whatsapp != ''" :src="WhatsappLogo"
                                    :aspect-ratio="1" width="40" height="40" />
                                <v-img class="ml-2" v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.youtube != ''" :src="YoutubeLogo"
                                    :aspect-ratio="1" width="40" height="40" />
                                <v-img class="ml-2" v-if="SVOD?.custom_data.social_media && SVOD?.custom_data.social_media.twitter != ''" :src="TwitterLogo"
                                    :aspect-ratio="1" width="40" height="40" />
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-card v-if="SVOD != null">
            <v-tabs v-model="tab" align-tabs="center" fixed-tabs :style="NavStyle">
                <v-tab value="videos">Videos</v-tab>
                <v-tab value="live">Live</v-tab>
                <v-tab value="film">Film & Series</v-tab>
                <v-tab value="subscription">Subscriptions & Rentals</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="videos">
                        <ProviderVideo :providerId="providerId" category="video"/>
                    </v-window-item>

                    <v-window-item value="live">
                        <ProviderVideo :providerId="providerId" category="live"/>
                    </v-window-item>

                    <v-window-item value="film"> 
                        <ProviderTabFilmSeries :providerId="providerId"/>
                    </v-window-item>

                    <v-window-item value="subscription"> 
                        <ProviderSubscription :providerId="providerId" />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
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
import WebLogo from '../../assets/img/web_logo.png';
import FacebookLogo from '../../assets/img/facebook_logo.png';
import InstagramLogo from '../../assets/img/instagram_logo.png';
import TwitterLogo from '../../assets/img/twitter_logo.png';
import WhatsappLogo from '../../assets/img/whatsapp_logo.png';
import YoutubeLogo from '../../assets/img/youtube_logo.png';
import ProviderVideo from '@/components/ProviderVideo.vue';
import ProviderTabFilmSeries from '@/components/ProviderTabFilmSeries.vue';
import ProviderSubscription from '@/components/ProviderSubscription.vue';
import { number } from '@intlify/core-base';
import { useMsal } from '../../composition-api/useMsal';
import { BACKGROUND_COLOR_1, loginRequest } from "../../mainConfig";

import {
    HIGHLIGHT_COLOR_1,
    HIGHLIGHT_COLOR_2,
    FONT_COLOR_1,
    SIDEEFFECTBAR_1,
    SIDEEFFECTBAR_2,
    SIDEEFFECTBAR_3,
    SIDEEFFECTBAR_4
} from '@/mainConfig';
import { devMode } from '../../utils/devConfig';

export default {
    name: 'SVODAcess',
    components: {
    ProviderVideo,
    ProviderTabFilmSeries,
    ProviderSubscription
},
    data() {
        return {
            FacebookLogo: FacebookLogo,
            InstagramLogo: InstagramLogo,
            TwitterLogo: TwitterLogo,
            WhatsappLogo: WhatsappLogo,
            YoutubeLogo: YoutubeLogo,
            WebLogo: WebLogo,
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            iconLogo: iconLogo,
            dialog: false,
            cardSpaceMargin: 5,
            slidesPerViewCnt: 7,
            devConfig: {},
            SVOD: [],
            providerId: this.$route.params.providerId,
            selectedItem: 0,
            providerInfo: null,
            isDev: devMode,
            tab: null,
            ButtonColor: {
                backgroundColor: HIGHLIGHT_COLOR_1 + " !important",
                color: FONT_COLOR_1 + " !important"
            },
            SidebarStyle: {
                background: BACKGROUND_COLOR_1,
                background: 'linear-gradient(94deg, ' + SIDEEFFECTBAR_1 + ' 0%, ' + SIDEEFFECTBAR_2 + ' 50%, ' + SIDEEFFECTBAR_3 + ' 76%, transparent 89%, transparent 100%)',
            },
            NavStyle: {
                backgroundColor: HIGHLIGHT_COLOR_2
            }
        }
    },
    mounted() {
        this.SVOD = [];
        this.getProviderInfo();
    },
    methods: {
        getProviderInfo() {
            this.$store.dispatch("setProvider",
                {
                    providerId: this.providerId
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
        navigationStateChange() {
            this.$store.dispatch("changeNavigationState", false);
        },
        Signin() {
            this.signDialog = false;
            this.setupSign();
        }
    },
    computed: {
        devConfig() {
            return this.$store.state.SVODStore.SVOD[this.vodId];
        },
        SVOD() {
            const regionNames = new Intl.DisplayNames(
                ['en'], { type: 'region' }
            );
            this.providerInfo = this.$store.state.ProviderStore.providers;
            if (this.providerInfo != null) {
                var custom_data = JSON.parse(this.providerInfo.custom_data);
                this.providerInfo.custom_data = custom_data;
                this.providerInfo.custom_data.country = regionNames.of(this.providerInfo.custom_data.country)
            }
            console.log("----------------------------------", this.providerInfo);
            return this.providerInfo;
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
      