<template>
    <v-row>
        <v-col cols="12">
            <ProviderFilmSeries category="film" :providerId="providerId"/>
        </v-col>
        <v-col cols="12" class="mb-10">
            <ProviderFilmSeries category="series" :providerId="providerId"/>
        </v-col>
    </v-row>
</template>

<script>
import { devMode } from '../utils/devConfig';
import ProviderFilmSeries from './ProviderFilmSeries.vue';
import { number } from '@intlify/core-base';
export default {
    components: {
        ProviderFilmSeries
    },
    props: {
        providerId: {
            type: number,
            required: true,
        }
    },
    data() {
        return {
            isDev: devMode,
        }
    },
} 
</script>
<style>
.active-event-vod {
    opacity: 1;
}

.disabled-event-vod {
    background: rgb(17 17 17);
    position: absolute !important;
    left: 0;
    right: 0;
    bottom: 102px;
    top: 0;
    z-index: 1001;
    margin: 0;
    opacity: 0.5 !important;
    align-items: center;
    justify-content: center;
    display: flex !important;
}

.event-vod-img {
    width: 441px;
    height: 249px;
    border-radius: 1vw;
}

</style>