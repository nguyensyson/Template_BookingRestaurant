<script lang="ts">
import {defineComponent} from "vue";
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/footer/Footer.vue";
export default defineComponent({
	name: 'CartPage',
	components: {
		HeaderComponent,
		FooterComponent
	},
	data() {
		return {

		}
	},
	methods: {

	}
});
</script>

<template>
	<div>
		<header-component/>
		<footer-component/>
	</div>
</template>

<style scoped>

</style>