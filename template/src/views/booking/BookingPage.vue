<script lang="ts">
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/footer/Footer.vue";
import {defineComponent} from "vue";
import BannerComponent from "@/components/banner/BannerComponent.vue";

export default defineComponent({
	name: 'BookingPage',
	components: {
		HeaderComponent,
		FooterComponent,
		BannerComponent
	},
	data() {
		return {}
	},
	methods: {},
	created() {
	}
})
</script>

<template>
	<div>
		<HeaderComponent/>
		<BannerComponent/>
		<div class="container">

		</div>
		<FooterComponent/>
	</div>
</template>

<style scoped>

</style>