<template>
    <v-container fluid style="padding:0px" @click="navigationStateChange()">
        <div v-if="SVOD" :style="{ 'background-image': 'url(' + encodeURI(SVOD?.backdrop) + ')' }"
            style="background-repeat: no-repeat; background-attachment: fixed; background-position: center; background-size: cover; ">
            <v-row no-gutters>
                <v-col cols="6" class="d-flex justify-center left-side-content pl-5" :style="SidebarStyle"
                    style="padding-top: 150px;">
                    <div class="d-flex flex-column justify-start align-start pl-16 mb-6">
                        <div class="font-weight-medium text-h3 pl-10 mb-10">{{ SVOD?.name_short }}</div>
                        <div class="font-weight-medium text-subtitle-2 text-left pl-10 mb-10">
                            {{ SVOD?.description }}
                        </div>

                        <div class="pl-10 mt-2 d-flex justify-starter align-center">
                            <img :src="SVOD?.content_provider_logo"
                                style="cursor: pointer; width: 60px; height: 60px; border-radius: 50%;"
                                @click="goToProviderPage(SVOD?.content_provider_id)">
                            <div class="content-provider-name font-weight-medium text-h6 ml-2"
                                @click="goToProviderPage(SVOD?.content_provider_id)" style="cursor: pointer">{{
                                    SVOD?.content_provider_name }}</div>
                        </div>
                        <div class="d-flex justify-starter align-center ml-10 mt-16" style="padding-bottom: 300px;">
                            <CustomSelect :options="seasons" style="width: 150px;" @input="changeItem($event)" />
                            <v-btn v-if="SVOD?.package_status == false"
                                class="d-flex justify-flex-end align-center pr-4 ml-6 font-weight-medium text-h6"
                                style="background: hsl(242deg 2% 5%);" @click="onShowAccessOptions()">
                                <v-icon
                                    style="font-size:34px;border-radius:50%;padding:28px;margin-right:12px;margin-left: -24px; z-index: 9999;"
                                    :style="ButtonColor">
                                    mdi-currency-usd
                                </v-icon>
                                Access Options
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6" class="d-flex flex-column align-center pr-16 pl-10"
                    style="padding-top: 150px; height: 100vh; overflow:auto" v-if="episodes.length > 0">
                    <div @click="episodeClick(SVOD?.package_status, episode.id)" v-for="(episode, i) of episodes"
                        class="episode-item d-flex justify-center align-center px-5 py-5 mb-10" :style="SubItemStyle">
                        <img :src="episode.icon_url" style="width: 14vw; border-radius: 25px;">
                        <div class="d-flex flex-column justify-start align-start">
                            <div class="font-weight-medium text-h5 pl-10 mb-5">{{ episode.caption }}</div>
                            <div class="font-weight-medium text-subtitle-2 text-left pl-10">
                                {{ episode.description }}
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
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
                        @click="onSelectAccessOptioin(item.package_id)">
                        <v-divider v-if="index < accessOptions.length" :key="index"></v-divider>

                        <v-list-item-content class="d-flex justify-space-between align-center px-3 py-2 item-select">
                            <v-img :src="iconLogo" width="40" height="40" class="mr-3"></v-img>
                            <div class="text-subtitle-1 justify-start align-center" style="width: 40vw;">
                                {{ item.package_name }}
                                <p class="text-caption text--disabled">{{ item.package_description }}</p>
                            </div>
                            <div class="text-subtitle-1 justify-start align-center pr-10">
                                ${{ item.package_price }}
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
    <v-dialog v-model="episodeDialog" max-width="450" hide-overlay="true">
        <v-card class="rounded-lg">
            <v-card-title class="d-flex flex-column ">
                <div class="text-h5">{{ series_caption }}</div>
                <div class="text-h5">{{ session_caption }} - {{ episode_caption }}</div>
            </v-card-title>
            <v-card-text>
                <div class="d-flex flex-column mb-2">
                    <v-btn 
                        v-if="selected_episode.vod_trailer_ott_url != ''"
                        @click="showTrailerModal(selected_episode.id, selected_episode.vod_trailer_ott_url)"
                        rounded="lg" class="font-weight-medium mt-2"
                        style="background: hsl(0deg 0% 89.76%); color: #222222; font-size: 16px;text-transform: initial;">
                        <div class="d-flex justify-space-around align-center">
                            <v-label text="Play Trailer"
                                style="opacity: 1; width: 300px; cursor: pointer; font-weight: 600; font-size: 16px;" />
                            <v-icon icon="mdi-play" :style="playButtonColor"/>
                        </div>
                    </v-btn>

                    <v-btn 
                        v-if="selected_episode.resume > 0"   
                        @click="resumeMovie(selected_episode.id ,selected_episode.resume)"
                        rounded="lg" class="font-weight-medium mt-2"
                        style="background: hsl(0deg 0% 89.76%); color: #222222; font-size: 14px;text-transform: initial;">
                        <div class="d-flex justify-space-around align-center">
                            <v-label text="Resume Play"
                                style="opacity: 1; width: 300px; cursor: pointer; font-weight: 600; font-size: 16px;" />
                            <v-icon icon="mdi-play" :style="playButtonColor"/>
                        </div>
                    </v-btn>

                    <v-btn 
                        @click="moviePlay(selected_episode.id)"
                        rounded="lg" class="font-weight-medium mt-2"
                        style="background: hsl(0deg 0% 89.76%); color: #222222; font-size: 14px;text-transform: initial;">
                        <div class="d-flex justify-space-around align-center">
                            <v-label text="Play from beginning"
                                style="opacity: 1; width: 300px; cursor: pointer; font-weight: 600; font-size: 16px;" />
                            <v-icon icon="mdi-play" :style="playButtonColor"/>
                        </div>
                    </v-btn>

                </div>
            </v-card-text>
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
import { number } from '@intlify/core-base';
import { useMsal } from '../../composition-api/useMsal';
import { loginRequest } from "../../mainConfig";
import CustomSelect from '../../components/CustomSelect.vue';
import VideoPlayer from '../../components/TrailerVideoPlayer.vue';
import { BACKGROUND_COLOR_1, HIGHLIGHT_COLOR_1, HIGHLIGHT_COLOR_2, FONT_COLOR_1, SIDEEFFECTBAR_1, SIDEEFFECTBAR_2, SIDEEFFECTBAR_3, SIDEEFFECTBAR_4 } from '@/mainConfig';
import { devMode } from '../../utils/devConfig';

export default {
    name: 'SVODSeries',
    components: {
        CustomSelect,
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
            PlayIcon: PlayIcon,
            CardVod: CardVod,
            iconLogo: iconLogo,
            dialog: false,
            episodeDialog: false,
            cardSpaceMargin: 5,
            slidesPerViewCnt: 7,
            devConfig: {},
            series_caption: '',
            session_caption: '',
            episode_caption: '',
            selected_episode: {},
            trailerDialog: false,
            trailer_url: '',
            SVOD: [],
            items: [],
            episodes: [],
            accessOptions: [],
            vodId: this.$route.params.id,
            selectedItem: 0,
            isDev: devMode,
            ButtonColor: {
                backgroundColor: HIGHLIGHT_COLOR_1 + " !important",
                color: FONT_COLOR_1 + " !important"
            },
            // SidebarStyle: {
            //     background: BACKGROUND_COLOR_1,
            //     background: 'linear-gradient(94deg, ' + SIDEEFFECTBAR_1 + ' 0%, ' + SIDEEFFECTBAR_2 + ' 45%, ' + SIDEEFFECTBAR_3 + ' 60%, ' + SIDEEFFECTBAR_4 + ' 70%, transparent 100%)',
            // },
            SubItemStyle: {
                background: HIGHLIGHT_COLOR_2,
                borderRadius: '20px'
            },
            playButtonColor: {
                color: FONT_COLOR_1,
                backgroundColor: HIGHLIGHT_COLOR_1,
                borderRadius: '50%'
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
            this.$store.dispatch("setSVODSeriesById",
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
        onSelectAccessOptioin(packageId) {
            this.$router.push({ path: '/svod/package/' + packageId });
        },
        goToProviderPage(providerId) {
            this.$router.push({ path: '/provider/' + providerId });
        },
        resizeCardSpace(cnt) {
            this.cardSpaceMargin = cnt * 10;
        },
        resumeMovie(id, resume) {
            this.$router.push({ path: '/player/series/' + id + '&resume=' + resume });
        },
        moviePlay(id) {
            this.$router.push({ path: '/player/series/' + id });
        },
        showTrailerModal(id, trailer_url) {
            this.trailer_url = encodeURI(trailer_url);
            this.trailerDialog = true;
        }, 
        onDismissModal() {
            this.trailer_url = '';
            this.trailerDialog = false;
        },  
        changeItem(id) {
            for (var i = 0; i < this.items.length; i++) {
                if (id == this.items[i].id) {
                    this.episodes = this.items[i].episodes;
                    this.session_caption = this.items[i].caption;
                }
            }
        },
        episodeClick(package_status, id) {
            if(package_status) {
                for (var i = 0; i < this.episodes.length; i++) {
                    if (id == this.episodes[i].id) {
                        this.selected_episode = this.episodes[i];
                        this.episode_caption = this.episodes[i].caption;
                    }
                }
            
                this.episodeDialog = true;
            } else {
                this.onShowAccessOptions();
            }
            
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
            let svdCnt = this.$store.state.SVODStore.SVOD.length;
            if (svdCnt > 0 && svdCnt >= this.vodId) {
                try {
                    this.accessOptions = this.$store.state.SVODStore.SVOD[this.vodId].packages;
                    this.series_caption = this.$store.state.SVODStore.SVOD[this.vodId].series.name_short;
                    return this.$store.state.SVODStore.SVOD[this.vodId].series;
                } catch (e) {
                    return null;
                }
            } else {
                return null;
            }
        },
        seasons() {
            this.items = [];
            let svdCnt = this.$store.state.SVODStore.SVOD.length;
            if (svdCnt > 0 && svdCnt >= this.vodId) {
                try {
                    let seasonArray = this.$store.state.SVODStore.SVOD[this.vodId].series.seasons;
                    if (seasonArray != null && seasonArray.length > 0) {
                        seasonArray.map((val) => {
                            this.items.push(val);
                        })
                        this.episodes = this.items[0].episodes;
                        this.session_caption = this.items[0].caption;
                    }
                } catch (e) {
                    return [];
                }
            }

            return this.items;
        }
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
                    store.dispatch("setToken", signInfo)
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
.left-side-content::-webkit-scrollbar {
    width: 10px;
}

.left-side-content {
    overflow: auto;
    height: 100vh;
    padding-bottom: 100px;
}

.content-provider-name:hover {
    text-decoration: underline;
}

.episode-item:hover {
    background: #8b0000 !important;
}

.episode-item:hover {
    cursor: pointer;
}

.v-overlay__scrim {
    background: #111111;
    opacity: .3 !important;
}
</style>