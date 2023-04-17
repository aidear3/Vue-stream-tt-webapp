<template>
    <v-row>
        <v-col cols="12">
            <ProviderSubscriptionSVOD :providerId="providerId"/>
        </v-col>
        <v-col cols="12">
            <ProviderSubscriptionLiveTV :providerId="providerId"/>
        </v-col>
        <v-col cols="12">
            <ProviderSubscriptionSports :providerId="providerId"/>
        </v-col>
        <v-col cols="12">
            <ProviderSubscriptionEvents :providerId="providerId"/>
        </v-col>
    </v-row>
</template>

<script>
import { devMode } from '../utils/devConfig';
import ProviderSubscriptionSVOD from './ProviderSubscriptionSVOD.vue';
import ProviderSubscriptionLiveTV from './ProviderSubscriptionLiveTV.vue';
import ProviderSubscriptionSports from './ProviderSubscriptionSports.vue';
import ProviderSubscriptionEvents from './ProviderSubscriptionEvents.vue';
import { number } from '@intlify/core-base';
export default {
    components: {
        ProviderSubscriptionSVOD,
        ProviderSubscriptionLiveTV,
        ProviderSubscriptionSports,
        ProviderSubscriptionEvents
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