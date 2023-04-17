<template>
    <div class="trailer-video-player" style="width: 800px; height:500px">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>
  
<style>
@import 'video.js/dist/video-js.css';

.video-js {
    width: 800px;
    height: 500px;
}

.vjs-v8 {
    width: 800px;
    height: 500px;
}

.trailer-video-player {
    width: 800px;
    height: 500px;
}

.vjs-user-active {
    width: 800px;
    height: 500px;
}

.vjs_video_3-dimensions {
    width: 800px;
    height: 500px;
}
</style>
<script>

import videojs from 'video.js';

export default {
    name: 'TrailerVideoPlayer',
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