<template>
	<v-layout @click="bodyClick()" :style="backgroundStyle">
		<!-- <v-app-bar>
			<NavBar /> 
		</v-app-bar> -->
		<TopBar class="" @showModal="onShowModal" @navigationChange="changeNavigationState"/>
		<v-main style="--v-layout-left:0px;--v-layout-top:0px;">
			<NavigationBar></NavigationBar>
			<router-view />
			<PackagesModal v-if="isShowPackageModal" @disabledDialog="onDisabledDialog">
			</PackagesModal>
		</v-main>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from "./components/NavBar.vue";
import NavigationBar from './components/NavigationBar.vue';
import TopBar from './components/TopBar.vue';
import PackagesModal from "./components/PackagesModal.vue";
import {BACKGROUND_COLOR_1, FONT_COLOR_1} from '@/mainConfig';
export default defineComponent({
	name: 'App',
	components: {
		NavBar,
		NavigationBar,
		TopBar,
		PackagesModal
	},
	data() {
		return {
			isShowPackageModal: false,
			showNavigationBar: false,
			backgroundStyle: {
				backgroundColor: BACKGROUND_COLOR_1,
				fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
				textAlign: 'center'
			}
		};
	},
	methods: {
		onShowModal(val: any) {
			this.isShowPackageModal = true
		},
		onDisabledDialog(status: any) {
			this.isShowPackageModal = status;
		},
		bodyClick() {
			this.showNavigationBar = true;
		},
		changeNavigationState(val: boolean) {
			this.showNavigationBar = val;
		}
	}
});

</script>
