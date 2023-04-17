<template>
  <v-container fluid style="padding:0px" @click="navigationStateChange()">
    <v-row :style="{ marginBottom: FeaturedItems?.length ? '30px' : '120px' }">
      <v-col cols="12" md="12">
        <Slider v-if="FeaturedItems?.length" :FeaturedSlider=FeaturedItems />
      </v-col>
    </v-row>

    <v-row v-for="(category, i) in Categories">
      <v-col cols="6" md="6">
        <h4 class="text-left ml-10 fcw">{{ category.categoryName }}</h4>
      </v-col>
      <v-col cols="6" md="6" class="d-flex flex-row-reverse pr-8">
        <img class="ml-10 fcw" :src="ViewMoreButton" :style="viewMoreButtonStyle"
          @click="goToCategoryPage(category.menuCategoryIds, category.menuContentType)" />
      </v-col>
      <v-col cols="12" md="12">
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
import {BACKGROUND_COLOR_1, FONT_COLOR_1} from '@/mainConfig';
export default ({
  name: 'DynamicHomeSub',
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
    }
  }),
  mounted() {

  },
  computed: {
    Categories() {

      let MainMenuTypes = this.$store.state.MenuStore.MainMenuTypes;
      if (this.$route.params.subMenuId) {

        let data = MainMenuTypes[this.$route.params.menuId].sub_menu_items.find(arr => arr.id == this.$route.params.subMenuId);
        return data.categories.length ? data.categories : [];
      }

    },
    FeaturedItems() {
      let MainMenuTypes = this.$store.state.MenuStore.MainMenuTypes;

      if (this.$route.params.subMenuId) {

        let data = MainMenuTypes[this.$route.params.menuId].sub_menu_items.find(arr => arr.id == this.$route.params.subMenuId);
        return data.featured_items.length ? data.featured_items : [];

      }
    },
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
