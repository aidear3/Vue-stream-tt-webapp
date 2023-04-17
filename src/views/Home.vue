<template>
  <v-container fluid style="padding:0px" @click="navigationStateChange()">
    <v-row class="first_view" >
      <v-col cols="12" md="12">
        <Slider :FeaturedSlider=FeaturedItems />
      </v-col>
    </v-row>

    <v-row v-for="(category, i) in Categories">
      <v-col cols="6" md="6">
        <h4 class="text-left ml-10 fcw description-all">{{ category.categoryName }}</h4>
      </v-col>
      <v-col cols="6" md="6" class="d-flex flex-row-reverse pr-8 view-more">
        <img class="ml-10 fcw" :src="ViewMoreButton" :style="viewMoreButtonStyle"
          @click="goToCategoryPage(category.menuCategoryIds, category.menuContentType)" />
      </v-col>
      <v-col cols="12" md="12" style="padding: 0 0 0 87px @media screen and (max-width : 1278px){padding:0 !important}" id="cards_all">
        <CardEvents :categoryId=category.menuCategoryIds v-if="category.menuContentType == 'LIVE_EVENTS'" />
        <CardLive :categoryId=category.menuCategoryIds v-if="category.menuContentType == 'LIVE_CHANNEL'" />
        <CardVod :categoryId=category.menuCategoryIds v-if="category.menuContentType == 'SVOD'" />
        <CardStream :categoryId=category.menuCategoryIds v-if="category.menuContentType == 'LIVE_STREAM'" />
        <CardSports :categoryId=category.menuCategoryIds v-if="category.menuContentType == 'SPORTS'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script >

// import { defineComponent } from 'vue';
import Slider from '../components/Slider.vue';
import CardEvents from '../components/CardEvents.vue';
import CardLive from '../components/CardLive.vue';
import CardVod from '../components/CardVod.vue';
import CardStream from '../components/CardStream.vue';
import CardSports from '../components/CardSports.vue';
import ViewMoreButton from '../assets/img/view-more-button-icon.svg';
import { BACKGROUND_COLOR_1, FONT_COLOR_1 } from '@/mainConfig';
import { getGuestToken, getSVODById } from '@/utils/siberapi';
export default ({
  name: 'Home',
  components: {
    Slider,
    CardEvents,
    CardLive,
    CardVod,
    CardStream,
    CardSports,
  },
  data: () => ({
    open: ['Users'],
    FeaturedItems: [],
    ViewMoreButton: ViewMoreButton,
    viewMoreButtonStyle: {
      'width': '100px',
      'background': BACKGROUND_COLOR_1
    },
  }),
  mounted() {
   
  },
  computed: {
    Categories() {
      let MainMenuTypes = this.$store.state.MenuStore.SideMenus;
      return MainMenuTypes.length ? MainMenuTypes[0].categories : [];
    },
    FeaturedItems() {
      let MainMenuTypes = this.$store.state.MenuStore.SideMenus;
      if (MainMenuTypes.length > 0) {
        console.log("---------------------------", MainMenuTypes[0].featured_items);
        // MainMenuTypes[0].featured_items.map(item => {
        //   let auth = this.$store.getters.getAuth;
        //   let token = auth.auth.msalToken;
        //   if (token == '') {
        //     token = localStorage.getItem('authToken') || "";
        //   }
        //   if (token == '' || auth.auth.tokenMode == "guest") {
        //     getGuestToken().then((value) => {
        //       let apiParams = {
        //         token: value.data.access_token,
        //         vodId: item.contentID
        //       }
        //       getSVODById(apiParams)
        //         .then(res => {
        //           item.movieDetail = res.data.response.movie_info[0];
        //           SVODArray = item;
        //         });
        //     })
        //   } else {
        //     let apiParams = {
        //       token: token,
        //       vodId: item.contentID
        //     }
        //     getSVODById(apiParams)
        //       .then(res => {
        //         item.movieDetail = res.data.response.movie_info[0];
        //         SVODArray = item;
        //       });
        //   }
        // });

        return MainMenuTypes[0].featured_items;
      }
      return [];
    }
  },
  watch: {
    Categories(newVal) {
      return newVal;
    },
    FeaturedItems(newVal) {
      return newVal;
    }
  },
  methods: {
    goToCategoryPage(id, menuContentType) {
      this.$router.push({ path: '/category/' + id + '/' + menuContentType });
    },
    navigationStateChange() {
      this.$store.dispatch("changeNavigationState", false);
    }
  }
});

</script>
<style>
	@media screen and (max-width: 560px) {
	
		.view-more {
			visibility: hidden;
		}
		.description-all {
			width: 298px !important;
			font-size: 23px !important;
			
		}
	}
</style>