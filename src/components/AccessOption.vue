<template>    
    
    <v-dialog
      v-model="dialog"
      max-width="290"
      hide-overlay="true"
    >
        <v-card>
            <v-card-title class="text-h5">
            Access Options
            </v-card-title> 
                <v-list>
                    <v-list-item
                        v-for="(item, index) in accessOptions"
                        :key="index"
                    >
                        <v-list-item-avatar>
                            <v-img :src="item.icon_url"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content class="d-flex justify-space-between">
                            <div>
                                {{ item.title }}
                                <p>{{ item.subtitle }}</p>
                            </div>
                            <div>
                                {{ item.price }}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list> 
        </v-card>
    </v-dialog>
</template>
      
<style scoped lang="scss">
    @import '../styles/home.scss';
</style>

<script>
import {devMode} from '../utils/devConfig';

export default {
    name:'AccessOption',
    components: { 
    },
    props: {
        isDialog: 
        {
			type: Boolean,
			required: true,
		}
	},
    data() {
        return {
            dialog:false,  
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
            isDev: devMode
        }
    },
    mounted() {
        this.dialog = this.isDialog;
    },
    methods: {
        onClickSVOD(vod_id){
            this.$router.push({path:'/svod/movie/'+vod_id});
        }
    },
    computed: {
        isDialog(){
            return this.isDialog;
        }
	},
    watch: {
        dialog(newVal){
            return newVal;
        },
	},
    setup() {
        return {
        modules: [],
        };
    },
} 
</script>
      