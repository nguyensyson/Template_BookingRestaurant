<script lang="tsx">
import {defineComponent} from "vue";
import HeaderComponent from "@/components/header/Header.vue";
import BannerComponent from "@/components/banner/BannerComponent.vue";
import FooterComponent from "@/components/footer/Footer.vue";
export default defineComponent({
	name : 'NotFound',
	components : {
		HeaderComponent,
		BannerComponent,
		FooterComponent
	},
	setup() {
		const header = <header-component/>;
		const bannerComponent = <banner-component/>;
		const footer = <footer-component/>;
		return () => (
			<div>
				{header}
				{bannerComponent}
				<div class="container">
					<div class="d-flex align-items-center justify-content-center vh-100">
						<h1 class="display-1 fw-bold">404<br/>
							<h2>Không tồn tại</h2>
							<router-link to={`/`} class="btn btn-primary mt-3">Quay lại trang chủ</router-link>
						</h1>
					</div>
				</div>
				{footer}
			</div>
		)
	}
})
</script>

<style scoped>

</style>