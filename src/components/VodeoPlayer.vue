<template>
    <div class="trailer-video" style="width: 100vw; height:56.4vw; position: absolute;">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>
  
<style>
@import 'video.js/dist/video-js.css';

.video-js {
    width: 100vw;
    height: 56.4vw;
}

.vjs-v8 {
    width: 100vw;
    height: 56.4vw;
}

.trailer-video {
    width: 100vw;
    height: 56.4vw;
}

.vjs-user-active {
    width: 100vw;
    height: 57.4vw;
}

.vjs_video_3-dimensions {
    width: 100vw;
    height: 56.4vw;
}
</style>
<script>

import videojs from 'video.js';

export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
            this.player.log('onPlayerReady', this);
        });
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
</script>